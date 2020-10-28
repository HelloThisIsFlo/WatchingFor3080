module.exports = {
  app: {
    s3Bucket: "watch-for-3080",
  },

  // TODO: Add message for each link directly in the config
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

    sf750_overclockers: {
      url:
        "https://www.overclockers.co.uk/corsair-sf-series-750w-80-plus-platinum-modular-sfx-power-supply-cp-9020186-uk-ca-24j-cs.html",
      selector: "#buybox",
      waitDuration: 500,
    },
    sf750_corsair: {
      url:
        "https://www.corsair.com/uk/en/Categories/Products/Power-Supply-Units/Power-Supply-Units-Advanced/SF-Series/p/CP-9020186-UK",
      selector: ".wrapper",
      waitDuration: 500,
    },
  },
};
