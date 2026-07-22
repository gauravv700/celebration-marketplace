const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter(req, file, cb) {
                const allowed = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    }
});

module.exports = upload;