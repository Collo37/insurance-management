const Vehicle = require("../models/vehicles");
const Owner = require("../models/owners");
const Payment = require("../models/payments");

const ErrorResponse = require("../utils/errorResponse");

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("ownerId");
    res.status(200).json({
      status: "Ok",
      data: vehicles,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error,
    });
  }
};

exports.addManyVehicles = async (req, res) => {
  try {
    const vehicles = req.body;
    vehicles.forEach(async (vehicle) => {
      const ownerId = vehicle.ownerId;
      const newVehicle = Vehicle(vehicle);
      await newVehicle.save();
      await Owner.findByIdAndUpdate(ownerId, {
        $push: {
          vehicles: newVehicle._id,
        },
      });
    });

    res.send("Success");
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

exports.getVehicleIds = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json({
      vehicleIds: vehicles.map((vehicle) => vehicle._id),
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.getVehicleStats = async (req, res) => {
  try {
    let daysLeft;
    if (req.query.daysLeft) {
      daysLeft = parseInt(req.query.daysLeft);
    } else {
      daysLeft = 10;
    }
    const today = new Date(Date.now());
    const vehicles = await Vehicle.find().populate("ownerId");
    const total = await Vehicle.countDocuments();
    const pastDue = vehicles.filter((vehicle) => {
      return new Date(vehicle.expiryDate) <= today;
    });

    const expiringSoon = vehicles.filter((vehicle) => {
      const timeDifferenceInMs = new Date(vehicle.expiryDate) - today;
      const timeDifferenceInDays = timeDifferenceInMs / 1000 / 60 / 60 / 24;
      if (timeDifferenceInDays > 0) return timeDifferenceInDays <= daysLeft;
    });

    res.status(200).json({
      stats: {
        pastDue,
        expiringSoon,
        total,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.addNewVehicle = async (req, res) => {
  try {
    const vehicle = req.body;
    console.log(vehicle);
    const { ownerId } = req.body;
    const newVehicle = Vehicle(vehicle);
    await newVehicle.save();
    await Owner.findByIdAndUpdate(ownerId, {
      $push: {
        vehicles: newVehicle._id,
      },
    });

    res.status(201).json({
      status: "Created",
      data: newVehicle,
    });
  } catch (error) {
    console.log(error);
    res.send("Error adding vehicle to database");
  }
};

exports.editVehicleDetails = async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, {
      ...req.body,
    });

    res.status(201).json({ vehicle });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVehicle = async (req, res, next) => {
  const vehicleId = req.params.vehicleId;
  if (!vehicleId) {
    return next(new ErrorResponse("Must include vehicle Id", 400));
  }
  try {
    // remove all payments related to the vehicle
    const payments = await Payment.find({ vehicleId });
    if (payments) {
      payments.forEach(async (payment) => {
        await Payment.findByIdAndDelete(payment._id);
      });
      console.log("Payments deleted");
    }

    // delete the vehicle
    const vehicle = await Vehicle.findByIdAndDelete(vehicleId);
    if (!vehicle) return next(new ErrorResponse("Vehicle not found", 404));

    // remove vehicle Id from owner's list
    const owner = await Owner.findOne({ vehicles: { $in: vehicleId } });
    if (!owner) return next(new ErrorResponse("Vehicle not found", 404));

    await owner.removeVehicle(vehicleId);

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
