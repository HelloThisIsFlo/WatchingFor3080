require("dotenv").config();
const axios = require("axios");

const siteId = "nvidiaStoreGB";
const siteUrl = "http://floriankempenich.com";
const diffSnapshotUrl =
  "https://watch-for-3080.s3.amazonaws.com/screenshots/sandbox-diff.png";

const webhookMsg = {
  username: siteId,
  avatar_url:
    "https://g4x8s4d4.stackpathcdn.com/wp-content/uploads//2017/05/Nvidia-Logo-860x450_c.jpg",
  content: "3080 is AVAILABLE",
  embeds: [
    {
      image: {
        url: diffSnapshotUrl,
      },
    },
    {
      title: "BUY NOW !!!!!!!",
      url: siteUrl,
    },
  ],
};

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
console.log(webhookUrl);

axios
  .post(webhookUrl, webhookMsg)
  .then((resp) => {
    console.log(resp);
  })
  .catch((err) => {
    console.log(err);
  });
