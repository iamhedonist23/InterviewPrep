import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const seedFiles = [
  "011_literals_ULTRA_HUMANIZED_DB_READY.ts",
  "012_operators_ULTRA_HUMANIZED_DB_READY.ts",
  "013_operator-precedence_ULTRA_HUMANIZED_DB_READY.ts",
  "014_expressions-and-statements_ULTRA_HUMANIZED_DB_READY.ts",
  "015_input-and-output_ULTRA_HUMANIZED_DB_READY.ts",
  "016_scanner_ULTRA_HUMANIZED_DB_READY.ts",
  "017_comments-and-documentation-comments_ULTRA_HUMANIZED_DB_READY.ts",
  "018_if-else-if-and-else_ULTRA_HUMANIZED_DB_READY.ts",
  "019_switch_ULTRA_HUMANIZED_DB_READY.ts",
  "020_for-loop_ULTRA_HUMANIZED_DB_READY.ts",
  "021_while-loop_ULTRA_HUMANIZED_DB_READY.ts",
  "022_do-while-loop_ULTRA_HUMANIZED_DB_READY.ts",
  "023_break-and-continue_ULTRA_HUMANIZED_DB_READY.ts",
  "024_arrays_ULTRA_HUMANIZED_DB_READY.ts",
  "025_multidimensional-arrays_ULTRA_HUMANIZED_DB_READY.ts",
  "026_var-local-variable-type-inference_ULTRA_HUMANIZED_DB_READY.ts",
  "027_jdk-vs-jre-vs-jvm_ULTRA_HUMANIZED_DB_READY.ts",
  "028_main-method_ULTRA_HUMANIZED_DB_READY.ts",
  "029_defining-and-calling-methods_ULTRA_HUMANIZED_DB_READY.ts",
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
console.log("ALL JAVA TOPICS 011–029 SEEDED SUCCESSFULLY");
console.log("========================================");
