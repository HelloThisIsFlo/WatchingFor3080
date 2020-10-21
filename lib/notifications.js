const stdout = require("./notifications/stdout");
const discord = require("./notifications/discord");

async function sendAvailabilityNotification(siteId, siteUrl, diffSnapshotUrl) {
  stdout.sendAvailabilityNotification(siteId, siteUrl, diffSnapshotUrl);
  discord.sendAvailabilityNotification(siteId, siteUrl, diffSnapshotUrl);
}

async function sendErrorNotification(siteId, err) {
  await stdout.sendAvailabilityNotification(siteId, err);
  await discord.sendAvailabilityNotification(siteId, err);
}

module.exports = {
  sendAvailabilityNotification,
  sendErrorNotification,
};
