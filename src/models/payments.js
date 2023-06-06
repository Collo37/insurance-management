const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: String,
      default: "Cash",
    },
    transactionCode: {
      type: String,
    },
    transactionDate: {
      type: Date,
      required: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    expiryDate: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

const payment = mongoose.model("Payment", PaymentSchema);

module.exports = payment;
