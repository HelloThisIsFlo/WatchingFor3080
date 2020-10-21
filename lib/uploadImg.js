const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const config = require("./config");

async function uploadImg(imgFilename, imgBuffer) {
  console.log("Uploading img to s3...")
  const result = await s3
    .upload({
      Bucket: config.app.s3Bucket,
      Key: imgFilename,
      Body: imgBuffer,
      ACL: "public-read",
    })
    .promise();
  const publicUrl = result.Location;
  return publicUrl;
}

module.exports = uploadImg;
