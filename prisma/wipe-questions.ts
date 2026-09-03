/**
 * prisma/wipe-questions.ts
 *
 * Deletes ALL InterviewQuestion rows so you can reseed from scratch.
 * Safe by default: dry run unless you pass --confirm.
 *
 * USAGE
 *   npx tsx prisma/wipe-questions.ts            (dry run, counts only)
 *   npx tsx prisma/wipe-questions.ts --confirm   (actually deletes)
 *   npx prisma db seed                           (reseed after wiping)
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const isConfirmed = process.argv.includes("--confirm");

  const count = await prisma.interviewQuestion.count();
  console.log(`InterviewQuestion rows currently in database: ${count}`);

  if (count === 0) {
    console.log("Nothing to delete.");
    return;
  }

  if (!isConfirmed) {
    console.log("\nDRY RUN - no rows were deleted.");
    console.log("Re-run with --confirm to actually delete all rows.");
    return;
  }

  const result = await prisma.interviewQuestion.deleteMany({});
  console.log(`\nDeleted ${result.count} rows.`);
  console.log("Next step: npx prisma db seed");
}

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
