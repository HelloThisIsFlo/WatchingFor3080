const stdout = require("./notifications/stdout");
const discord = require("./notifications/discord");

async function sendAvailabilityNotification(siteId, siteUrl, diffSnapshotUrl) {
  stdout.sendAvailabilityNotification(siteId, siteUrl, diffSnapshotUrl);
  discord.sendAvailabilityNotification(siteId, siteUrl, diffSnapshotUrl);
}

async function sendErrorNotification(siteId, err) {
  stdout.sendAvailabilityNotification(siteId, err);
  discord.sendAvailabilityNotification(siteId, err);
}

module.exports = {
  sendAvailabilityNotification,
  sendErrorNotification,
};
