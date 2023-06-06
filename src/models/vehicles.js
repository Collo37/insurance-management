const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
    expiryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const vehicle = mongoose.model("Vehicle", VehicleSchema);

module.exports = vehicle;
