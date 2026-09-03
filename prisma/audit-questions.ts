import { PrismaClient } from "@prisma/client";
import { classifySimilarity, normalizeQuestion, lexicalSimilarity } from "@/lib/question-similarity";
import * as fs from "node:fs";
import * as path from "node:path";

const prisma = new PrismaClient();
const REPORT_PATH = path.join(process.cwd(), "question-duplicate-report.json");
const BACKUP_PATH = path.join(process.cwd(), "question-duplicate-backup.json");
const CSV_PATH = path.join(process.cwd(), "question-duplicate-report.csv");
const REVIEW_THRESHOLD = 0.78;

type AuditQuestion = {
  id: string;
  question: string;
  slug: string;
  category: { name: string };
  subcategory: { name: string } | null;
  experienceLevel: string;
  difficulty: string;
  interviewType: string;
  sampleAnswer: string;
  detailedAnswer: string | null;
  isPublished: boolean;
};

type Pair = { left: AuditQuestion; right: AuditQuestion; type: ReturnType<typeof classifySimilarity>["type"]; score: number };

function csv(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function main() {
  return prisma.interviewQuestion.findMany({
    orderBy: { slug: "asc" },
    select: {
      id: true,
      question: true,
      slug: true,
      experienceLevel: true,
      difficulty: true,
      interviewType: true,
      sampleAnswer: true,
      detailedAnswer: true,
      isPublished: true,
      category: { select: { name: true } },
      subcategory: { select: { name: true } },
    },
  });
}

async function run() {
  const questions = await main() as AuditQuestion[];
  const pairs: Pair[] = [];
  const exactGroups = new Map<string, AuditQuestion[]>();

  for (const question of questions) {
    const normalized = normalizeQuestion(question.question);
    const group = exactGroups.get(normalized) ?? [];
    group.push(question);
    exactGroups.set(normalized, group);
  }

  for (let leftIndex = 0; leftIndex < questions.length; leftIndex++) {
    for (let rightIndex = leftIndex + 1; rightIndex < questions.length; rightIndex++) {
      const left = questions[leftIndex];
      const right = questions[rightIndex];
      const score = lexicalSimilarity(left.question, right.question);
      if (score < REVIEW_THRESHOLD && normalizeQuestion(left.question) !== normalizeQuestion(right.question)) continue;
      const result = classifySimilarity(left.question, right.question);
      pairs.push({ left, right, type: result.type, score: result.score });
    }
  }

  const strongPairs = pairs.filter((pair) => pair.type !== "NEEDS_REVIEW");
  const reviewPairs = pairs.filter((pair) => pair.type === "NEEDS_REVIEW");
  const adjacency = new Map<string, Set<string>>();
  for (const pair of strongPairs) {
    const leftNeighbors = adjacency.get(pair.left.id) ?? new Set<string>();
    const rightNeighbors = adjacency.get(pair.right.id) ?? new Set<string>();
    leftNeighbors.add(pair.right.id);
    rightNeighbors.add(pair.left.id);
    adjacency.set(pair.left.id, leftNeighbors);
    adjacency.set(pair.right.id, rightNeighbors);
  }
  const grouped: Set<string>[] = [];
  const visited = new Set<string>();
  for (const id of adjacency.keys()) {
    if (visited.has(id)) continue;
    const group = new Set<string>();
    const pending = [id];
    while (pending.length) {
      const current = pending.pop()!;
      if (visited.has(current)) continue;
      visited.add(current);
      group.add(current);
      pending.push(...(adjacency.get(current) ?? []));
    }
    grouped.push(group);
  }
  const byId = new Map(questions.map((question) => [question.id, question]));
  const strongGroups = grouped
    .map((ids, index) => {
      const members = [...ids].map((id) => byId.get(id)!);
      const groupPairs = strongPairs.filter((pair) => ids.has(pair.left.id) && ids.has(pair.right.id));
      const types = new Set(groupPairs.map((pair) => pair.type));
      const type = types.has("EXACT_DUPLICATE") ? "EXACT_DUPLICATE" : types.has("CONTEXT_VARIATION") ? "CONTEXT_VARIATION" : types.has("NEAR_DUPLICATE") ? "NEAR_DUPLICATE" : "NEEDS_REVIEW";
      const canonical = [...members].sort((left, right) => {
        const answerLength = (right.detailedAnswer?.length ?? 0) + right.sampleAnswer.length - ((left.detailedAnswer?.length ?? 0) + left.sampleAnswer.length);
        return answerLength || left.question.length - right.question.length;
      })[0];
      return {
        group: `QDG-${String(index + 1).padStart(4, "0")}`,
        type,
        recommendedCanonicalId: canonical.id,
        recommendedCanonicalSlug: canonical.slug,
        members: members.map((member) => ({
          id: member.id,
          question: member.question,
          slug: member.slug,
          category: member.category.name,
          subcategory: member.subcategory?.name ?? null,
          experienceLevel: member.experienceLevel,
          difficulty: member.difficulty,
          interviewType: member.interviewType,
          isPublished: member.isPublished,
        })),
        comparisons: groupPairs.map((pair) => ({ leftId: pair.left.id, rightId: pair.right.id, type: pair.type, score: Number(pair.score.toFixed(4)) })),
      };
    });
  const groups = [...strongGroups, ...reviewPairs.map((pair, index) => {
    const canonical = pair.left.question.length <= pair.right.question.length ? pair.left : pair.right;
    return {
      group: `QDG-${String(strongGroups.length + index + 1).padStart(4, "0")}`,
      type: "NEEDS_REVIEW" as const,
      recommendedCanonicalId: canonical.id,
      recommendedCanonicalSlug: canonical.slug,
      members: [pair.left, pair.right].map((member) => ({
        id: member.id,
        question: member.question,
        slug: member.slug,
        category: member.category.name,
        subcategory: member.subcategory?.name ?? null,
        experienceLevel: member.experienceLevel,
        difficulty: member.difficulty,
        interviewType: member.interviewType,
        isPublished: member.isPublished,
      })),
      comparisons: [{ leftId: pair.left.id, rightId: pair.right.id, type: pair.type, score: Number(pair.score.toFixed(4)) }],
    };
  })].sort((left, right) => left.group.localeCompare(right.group));

  const summary = {
    totalQuestions: questions.length,
    exactDuplicateGroups: groups.filter((group) => group.type === "EXACT_DUPLICATE").length,
    nearDuplicateGroups: groups.filter((group) => group.type === "NEAR_DUPLICATE").length,
    contextVariationGroups: groups.filter((group) => group.type === "CONTEXT_VARIATION").length,
    needsReviewGroups: groups.filter((group) => group.type === "NEEDS_REVIEW").length,
    affectedQuestions: new Set(groups.flatMap((group) => group.members.map((member) => member.id))).size,
    legitimateVariations: questions.length - new Set(groups.flatMap((group) => group.members.map((member) => member.id))).size,
    thresholds: { review: REVIEW_THRESHOLD, nearDuplicate: 0.9 },
  };
  const report = { generatedAt: new Date().toISOString(), summary, groups };
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");
  fs.writeFileSync(BACKUP_PATH, JSON.stringify(questions, null, 2), "utf8");
  const rows = ["group,type,questionId,question,slug,category,subcategory,experienceLevel,difficulty,interviewType,recommendedCanonicalId", ...groups.flatMap((group) => group.members.map((member) => [group.group, group.type, member.id, member.question, member.slug, member.category, member.subcategory ?? "", member.experienceLevel, member.difficulty, member.interviewType, group.recommendedCanonicalId].map(csv).join(",")))];
  fs.writeFileSync(CSV_PATH, rows.join("\n"), "utf8");

  console.log(`Total questions: ${summary.totalQuestions}`);
  console.log(`Exact duplicates: ${summary.exactDuplicateGroups}`);
  console.log(`Near duplicates: ${summary.nearDuplicateGroups}`);
  console.log(`Context variations: ${summary.contextVariationGroups}`);
  console.log(`Legitimate variations: ${summary.legitimateVariations}`);
  console.log(`Needs manual review: ${summary.needsReviewGroups}`);
  console.log(`Affected questions: ${summary.affectedQuestions}`);
  console.log(`Duplicate groups: ${groups.length}`);
  console.log(`Report: ${REPORT_PATH}`);
  console.log(`Backup: ${BACKUP_PATH}`);
  console.log(`CSV: ${CSV_PATH}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
