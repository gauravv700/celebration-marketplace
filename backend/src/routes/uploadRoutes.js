const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { uploadServiceImage } = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/authorize");

router.post("/service", protect, authorize("vendor"), upload.single("image"), uploadServiceImage);

module.exports = router;