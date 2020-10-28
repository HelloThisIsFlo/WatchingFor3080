async function sendAvailabilityNotification(siteId, siteUrl, diffSnapshotUrl) {
  console.log(
    `
AVAILABLE !!!!
  - Site: ${siteId}
  - URL: ${siteUrl}
  - Diff: ${diffSnapshotUrl}
  `
  );
}

async function sendErrorNotification(siteId, err) {
  console.log(
    `
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
