const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(buffer, fileName = `post_${Date.now()}.jpg`) {
  try {
    const result = await imagekit.upload({
      file: buffer.toString("base64"),
      fileName
    });
    return result;
  } catch (err) {
    console.error("ImageKit upload error:", err.message);
    throw err;
  }
}

module.exports = uploadFile;