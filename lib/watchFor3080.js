require("dotenv").config();
const puppeteer = require("puppeteer");
const fs = require("fs");
const config = require("./config");

const { WebPageSnapshots } = require("./browser");
const {
  sendAvailabilityNotification,
  sendErrorNotification,
} = require("./notifications");
const uploadImg = require("./uploadImg");

const DIFF_THRESHOLD = 0.003;

async function checkForDiff(browser, siteId) {
  if (!(siteId in config.sites)) throw new Error(`Invalid siteId: '${siteId}'`);

  console.log(`Checking diff for: '${siteId}'`);
  const site = config.sites[siteId];
  const webPageSnapshots = new WebPageSnapshots(
    browser,
    siteId,
    site.url,
    site.selector,
    site.waitDuration
  );
  await webPageSnapshots.init();

  await webPageSnapshots.updateSnapshot();

  if (webPageSnapshots.hasBothSnapshot()) {
    const diffPercent = await webPageSnapshots.compareSnapshots();

    if (diffPercent > DIFF_THRESHOLD) {
      const diffSnapshotImgBuffer = fs.readFileSync(
        webPageSnapshots.diffSnapshotPath()
      );
      const diffImgUrl = await uploadImg(
        webPageSnapshots.diffSnapshotPath(),
        diffSnapshotImgBuffer
      );

      await sendAvailabilityNotification(siteId, site.url, diffImgUrl);
    }
  }
}
async function tryToCheckForDiff(browser, siteId) {
  try {
    await checkForDiff(browser, siteId);
  } catch (err) {
    console.log(err);
    await sendErrorNotification(siteId, err);
  }
}

async function checkForDiffOnAllSites(browser) {
  const allSiteIds = Object.keys(config.sites);

  await Promise.all(
    allSiteIds.map((siteId) => tryToCheckForDiff(browser, siteId))
  );
}

async function watchFor3080() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    console.log("");
    const start = Date.now();
    await checkForDiffOnAllSites(browser);
    const end = Date.now();
    const runDurationSec = (end - start) / 1000;
    console.log(`This run took: ${runDurationSec}s`);
    console.log("");
  } catch (err) {
    console.log(err);
  } finally {
    browser.close();
  }
}

module.exports = watchFor3080;
