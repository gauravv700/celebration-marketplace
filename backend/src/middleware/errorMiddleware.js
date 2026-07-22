const { ZodError } = require("zod");

const errorMiddleware = (err, req, res, next) => {

    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation Failed",
            errors: err.issues
        });
    }

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

module.exports = errorMiddleware;