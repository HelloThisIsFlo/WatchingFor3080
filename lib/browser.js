const fs = require("fs");
const compareImages = require("resemblejs/compareImages");

async function screenshotDOMElement(page, opts = {}) {
  const padding = "padding" in opts ? opts.padding : 0;
  const path = "path" in opts ? opts.path : null;
  const selector = opts.selector;

  if (!selector) throw new Error("Please provide a selector.");

  const rect = await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    if (!element) return null;
    const { x, y, width, height } = element.getBoundingClientRect();
    return { left: x, top: y, width, height, id: element.id };
  }, selector);

  if (!rect) {
    const html = await page.content();
    throw new Error(
      `Could not find element that matches selector: ${selector}.\nHTML: ${html}`
    );
  }

  return await page.screenshot({
    path,
    clip: {
      x: rect.left - padding,
      y: rect.top - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    },
  });
}

function fileExists(path) {
  try {
    return fs.existsSync(path);
  } catch (err) {
    return false;
  }
}

const snapshotPath = (siteId, tag) => `screenshots/${siteId}-${tag}.png`;

class WebPageSnapshots {
  constructor(browser, siteId, siteUrl, siteSelector, siteWaitDuration) {
    this.browser = browser;
    this.page = null;

    this.siteId = siteId;
    this.siteUrl = siteUrl;
    this.siteSelector = siteSelector;
    this.siteWaitDuration = siteWaitDuration;

    this.newFilename = `${this.siteId}-new.png`;
    this.oldFilename = `${this.siteId}-old.png`;
  }

  async init() {
    const ensureWeHitDesktopBreakpoint = async () => {
      await this.page.setViewport({
        width: 1500,
        height: 1200,
        deviceScaleFactor: 1,
      });
    };
    const preventNavigationTimeout = async () => {
      await this.page.setDefaultNavigationTimeout(0);
    };
    const preventAccessDeniedError = async () => {
      const notHeadlessChromeUserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0";
      await this.page.setUserAgent(notHeadlessChromeUserAgent)
    }

    this.page = await this.browser.newPage();
    await ensureWeHitDesktopBreakpoint();
    await preventNavigationTimeout();
    await preventAccessDeniedError();
  }

  async updateSnapshot() {
    await this.page.goto(this.siteUrl, { waitUntil: "networkidle0" });
    await this.page.waitForTimeout(this.siteWaitDuration);

    if (this.hasAtLeastOneSnapshot()) this.renameNewSnapshotToOld();

    const path = this.newSnapshotPath();

    await screenshotDOMElement(this.page, {
      path,
      selector: this.siteSelector,
      padding: 0,
    });
  }

  renameNewSnapshotToOld() {
    fs.renameSync(this.newSnapshotPath(), this.oldSnapshotPath());
  }
  newSnapshotPath() {
    return snapshotPath(this.siteId, "new");
  }

  oldSnapshotPath() {
    return snapshotPath(this.siteId, "old");
  }
  diffSnapshotPath() {
    return snapshotPath(this.siteId, "diff");
  }

  hasAtLeastOneSnapshot() {
    return fileExists(this.newSnapshotPath());
  }

  hasBothSnapshot() {
    return this.hasAtLeastOneSnapshot() && fileExists(this.oldSnapshotPath());
  }

  async compareSnapshots() {
    const options = {
      output: {
        errorColor: {
          red: 255,
          green: 0,
          blue: 0,
        },
        largeImageThreshold: 0,
        useCrossOrigin: false,
        outputDiff: true,
      },
      scaleToSameSize: true,
      ignore: "antialiasing",
    };

    const data = await compareImages(
      fs.readFileSync(this.newSnapshotPath()),
      fs.readFileSync(this.oldSnapshotPath()),
      options
    );

    fs.writeFileSync(this.diffSnapshotPath(), data.getBuffer());

    return data.rawMisMatchPercentage;
  }
}
module.exports = { WebPageSnapshots };
