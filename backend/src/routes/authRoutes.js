const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    signup,
    login,
    logout,
    profile
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

// router.post("/logout", logout);
router.get("/profile", protect, profile);

module.exports = router;