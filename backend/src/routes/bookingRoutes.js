const express = require("express")
const { protect } = require("../middleware/authMiddleware")
const { authorize } = require("../middleware/authorize");
const { createBooking, getBookings, updateBookingStatus } = require("../controllers/bookingController");
const router = express.Router()

router.post("/", protect, authorize("customer"), createBooking);
router.get("/", protect, authorize("customer"), getBookings);
router.patch("/:id/status", protect, authorize("vendor"), updateBookingStatus)

module.exports = router