import { Difficulty, ExperienceLevel, InterviewType } from "@prisma/client";
import { getQuestionBySlug, listInterviewQuestions } from "@/lib/interview-data";
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
  const category = url.searchParams.get("category");
  const questionSlug = url.searchParams.get("question");
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
  const questions = questionSlug
    ? [getQuestionBySlug(questionSlug)].filter((question): question is NonNullable<typeof question> => Boolean(question))
    : listInterviewQuestions({
        category: category ?? undefined,
        experience: experience ?? undefined,
        difficulty: difficulties,
        interviewType: interviewTypes,
        pageSize: questionCount(url.searchParams.get("count")),
      }).questions;
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
