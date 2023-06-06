const express = require("express");

const {
  addNewPayment,
  getAllPayments,
  updatePayment,
  addManyPayments,
  deletePayment,
} = require("../controllers/payments");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, getAllPayments);
router.post("/", protect, addNewPayment);
router.post("/many", protect, addManyPayments);
router.put("/itemId", protect, updatePayment);
router.delete("/delete", protect, deletePayment);

module.exports = router;
