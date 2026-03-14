require("dotenv").config();
const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(buffer, fileName = `post_${Date.now()}.jpg`) {
  if (!buffer) throw new Error("No file buffer provided");
  try {
    const response = await imagekit.upload({
      file: buffer.toString("base64"),
      fileName: fileName,
    });
    return response;
  } catch (err) {
    console.error("ImageKit upload error:", err);
    throw err;
  }
}

module.exports = uploadFile;