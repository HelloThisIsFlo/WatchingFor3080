async function sendAvailabilityNotification(siteId, siteUrl, diffSnapshotPath) {
  console.log(
    `
Sending (fake/stdout) Telegram notification:
3080 is AVAILABLE !!!!
  - Site: ${siteId}
  - URL: ${siteUrl}
  - Diff: ${diffSnapshotPath}
  `
  );
}

async function sendErrorNotification(siteId, err) {
  console.log(
    `
Sending (fake/stdout) Telegram notification:
ERROR
- SiteId: ${siteId}
- ${err}
  `
  );
}

module.exports = {
  sendAvailabilityNotification,
  sendErrorNotification,
};
