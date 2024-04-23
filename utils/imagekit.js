const ImageKit = require("imagekit");

exports.initImageKit = () => {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLICK_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });

    return imagekit;
}

