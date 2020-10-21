require("dotenv").config();
const puppeteer = require("puppeteer");
const fs = require("fs");

const { WebPageSnapshots } = require("./lib/browser");
const {
  sendAvailabilityNotification,
  sendErrorNotification,
} = require("./lib/notifications");

const SITES = require("./sites");

const DIFF_THRESHOLD = 0.003;

async function checkForDiff(browser, siteId) {
  if (!(siteId in SITES)) throw new Error(`Invalid siteId: '${siteId}'`);

  console.log(`Checking diff for: '${siteId}'`);
  const site = SITES[siteId];
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
      await sendAvailabilityNotification(
        siteId,
        site.url,
        webPageSnapshots.diffSnapshotPath()
      );
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
  const allSiteIds = Object.keys(SITES);

  await Promise.all(
    allSiteIds.map((siteId) => tryToCheckForDiff(browser, siteId))
  );
}

(async () => {
  const listFiles = () => {
    fs.readdir(".", function (err, items) {
      console.log(items);

      for (var i = 0; i < items.length; i++) {
        console.log(items[i]);
      }
    });
  };

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
})();
