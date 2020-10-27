module.exports = {
  app: {
    s3Bucket: "watch-for-3080",
  },

  sites: {
    nvidiaStoreGB_3080: {
      url:
        "https://www.nvidia.com/en-gb/shop/geforce/?page=1&limit=9&locale=en-gb&category=GPU&gpu=RTX%203080",
      selector: "featured-product",
      waitDuration: 3000,
    },
    nvidiaStoreFR_3080: {
      url:
        "https://www.nvidia.com/fr-fr/shop/geforce/gpu/?page=1&limit=9&locale=fr-fr&category=GPU&gpu=RTX%203080",
      selector: "featured-product",
      waitDuration: 3000,
    },
    nvidiaStoreGB_3070: {
      url:
        "https://www.nvidia.com/en-gb/shop/geforce/?page=1&limit=9&locale=en-gb&category=GPU&gpu=RTX%203070",
      selector: "featured-product",
      waitDuration: 3000,
    },
    nvidiaStoreFR_3070: {
      url:
        "https://www.nvidia.com/fr-fr/shop/geforce/gpu/?page=1&limit=9&locale=fr-fr&category=GPU&gpu=RTX%203070",
      selector: "featured-product",
      waitDuration: 3000,
    },
    // scanGB: {
    //   url: "https://www.scan.co.uk/shops/nvidia/3080-founders-edition",
    //   selector: "body",
    //   waitDuration: 1500,
    // },
    // sandbox: {
    //   url: "https://95f0b2a625ab.ngrok.io/fakeWebApp/",
    //   selector: "featured-product",
    //   waitDuration: 500,
    // },
  },
};
