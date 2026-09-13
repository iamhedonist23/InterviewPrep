import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const seedFiles = [
  "seed-digital-marketing-working.ts",
  "seed-redis-detailed-working-final.ts",
  "seed-kubernetes-detailed-expanded-v2-fixed2.ts",
  "seed-cpp-programming-detailed-expanded-v3.ts",
  "seed-c-programming-detailed-expanded-v2.ts",
  "seed-dbms-detailed-working.ts",
  "seed-dsa-human-cleaned-fixed.ts",
  "seed-aws-cloud-engineering-detailed-proper.ts",
  "seed-generative-ai-machine-learning-detailed.ts",
  "seed-kubernetes-detailed-expanded-v2-fixed2.ts",
  "seed-machine-learning-data-science-detailed.ts",
  "seed-prompt-engineering-detailed-expanded.ts",
  "seed-python-camel-case-topics.ts",
  "seed-system-design-detailed-working.ts",
  "seed-microservices-detailed-proper.ts",
  "seed-spring-ai-detailed-render-fixed-v2.ts",
  "seed-spring-boot-detailed-render-fixed.ts",
  "seed-advancejava.ts",
  "seed-core-java.ts",
  "seed-machine-learning-detailed-proper.ts",
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
