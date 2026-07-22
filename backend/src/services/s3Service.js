const {

    PutObjectCommand

} = require("@aws-sdk/client-s3");

const { v4: uuid } = require("uuid");

const s3 = require("../config/aws");


const uploadImage = async (file) => {

    const extension =

        file.originalname.split(".").pop();

    const key =

        `services/${uuid()}.${extension}`;

    const command = new PutObjectCommand({

        Bucket: process.env.AWS_BUCKET_NAME,

        Key: key,

        Body: file.buffer,

        ContentType: file.mimetype

    });

    await s3.send(command);

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

};

module.exports = {

    uploadImage

};