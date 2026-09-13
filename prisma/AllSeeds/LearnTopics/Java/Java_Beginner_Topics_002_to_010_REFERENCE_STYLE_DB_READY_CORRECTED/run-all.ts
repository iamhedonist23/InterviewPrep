import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const files = [
  "002_installing-java-and-checking-the-version_DETAILED_HUMANIZED_9_5.ts",
  "003_java-source-code-compilation-and-execution_DETAILED_HUMANIZED_9_5.ts",
  "004_java-program-structure_DETAILED_HUMANIZED_9_5.ts",
  "005_keywords-and-identifiers_DETAILED_HUMANIZED_9_5.ts",
  "006_variables-and-constants_DETAILED_HUMANIZED_9_5.ts",
  "007_primitive-data-types_DETAILED_HUMANIZED_9_5.ts",
  "008_reference-types_DETAILED_HUMANIZED_9_5.ts",
  "009_type-casting_DETAILED_HUMANIZED_9_5.ts",
  "010_widening-vs-narrowing-conversion_DETAILED_HUMANIZED_9_5.ts",
];

const projectRoot = process.cwd();
const runnerDirectory = path.dirname(fileURLToPath(import.meta.url));
const tsxCli = path.join(projectRoot, "node_modules", "tsx", "dist", "cli.mjs");

for (const file of files) {
  console.log("\n========================================");
  console.log(`Seeding: ${file}`);
  console.log("========================================\n");

  const result = spawnSync(
    process.execPath,
    [tsxCli, path.join(runnerDirectory, file)],
    {
      cwd: projectRoot,
      stdio: "inherit",
      windowsHide: false,
    },
  );

  if (result.error || result.status !== 0) {
    console.error(
      `Seed failed: ${file}`,
      result.error ?? `(exit code ${result.status})`,
    );
    process.exit(result.status ?? 1);
  }
}

console.log("\n========================================");
console.log("All Java topics 002–010 seeded successfully.");
console.log("========================================\n");
