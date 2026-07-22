const { ZodError } = require("zod");
const { createServiceSchema } = require("../validators/serviceValidator");
const asyncHandler = require("../utils/asyncHandler");
const { uploadImage } = require("../services/s3Service");

const {
    createServiceRecord,
    getAllServicesRecord,
    getServiceRecord,
    updateServiceRecord,
    deleteServiceRecord,
} = require("../services/serviceService");
const supabase = require("../config/supabase");

// Create Service
exports.createService = asyncHandler(async (req, res) => {
    createServiceSchema.parse(req.body);
    let imageUrl = null;

    if (req.file) {
        imageUrl = await uploadImage(req.file);
    }

    const service = await createServiceRecord({
        ...req.body,
        userId: req.user.id,
        image_url: imageUrl,
    });

    return res.status(201).json({
        success: true,
        message: "Service created successfully",
        service,
    });
});

// Get All Services
exports.getAllServices = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const services = await getAllServicesRecord(page, limit);

        return res.status(200).json({
            success: true,
            services,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Single Service
exports.getService = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await getServiceRecord(id);

        return res.status(200).json({
            success: true,
            service,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Service
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };
        createServiceSchema.partial().parse(updates);

        if (req.file) {
            updates.image_url = await uploadImage(req.file);
        }

        const updatedService = await updateServiceRecord({
            serviceId: id,
            userId: req.user.id,
            updates
        });

        return res.status(200).json({
            success: true,
            message: "Service updated successfully",
            updatedService,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.issues,
            });
        }

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Service
exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteServiceRecord(id, req.user.id);

        return res.status(200).json({
            success: true,
            message: "Service deleted successfully",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
