module.exports = {
  app: {
    s3Bucket: "watch-for-3080",
  },

  // TODO: Add message for each link directly in the config
  sites: {
    nvidiaStoreGB_3080: {
      url:
        "https://shop.nvidia.com/en-gb/geforce/store/gpu/?page=1&limit=9&locale=en-gb&category=GPU&gpu=RTX%203080",
      selector: ".featured-container-xl",
      waitDuration: 3000,
    },
    nvidiaStoreFR_3080: {
      url:
        "https://shop.nvidia.com/fr-fr/geforce/store/gpu/?page=1&limit=9&locale=fr-fr&category=GPU&gpu=RTX%203080",
      selector: ".featured-container-xl",
      waitDuration: 3000,
    },
    nvidiaStoreGB_3070: {
      url:
        "https://shop.nvidia.com/en-gb/geforce/store/gpu/?page=1&limit=9&locale=en-gb&category=GPU&gpu=RTX%203070",
      selector: ".featured-container-xl",
      waitDuration: 3000,
    },
    nvidiaStoreFR_3070: {
      url:
        "https://shop.nvidia.com/fr-fr/geforce/store/gpu/?page=1&limit=9&locale=fr-fr&category=GPU&gpu=RTX%203070",
      selector: ".featured-container-xl",
      waitDuration: 3000,
    },
    // sandbox: {
    //   url: "https://www.timeanddate.com/worldclock/personal.html",
    //   selector: ".c-city__content",
    //   waitDuration: 3000,
    // },
  },
};
