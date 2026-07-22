const { uploadImage } = require("../services/s3Service");

exports.uploadServiceImage = async (req, res) => {
  try {
    console.log("Controller");
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image required",
      });
    }

    const imageUrl = await uploadImage(req.file);

    return res.status(200).json({
      success: true,

      imageUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
