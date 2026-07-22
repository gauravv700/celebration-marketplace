const { ZodError, success } = require("zod");
const {
    createBookingRecord,
    getBookingRecord,
    updateBookingStatusRecord
} = require("../services/bookingService");
const { triggerBookingAutomation } = require("../services/automationService");
const { bookingSchema } = require("../validators/bookingValidator");

exports.createBooking = async (req, res) => {
    try {
        bookingSchema.parse(req.body);

        const booking = await createBookingRecord({
            ...req.body,
            customerId: req.user.id,
        });

        // await triggerBookingAutomation({
        //     bookingId: booking.id,
        //     customer: req.user.full_name,
        //     vendor: "Royal Banquet",
        //     vendorEmail: "kumarjanu522@gmail.com",
        //     service: "Birthday Package",
        //     bookingDate: booking.booking_date,
        //     guests: booking.guest_count
        // });

        return res.status(200).json({
            success: true,
            message: "Booking Created Successfully",
            booking,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                error: error.issues,
            });
        }

        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const bookings = await getBookingRecord({
            ...req.body,
            customerId: req.user.id,
        });

        return res.status(200).json({
            success: true,
            message: "Bookings Fetched Successfully",
            bookings,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const booking = await updateBookingStatusRecord(
            id,
            status,
            req.user.id
        );

        res.json({
            success: true,
            message: "Booking status updated successfully",
            booking,
        });
    } catch (error) {
        next(error);
    }
};
