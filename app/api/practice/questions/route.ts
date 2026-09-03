import {
  Difficulty,
  ExperienceLevel,
  InterviewType,
  Prisma,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
const enumValue = <T extends string>(value: string | null, values: T[]) =>
  value && values.includes(value as T) ? (value as T) : undefined;
const enumValues = <T extends string>(values: string[], validValues: T[]) =>
  values.filter((value): value is T => validValues.includes(value as T));
// count is optional and defaults to 5 (the existing /practice session size) so
// this stays backward compatible; /mock-interview is the only caller that
// passes a larger value, clamped to a sane ceiling so nobody can request an
// unbounded result set.
function questionCount(value: string | null): number {
  const parsed = value ? Number.parseInt(value, 10) : NaN;
  if (!Number.isFinite(parsed) || parsed < 1) return 5;
  return Math.min(20, parsed); // aligned with the 20-response max in /api/practice/session
}
export async function GET(request: Request) {
  const url = new URL(request.url);
  const where: Prisma.InterviewQuestionWhereInput = { isPublished: true };
  const category = url.searchParams.get("category");
  if (category) where.category = { slug: category };
  const experience = enumValue(
    url.searchParams.get("experience"),
    Object.values(ExperienceLevel),
  );
  const difficulties = enumValues(
    url.searchParams.getAll("difficulty"),
    Object.values(Difficulty),
  );
  const interviewTypes = enumValues(
    url.searchParams.getAll("type"),
    Object.values(InterviewType),
  );
  if (experience) where.experienceLevel = experience;
  if (difficulties.length) where.difficulty = { in: difficulties };
  if (interviewTypes.length) where.interviewType = { in: interviewTypes };
  const questions = await prisma.interviewQuestion.findMany({
    where,
    include: { category: { select: { name: true, slug: true } } },
    orderBy: { createdAt: "desc" },
    take: questionCount(url.searchParams.get("count")),
  });
  return Response.json({
    questions: questions.map((question) => ({
      id: question.id,
      question: question.question,
      explanation: question.explanation,
      keyPoints: Array.isArray(question.keyPoints)
        ? question.keyPoints.filter(
            (item): item is string => typeof item === "string",
          )
        : [],
      category: question.category,
      difficulty: question.difficulty,
      interviewType: question.interviewType,
    })),
  });
}
