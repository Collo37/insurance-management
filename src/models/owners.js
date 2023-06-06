const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    vehicles: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Vehicle",
    },
  },
  { timestamps: true }
);

OwnerSchema.methods.removeVehicle = async function (vehicleId) {
  let vehiclesOwned = this.vehicles.map((vehicle) => vehicle.toString());
  try {
    this.vehicles.splice(vehiclesOwned.indexOf(vehicleId), 1);
    console.log(this.vehicles);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = mongoose.model("Owner", OwnerSchema);
