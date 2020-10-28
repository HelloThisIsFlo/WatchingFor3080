const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const config = require("./config");
const { v4: uuidv4 } = require("uuid");

async function uploadImg(imgFilename, imgBuffer) {
  const imgFilenameOnS3 = imgFilename + uuidv4() + ".png";
  const result = await s3
    .upload({
      Bucket: config.app.s3Bucket,
      Key: imgFilenameOnS3,
      Body: imgBuffer,
      ACL: "public-read",
    })
    .promise();
  const publicUrl = result.Location;
  return publicUrl;
}

module.exports = uploadImg;
