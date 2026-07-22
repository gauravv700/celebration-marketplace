const { z } = require("zod");

const createServiceSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title cannot exceed 100 characters"),

    category: z.enum([
        "Birthday",
        "Wedding",
        "Anniversary",
        "Corporate",
        "Baby Shower",
        "Engagement"
    ]),

    description: z
        .string()
        .trim()
        .min(20, "Description should be at least 20 characters"),

    price: z.coerce
        .number()
        .positive("Price must be greater than 0"),

    capacity: z.coerce
        .number()
        .int()
        .positive("Capacity must be greater than 0")
});

const updateServiceSchema = createServiceSchema.partial();

module.exports = {
    createServiceSchema,
    updateServiceSchema
};