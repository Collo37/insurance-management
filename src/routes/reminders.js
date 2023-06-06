const express = require("express");

const { addNewReminder, deleteReminder, editReminder, getAllReminders } = require("../controllers/reminders");

const router = express.Router();

router.get("/", getAllReminders);

router.post("/", addNewReminder);

router.put("/", editReminder);

router.delete("/", deleteReminder);

module.exports = router;