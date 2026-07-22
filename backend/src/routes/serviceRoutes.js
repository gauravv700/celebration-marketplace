const express = require("express")
const router = express.Router()

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/authorize");
const { createService, getAllServices, getService, updateService, deleteService } = require("../controllers/serviceController");
const upload = require("../middleware/upload");

router.post("/", protect, authorize("vendor"), upload.single("image"), createService);
router.get("/", getAllServices);
router.get("/:id", getService);
router.put("/:id", protect, authorize("vendor"), upload.single("image"), updateService);
router.delete("/:id", protect, authorize("vendor"), deleteService)

module.exports = router