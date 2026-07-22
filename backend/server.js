const express = require("express");
const cors = require("cors");
const helmet = require("helmet")
const morgan = require("morgan")
const rateLimit = require("express-rate-limit")
require("dotenv").config();
const authRoutes = require("./src/routes/authRoutes");
const vendorRoutes = require("./src/routes/vendorRoutes")
const serviceRoutes = require("./src/routes/serviceRoutes")
const bookingRoutes = require("./src/routes/bookingRoutes")
const uploadRoutes = require("./src/routes/uploadRoutes");
const errorMiddleware = require("./src/middleware/errorMiddleware");

const app = express();

app.use(helmet())
app.use(cors({
    origin: "*",
    credentials: true
})
);
app.use(morgan("dev"))
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests. Try again later."
    }
});

app.use("/api", limiter)
app.use("/api/auth", authRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/uploads", uploadRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Celebration Marketplace API Running"
    });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});