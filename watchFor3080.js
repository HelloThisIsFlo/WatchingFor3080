const puppeteer = require("puppeteer");
const fs = require("fs");

const { WebPageSnapshots } = require("./lib/browser");

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

async function sendNotification(siteId, siteUrl, diffSnapshotPath) {
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
      await sendNotification(
        siteId,
        site.url,
        webPageSnapshots.diffSnapshotPath()
      );
    }
  }
}

async function checkForDiffOnAllSites(browser) {
  await Promise.all([
    checkForDiff(browser, "nvidiaStoreFR"),
    checkForDiff(browser, "nvidiaStoreGB"),
    checkForDiff(browser, "scanGB"),
    checkForDiff(browser, "sandbox"),
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
    const start = Date.now();
    await checkForDiffOnAllSites(browser);
    const end = Date.now();
    const runDurationSec = (end - start) / 1000;
    console.log(`This run took: ${runDurationSec}s`);
  } catch (err) {
    console.log(err);
  } finally {
    browser.close();
  }
})();
