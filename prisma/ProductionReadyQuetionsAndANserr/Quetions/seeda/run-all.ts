import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const seedFiles = [
  "HR.ts",
  "DigitalMarketing.ts",
  "Graphics.ts",
  "PreSales.ts",
  "QA.ts",
  "AI.ts",
  "Android.ts",
  "C.ts",
  "CPP.ts",
  "DataScience.ts",
  "ML.ts",
  "DOCKER.ts",
  "MySQL.ts",
  "Python.ts",
  "SystemDesign.ts",
  "DSA.ts",
  "Java_metadata_fixed.ts",
];

const projectRoot = process.cwd();
const seedDirectory = __dirname;
const tsxCli = path.join(
  projectRoot,
  "node_modules",
  "tsx",
  "dist",
  "cli.mjs",
);

if (!existsSync(tsxCli)) {
  console.error(`tsx was not found at: ${tsxCli}`);
  console.error("");
  console.error("Run this command from your project root:");
  console.error("D:\\Interview Website>");
  process.exit(1);
}

const missing = seedFiles
  .map((file) => path.join(seedDirectory, file))
  .filter((file) => !existsSync(file));

if (missing.length > 0) {
  console.error("Missing seed file(s):");
  for (const file of missing) {
    console.error(`  ${file}`);
  }
  console.error("");
  console.error("Make sure run-all.ts is in the same folder as the 011–029 seed files.");
  process.exit(1);
}

console.log("");
console.log("========================================");
console.log("Java topics 011–029 detailed seed runner");
console.log("========================================");
console.log(`Project root: ${projectRoot}`);
console.log(`Seed directory: ${seedDirectory}`);
console.log(`Topics to seed: ${seedFiles.length}`);
console.log("");

for (const file of seedFiles) {
  console.log("========================================");
  console.log(`Seeding: ${file}`);
  console.log("========================================");
  console.log("");

  const result = spawnSync(
    process.execPath,
    [tsxCli, path.join(seedDirectory, file)],
    {
      cwd: projectRoot,
      stdio: "inherit",
      windowsHide: false,
    },
  );

  if (result.error) {
    console.error("");
    console.error(`Seed failed: ${file}`);
    console.error(result.error);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error("");
    console.error(`Seed failed: ${file} (exit code ${result.status ?? "unknown"})`);
    process.exit(result.status ?? 1);
  }

  console.log("");
  console.log(`Completed: ${file}`);
  console.log("");
}

console.log("========================================");
console.log("ALL INTERVIEW QUETIONS SEEDED SUCCESSFULLY");
console.log("========================================");
