const Reminder = require("../models/reminders");

exports.getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json({
      status: "Ok",
      data: reminders,
    });
  } catch (error) {
    console.log(error);
    res.send(404).json({
      status: "Error",
      error,
    });
  }
};

exports.addNewReminder = async (req, res) => {
  try {
    const newReminder = new Reminder(req.body);
    await newReminder.save();

    res.status(201).json({
      status: "Created",
      data: newReminder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      error: error.message
    });
  }
};


exports.editReminder = async (req, res) => {
    
}

exports.deleteReminder = async (req, res) => {
    
}