# Java 356 DB-ready seed package

This package fixes the problem with the previous standalone topic files.

## Important

The individual files export `topic` using the same `TopicSeed` shape used by the Docker seed:

- title
- slug
- description
- estimatedMinutes
- sections

`seed-java-all.ts` is the executable database seeder. It imports all 356 topic files, creates/upserts the Java category, path, and module, then upserts every topic and every topic section.

Run it with the same Prisma/TypeScript execution method you use for your other seed files, for example:

`npx tsx prisma/quetions/seed-java-all.ts`

If your existing Java DB already has a specific path/module hierarchy, keep that hierarchy and use the same `javaTopics` array plus the topic upsert loop from this file. The key missing piece in the previous ZIP was that separate files were only data objects; they were not wired into the Prisma hierarchy/upsert flow.
