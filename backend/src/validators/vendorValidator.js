const { z } = require("zod");

const vendorSchema = z.object({
    businessName: z
        .string()
        .min(3),
    description: z
        .string()
        .min(10),
    city: z
        .string(),
    address: z
        .string(),
    phone: z
        .string()
        .regex(/^\d{10}$/)
});

module.exports = {
    vendorSchema
};