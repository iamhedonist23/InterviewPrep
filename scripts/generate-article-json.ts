import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { articleSeeds } from "../generated-article-seed";

const outputDirectory = path.resolve("data/articles");
const category = {
  id: "article-category-interview-guides",
  name: "Interview guide",
  slug: "interview-guides",
  group: "General",
  description: "Practical interview preparation resources.",
};

const articles = articleSeeds.map((article, index) => ({
  id: `article-${article.slug}`,
  title: article.title,
  slug: article.slug,
  excerpt: article.excerpt,
  author: article.author,
  content: article.content,
  seoTitle: article.seoTitle,
  seoDescription: article.seoDescription,
  publishedAt: `2026-01-${String((index % 28) + 1).padStart(2, "0")}T00:00:00.000Z`,
  updatedAt: `2026-01-${String((index % 28) + 1).padStart(2, "0")}T00:00:00.000Z`,
  categoryId: category.id,
  category,
  isPublished: true,
}));

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all(articles.map((article) => writeFile(
    path.join(outputDirectory, `${article.slug}.json`),
    `${JSON.stringify(article, null, 2)}\n`,
    "utf8",
  )));
  const imports = articles.map((article, index) => `import article${index} from "./${article.slug}.json";`).join("\n");
  const exports = articles.map((_, index) => `article${index}`).join(",\n  ");
  await writeFile(path.join(outputDirectory, "index.ts"), `${imports}\n\nexport const articles = [\n  ${exports}\n];\n`, "utf8");
  console.log(`Wrote ${articles.length} individual article files to ${path.relative(process.cwd(), outputDirectory)}`);
}

void main();
