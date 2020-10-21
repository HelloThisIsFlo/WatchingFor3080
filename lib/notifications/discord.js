const axios = require("axios");

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
const nvidiaLogoUrl =
  "https://g4x8s4d4.stackpathcdn.com/wp-content/uploads//2017/05/Nvidia-Logo-860x450_c.jpg";

async function sendDiscordWebhookNotification(webhookMsg) {
  await axios.post(webhookUrl, webhookMsg);
}

async function sendAvailabilityNotification(siteId, siteUrl, diffSnapshotUrl) {
  await sendDiscordWebhookNotification({
    username: siteId,
    avatar_url: nvidiaLogoUrl,
    content: "3080 is AVAILABLE",
    embeds: [
      { image: { url: diffSnapshotUrl } },
      { title: "BUY NOW !!!!!!!", url: siteUrl },
    ],
  });
}

async function sendErrorNotification(siteId, err) {
  await sendDiscordWebhookNotification({
    username: `ERROR - ${siteId}`,
    avatar_url: nvidiaLogoUrl,
    content: err,
  });
}

module.exports = {
  sendAvailabilityNotification,
  sendErrorNotification,
};
