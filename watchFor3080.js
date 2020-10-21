const puppeteer = require("puppeteer");
const fs = require("fs");

const { WebPageSnapshots } = require("./lib/browser");
const {
  sendAvailabilityNotification,
  sendErrorNotification,
} = require("./lib/notifications");

const SITES = {
  nvidiaStoreGB: {
    url:
      "https://www.nvidia.com/en-gb/shop/geforce/?page=1&limit=9&locale=en-gb&category=GPU&gpu=RTX%203080",
    selector: "featured-product",
    waitDuration: 1500,
  },
  nvidiaStoreFR: {
    url:
      "https://www.nvidia.com/fr-fr/shop/geforce/gpu/?page=1&limit=9&locale=fr-fr&category=GPU&gpu=RTX%203080",
    selector: "featured-product",
    waitDuration: 1500,
  },
  scanGB: {
    url: "https://www.scan.co.uk/shops/nvidia/3080-founders-edition",
    selector: "body",
    waitDuration: 1500,
  },
  sandbox: {
    url: "https://ac258cc2bdc8.ngrok.io/fakeWebApp/",
    selector: "featured-product",
    waitDuration: 500,
  },
};

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

const process = require('process')
async function checkForDiffOnAllSites(browser) {
  await Promise.all([
    tryToCheckForDiff(browser, "nvidiaStoreFR"),
    tryToCheckForDiff(browser, "nvidiaStoreGB"),
    tryToCheckForDiff(browser, "scanGB"),
    tryToCheckForDiff(browser, "sandbox"),
  ]);
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

  const browser = await puppeteer.launch();

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
