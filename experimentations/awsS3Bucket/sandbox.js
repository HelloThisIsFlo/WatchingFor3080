const process = require("process");
const fs = require("fs");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const file = fs.readFileSync("./screenshots/nvidiaStoreGB-diff.png");
const params = {
  Bucket: "watch-for-3080",
  Key: "test.png",
  Body: file,
  ACL: "public-read",
};
s3.upload(params, function (err, data) {
  console.log(err, data);
});
