const stdout = require("./notifications/stdout");
const discord = require("./notifications/discord");

async function sendAvailabilityNotification(siteId, siteUrl, diffSnapshotUrl) {
  stdout.sendAvailabilityNotification(siteId, siteUrl, diffSnapshotUrl);
  discord.sendAvailabilityNotification(siteId, siteUrl, diffSnapshotUrl);
}

async function sendErrorNotification(siteId, err) {
  await stdout.sendErrorNotification(siteId, err);
  await discord.sendErrorNotification(siteId, err);
}

module.exports = {
  sendAvailabilityNotification,
  sendErrorNotification,
};
