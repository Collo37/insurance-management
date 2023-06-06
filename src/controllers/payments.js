const Payment = require("../models/payments");
const Vehicle = require("../models/vehicles");
const ErrorResponse = require("../utils/errorResponse");

exports.addNewPayment = async (req, res) => {
  try {
    const payment = req.body;
    const newPayment = new Payment(payment);

    await newPayment.save();
    await Vehicle.findByIdAndUpdate(newPayment.vehicleId, {
      $set: { expiryDate: newPayment.expiryDate },
    });

    res.status(201).json({
      message: "New Payment Recorded and reminder added",
      payment: newPayment,
    });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

exports.addManyPayments = async (req, res) => {
  try {
    const payments = req.body;
    payments.forEach(async (payment) => {
      const newPayment = new Payment(payment);

      await newPayment.save();
      await Vehicle.findByIdAndUpdate(newPayment.vehicleId, {
        $set: { expiryDate: newPayment.expiryDate },
      });
    });

    res.send("Success");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  const { pageSize } = req.query;
  try {
    const payments = await Payment.find()
      .populate("vehicleId", "registrationNumber")
      .limit(pageSize && pageSize)
      .sort({ transactionDate: -1 });

    const total = await Payment.countDocuments();

    res.status(200).json({
      payments,
      total,
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const update = req.body;
    const itemId = req.params.itemId;
    if (!update)
      return res.status(400).json({ error: "Enter fields to update" });

    await Payment.findByIdAndUpdate(itemId, { ...update });

    res.json({
      message: "Successfully updated document",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePayment = async (req, res, next) => {
  const paymentId = req.query.paymentId;
  if (!paymentId)
    return next(new ErrorResponse("You must provide a valid payment Id", 400));

  try {
    await Payment.findByIdAndDelete(paymentId);
    res.status(200).json({ success: true, message: "deleted" });
  } catch (error) {
    next(error);
  }
};
