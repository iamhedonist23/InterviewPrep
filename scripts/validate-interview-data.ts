import fs from "node:fs";
import path from "node:path";

const directory = path.join(process.cwd(), "data", "interview-questions");
const files = fs.readdirSync(directory).filter((file) => file.endsWith(".json"));
const errors: string[] = [];
const slugs = new Set<string>();
const questions = new Set<string>();
const categories = new Set<string>();
const subcategories = new Set<string>();

for (const file of files) {
  let records: unknown;
  try {
    records = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
  } catch (error) {
    errors.push(`${file}: malformed JSON (${error instanceof Error ? error.message : String(error)})`);
    continue;
  }
  if (!Array.isArray(records)) {
    errors.push(`${file}: root value must be an array`);
    continue;
  }
  for (const value of records) {
    if (!value || typeof value !== "object") {
      errors.push(`${file}: question must be an object`);
      continue;
    }
    const item = value as Record<string, unknown>;
    const slug = typeof item.slug === "string" ? item.slug : "";
    const question = typeof item.question === "string" ? item.question.trim() : "";
    const categorySlug = typeof item.categorySlug === "string" ? item.categorySlug : "";
    const subcategorySlug = typeof item.subcategorySlug === "string" ? item.subcategorySlug : "";
    if (!slug) errors.push(`${file}: missing slug`);
    if (slug && slugs.has(slug)) errors.push(`${file}: duplicate slug ${slug}`);
    if (slug) slugs.add(slug);
    if (!question) errors.push(`${file}/${slug}: missing question`);
    if (question && questions.has(question.toLowerCase())) errors.push(`${file}/${slug}: duplicate question`);
    if (question) questions.add(question.toLowerCase());
    if (!categorySlug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(categorySlug)) errors.push(`${file}/${slug}: invalid categorySlug ${categorySlug}`);
    if (categorySlug) categories.add(categorySlug);
    if (subcategorySlug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(subcategorySlug)) errors.push(`${file}/${slug}: invalid subcategorySlug ${subcategorySlug}`);
    if (subcategorySlug) subcategories.add(`${categorySlug}/${subcategorySlug}`);
    if (typeof item.detailedAnswer !== "string" || !item.detailedAnswer.trim()) errors.push(`${file}/${slug}: missing detailedAnswer`);
  }
}

for (const file of files) {
  const categorySlug = file.slice(0, -5);
  if (!categories.has(categorySlug)) errors.push(`${file}: no question uses its category slug`);
}

if (errors.length) {
  throw new Error(`Interview JSON validation failed with ${errors.length} error(s):\n${errors.slice(0, 40).join("\n")}`);
}

console.log(`Validated ${slugs.size} interview questions in ${files.length} JSON files.`);