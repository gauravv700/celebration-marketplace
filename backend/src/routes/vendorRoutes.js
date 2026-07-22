const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/authorize");

const { createVendor, getVendorServices, getVendorBookings } = require("../controllers/vendorController");

router.post(
    "/",
    protect,
    authorize("vendor"),
    createVendor
);

router.get(
    "/services",
    protect,
    authorize("vendor"),
    getVendorServices
);

router.get("/bookings", protect, authorize("vendor"), getVendorBookings)

module.exports = router;