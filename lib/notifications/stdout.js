async function sendAvailabilityNotification(siteId, siteUrl, diffSnapshotUrl) {
  console.log(
    `
Sending (fake/stdout) Telegram notification:
3080 is AVAILABLE !!!!
  - Site: ${siteId}
  - URL: ${siteUrl}
  - Diff: ${diffSnapshotUrl}
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
