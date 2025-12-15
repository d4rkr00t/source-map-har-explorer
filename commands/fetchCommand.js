const path = require("node:path");
const fs = require("node:fs");
const download = require("../utils/download");

module.exports = async function fetchCommand(cwd, harPath, outPath) {
  const fullHarPath = path.join(cwd, harPath);
  const fullOutPath = path.join(cwd, outPath);

  reset(fullOutPath);
  await processHar(fullHarPath, fullOutPath);

  console.log("- Done");
};

function reset(outPath) {
  if (fs.existsSync(outPath)) {
    console.log("- Cleaning old output at:", outPath);
    fs.rmSync(outPath, { recursive: true, force: true });
  }
  console.log("- Creating output folder at:", outPath);
  fs.mkdirSync(outPath);
}

async function processHar(harPath, outPath) {
  console.log("- Processing HAR at:", harPath);
  const har = JSON.parse(fs.readFileSync(harPath));
  const filesToDownload = [];

  for (const entry of har.log.entries) {
    if (entry._resourceType === "script") {
      filesToDownload.push(entry.request.url);
      filesToDownload.push(entry.request.url + ".map");
    }
  }

  await Promise.all(filesToDownload.map((url) => download(url, outPath)));
}
