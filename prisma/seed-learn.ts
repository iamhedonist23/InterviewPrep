import { execSync } from "node:child_process";
import path from "node:path";

const rootDir = path.resolve(__dirname, "..");

async function main() {
  console.log("Starting Learn data reseed...");

  const seeds = [
    { num: 1, name: "Java", file: "seed-java.ts" },
    { num: 2, name: "SQL", file: "seed-sql.ts" },
    { num: 3, name: "React", file: "seed-react.ts" },
    { num: 4, name: "DSA", file: "seed-dsa.ts" },
    { num: 5, name: "Python", file: "seed-python.ts" },
    { num: 6, name: "TypeScript", file: "seed-typescript.ts" },
    { num: 7, name: "Spring Boot", file: "seed-springboot.ts" },
    { num: 8, name: "Next.js", file: "seed-nextjs.ts" },
    { num: 9, name: "System Design", file: "seed-systemdesign.ts" },
    { num: 10, name: "Web Development", file: "seed-webdev.ts" },
    { num: 11, name: "Android", file: "seed-android.ts" },
    { num: 12, name: "Kotlin", file: "seed-kotlin.ts" },
  ];

  for (const seed of seeds) {
    console.log(`${seed.num}/13 - Seeding ${seed.name} learning structure`);
    execSync(`npx tsx prisma/${seed.file}`, {
      cwd: rootDir,
      stdio: "inherit",
      env: process.env,
    });
  }

  console.log("13/13 - Seeding deep Learn content");
  execSync("npx tsx prisma/seed-study.ts", {
    cwd: rootDir,
    stdio: "inherit",
    env: process.env,
  });

  console.log("Learn data reseed complete.");
}

main().catch((error) => {
  console.error("Learn data reseed failed.");
  console.error(error);
  process.exit(1);
});
