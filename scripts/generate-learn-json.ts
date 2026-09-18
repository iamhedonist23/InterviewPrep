import { mkdir, readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

type TopicSeed = {
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  sections?: Array<{ title: string; content: string }>;
};

type ModuleSeed = {
  title: string;
  slug: string;
  description: string;
  topics?: TopicSeed[];
};

type PathSeed = {
  name: string;
  slug: string;
  description: string;
  level: string;
  modules: ModuleSeed[];
};

type CategorySeed = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
  paths: PathSeed[];
};

type LearnCatalog = {
  categories: CategorySeed[];
};

const seedDirectory = path.resolve("prisma/AllSeeds/LearnTopics/ProperSeeds/updated");
const categoryOutputDirectory = path.resolve("data/learn-courses");

function readCategory(source: string, filename: string): CategorySeed {
  const categoryMatch = source.match(/const\s+(\w*(?:category|Category)\w*)(?:\s*:\s*CategorySeed)?\s*=/);
  if (!categoryMatch) throw new Error(`Could not find CategorySeed in ${filename}`);

  const ensureCategoryIndex = source.search(/async function\s+\w+\s*\(/);
  if (ensureCategoryIndex === -1) throw new Error(`Could not find database writer in ${filename}`);

  const dataSource = source
    .slice(0, ensureCategoryIndex)
    .replace(/^import[^;]+;\s*$/gm, "")
    .replace(/^const prisma = new PrismaClient\(\);\s*$/m, "")
    .replace(/StudyLevel\.(BEGINNER|INTERMEDIATE|ADVANCED|INTERVIEW_PREP)/g, '"$1"');
  const compiled = ts.transpileModule(`${dataSource}\nmodule.exports = { ...${categoryMatch[1]}, paths: ${categoryMatch[1]}.paths ?? (typeof paths === "undefined" ? [] : paths) };`, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const context = { module: { exports: undefined as CategorySeed | undefined }, exports: {} };
  vm.runInNewContext(compiled, context, { filename });
  if (!context.module.exports) throw new Error(`Could not evaluate ${filename}`);
  return context.module.exports;
}

function normalizeCategory(category: CategorySeed): CategorySeed {
  const categoryId = `learn-category-${category.slug}`;
  return {
    ...category,
    paths: category.paths.map((learnPath) => {
      const pathId = `${categoryId}-path-${learnPath.slug}`;
      const sourceModules = learnPath.modules;
      const uniqueModules = sourceModules.filter((learnModule, index) => sourceModules.map((item) => item.slug).lastIndexOf(learnModule.slug) === index);
      return {
        ...learnPath,
        modules: uniqueModules.map((learnModule) => {
          const moduleId = `${pathId}-module-${learnModule.slug}`;
          const sourceTopics = learnModule.topics ?? [];
          const uniqueTopics = sourceTopics.filter((topic, index) => sourceTopics.map((item) => item.slug).lastIndexOf(topic.slug) === index);
          return {
            ...learnModule,
            topics: uniqueTopics.map((topic) => {
              const topicSlug = `${learnPath.slug}-${topic.slug}`;
              const topicId = `${moduleId}-topic-${topicSlug}`;
              return {
                ...topic,
                slug: topicSlug,
                sections: (topic.sections ?? []).map((section, index) => ({
                  ...section,
                  id: `${topicId}-section-${index}`,
                  sortOrder: index,
                })),
                id: topicId,
                shortDescription: topic.description,
                prerequisiteIds: [],
                relatedTopicIds: [],
                examples: [],
                exercises: [],
                questionRelations: [],
              } as TopicSeed;
            }),
            id: moduleId,
          } as ModuleSeed;
        }),
        id: pathId,
      } as PathSeed;
    }),
    id: categoryId,
  } as CategorySeed;
}

async function main() {
  const files = (await readdir(seedDirectory))
    .filter((file) => file.startsWith("seed-") && file.endsWith(".ts"))
    .sort();
  const categories = files.map(async (file) => normalizeCategory(readCategory(await readFile(path.join(seedDirectory, file), "utf8"), file)));
  const catalog: LearnCatalog = { categories: (await Promise.all(categories)).sort((left, right) => left.sortOrder - right.sortOrder || left.name.localeCompare(right.name)) };
  await mkdir(categoryOutputDirectory, { recursive: true });
  await Promise.all(catalog.categories.map((category) => writeFile(
    path.join(categoryOutputDirectory, `${category.slug}.json`),
    `${JSON.stringify(category, null, 2)}\n`,
    "utf8",
  )));
  const imports = catalog.categories.map((category, index) => `import category${index} from "./${category.slug}.json";`).join("\n");
  const exports = catalog.categories.map((_, index) => `category${index}`).join(",\n  ");
  await writeFile(
    path.join(categoryOutputDirectory, "index.ts"),
    `${imports}\n\nexport const categories = [\n  ${exports}\n];\n`,
    "utf8",
  );
  console.log(`Wrote individual course files to ${path.relative(process.cwd(), categoryOutputDirectory)}`);
}

void main();
