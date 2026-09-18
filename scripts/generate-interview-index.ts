import fs from "node:fs";
import path from "node:path";

const directory = path.join(process.cwd(), "data", "interview-questions");
const files = fs.readdirSync(directory)
  .filter((file) => file.endsWith(".json"))
  .sort((left, right) => left.localeCompare(right));

const imports: string[] = [];
const entries: string[] = [];
for (const file of files) {
  const categorySlug = file.slice(0, -5);
  const variable = categorySlug.replace(/[^a-zA-Z0-9]+(.)/g, (_match, character: string) => character.toUpperCase());
  imports.push(`import ${variable} from "./${file}";`);
  entries.push(`  ${variable},`);
}

fs.writeFileSync(
  path.join(directory, "index.ts"),
  `${imports.join("\n")}\n\nconst interviewQuestionBanks = [\n${entries.join("\n")}\n];\n\nexport default interviewQuestionBanks;\n`,
);
console.log(`Indexed ${files.length} interview-question JSON files.`);