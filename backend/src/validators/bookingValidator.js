const { z } = require("zod");

const bookingSchema = z.object({
    serviceId: z.string().uuid(),
    bookingDate: z.string(),
    guestCount: z.coerce.number().int().positive(),
    specialRequest: z.string().optional()
});

module.exports = {bookingSchema};