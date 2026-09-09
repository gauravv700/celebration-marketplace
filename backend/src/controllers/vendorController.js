const { ZodError } = require("zod");
const { createVendorProfile, getVendorProfile, getVendorServicesRecord, getVendorBookingsRecord } = require("../services/vendorService")
const { vendorSchema } = require("../validators/vendorValidator")

exports.createVendor = async (req, res) => {
    try {
        vendorSchema.parse(req.body);

        const vendor = await createVendorProfile({
            ...req.body,
            userId: req.user.id
        });

        return res.status(201).json({
            success: true,
            data: vendor
        });

    }

    catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.issues
            });
        }

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

exports.getVendorProfile = async (req, res) => {
    try {
        const vendor = await getVendorProfile(req.user.id);
        return res.status(200).json({
            success: true,
            data: vendor
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

exports.getVendorServices = async (req, res) => {
    try {
        console.log("Request coming")
        const services = await getVendorServicesRecord(req.user.id);
        console.log("Hii" + services)
        return res.status(200).json({
            success: true,
            services
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getVendorBookings = async (req, res) => {

    try {
        console.log("Request coming")
        const bookings = await getVendorBookingsRecord(req.user.id);

        res.status(200).json({
            success: true,
            bookings
        });

    } catch (error) {
        next(error);
    }

};
