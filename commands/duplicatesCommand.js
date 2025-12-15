const { explore } = require("source-map-explorer");
const fs = require("node:fs");
const path = require("node:path");

const IGNORED_FILE_PATHS = new Set([
  "[no source]",
  "[sourceMappingURL]",
  "[unmapped]",
  "[EOLs]",
]);

module.exports = async function duplicatesCommand(cwd, outPath) {
  const fullOutPath = path.join(cwd, outPath);
  try {
    const { bundles } = await explore(path.join(cwd, outPath) + "/*", {
      output: { format: "json" },
      noBorderChecks: true,
    });

    const packagesMap = {};

    for (const { bundleName, files } of bundles) {
      for (const file of Object.keys(files)) {
        if (IGNORED_FILE_PATHS.has(file)) {
          continue;
        }
        packagesMap[file] = packagesMap.file ?? [];
        packagesMap[file].push(bundleName.replace(fullOutPath, ""));
      }
    }

    let foundDuplicates = false;
    for (const [file, bundles] of Object.entries(packagesMap)) {
      if (bundles.length > 1) {
        console.log(file, bundles);
        foundDuplicates = true;
      }
    }

    if (!foundDuplicates) {
      console.log("No duplicates found!");
    }
  } catch (e) {
    console.log(e);
  }
};
