#!/usr/bin/env node

const path = require("node:path");

const fetchCommand = require("./commands/fetchCommand");
const exploreCommand = require("./commands/exploreCommand");
const duplicatesCommand = require("./commands/duplicatesCommand");

const command = process.argv[2];
const args = Array.prototype.slice.call(process.argv, 3);
const cwd = process.cwd();

const DEFAULT_OUTPUT_PATH = "har-explorer-output";

if (command === "fetch") {
  const harPath = args[0];
  if (!harPath) {
    console.log("- Har path can't be empty");
    process.exit(1);
  }

  const outPath = args[1] ?? DEFAULT_OUTPUT_PATH;

  fetchCommand(cwd, harPath, outPath).then(() => {
    console.log("- Running explore on downloaded files:", outPath);
    const explorerHTMLPath = `${path.basename(harPath)}.html`;
    exploreCommand(cwd, explorerHTMLPath, outPath);
  });
} else if (command === "explore") {
  const outPath = args[0] ?? DEFAULT_OUTPUT_PATH;

  exploreCommand(cwd, "explorer.html", outPath);
} else if (command === "dupes") {
  const outPath = args[0] ?? DEFAULT_OUTPUT_PATH;

  duplicatesCommand(cwd, outPath);
}
