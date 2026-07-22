const { z } = require("zod");

const signupSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must contain at least 8 characters"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    role: z.enum(["customer", "vendor"])
});

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must contain at least 8 characters")
});

module.exports = {
    signupSchema,loginSchema
};