const express = require("express");
const {
  getAllVehicles,
  addNewVehicle,
  getVehicleIds,
  addManyVehicles,
  getVehicleStats,
  editVehicleDetails,
  deleteVehicle,
} = require("../controllers/vehicles");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, getAllVehicles);
router.get("/ids", protect, getVehicleIds);
router.get("/stats", protect, getVehicleStats);

router.post("/", protect, addNewVehicle);
router.post("/edit/:vehicleId", protect, editVehicleDetails);
router.post("/many", protect, addManyVehicles);

router.delete("/delete/:vehicleId", protect, deleteVehicle);

module.exports = router;
