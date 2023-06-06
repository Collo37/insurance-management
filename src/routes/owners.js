const express = require("express");

const {
  getAllOwners,
  addNewOwner,
  getAllOwnerIds,
  updateOwner,
} = require("../controllers/owners");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, getAllOwners);

router.post("/", protect, addNewOwner);

router.get("/ids", protect, getAllOwnerIds);

router.put("/:ownerId", protect, updateOwner);

module.exports = router;
