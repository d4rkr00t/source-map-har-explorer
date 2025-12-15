const { explore } = require("source-map-explorer");
const fs = require("node:fs");
const path = require("node:path");

module.exports = async function exploreCommand(cwd, reportFileName, outPath) {
  try {
    const reportPath = path.join(cwd, reportFileName);
    const result = await explore(path.join(cwd, outPath) + "/*", {
      output: { format: "html" },
      noBorderChecks: true,
    });
    fs.writeFileSync(reportPath, result.output, "utf8");
    console.log("- Done, report saved in:", reportPath);
  } catch (e) {
    console.log(e);
  }
};
