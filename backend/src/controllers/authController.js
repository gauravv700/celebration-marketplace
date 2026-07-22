const { ZodError } = require("zod");
const supabase = require("../config/supabase");
const { signupUser, loginUser } = require("../services/authService");
const { signupSchema, loginSchema } = require("../validators/authValidator");

exports.signup = async (req, res) => {
    try {
        signupSchema.parse(req.body);
        const user = await signupUser(req.body);

        return res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.issues
            });
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        loginSchema.parse(req.body);
        const result =
            await loginUser(req.body);
        return res.status(200).json({
            success: true,
            message: "Login Successfull",
            data: result
        });
    }
    catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.issues
            });
        }
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
}

exports.profile = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user
    });
}