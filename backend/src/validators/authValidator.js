const { z } = require("zod");

const signupSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must contain at least 8 characters"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    role: z.enum(["customer", "vendor"]),
    businessName: z.string().trim().min(3, "Business name must be at least 3 characters").optional(),
    description: z.string().trim().min(10, "Description must be at least 10 characters").optional(),
    city: z.string().trim().min(1, "City is required").optional(),
    address: z.string().trim().min(1, "Address is required").optional()
}).superRefine((data, ctx) => {
    if (data.role !== "vendor") return;

    for (const field of ["businessName", "description", "city", "address"]) {
        if (!data[field]) {
            ctx.addIssue({
                code: "custom",
                path: [field],
                message: `${field === "businessName" ? "Business name" : field[0].toUpperCase() + field.slice(1)} is required for vendor accounts`
            });
        }
    }
});

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must contain at least 8 characters")
});

module.exports = {
    signupSchema,loginSchema
};
