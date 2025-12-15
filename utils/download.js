const path = require("node:path");
const fs = require("node:fs");
const stream = require("node:stream");

module.exports = async function download(url, outPath) {
  console.log("- Downloading:", url);
  const fileName = url.split("/").pop();
  const filePath = path.join(outPath, fileName);
  try {
    const res = await fetch(url);
    if (res.ok && res.body) {
      const writer = fs.createWriteStream(filePath);
      stream.Readable.fromWeb(res.body).pipe(writer);
      console.log("- Complete:", url);
    } else {
      console.log("- Failed:", url);
    }
  } catch {
    console.log("- Failed:", url);
  }
};
