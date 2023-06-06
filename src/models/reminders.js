const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },
    insuranceExpiry: {
        type: Date,
        required: true,
    },
    settled: {
        type: Boolean,
        default: false
    }
});

const reminder = mongoose.model("Reminder", ReminderSchema);

module.exports = reminder;