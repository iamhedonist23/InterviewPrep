const FORBIDDEN_CONTENT = /\b(undefined|null|placeholder|todo)\b|\[object\s+object\]/i;

const SLUG_LIKE_TOKEN = /\b[a-z0-9]+(?:-[a-z0-9]+)+\b/;
const NATURAL_HYPHENATED_TERMS = new Set([
  "trade-offs",
  "low-latency",
  "large-scale",
  "real-world",
  "data-driven",
  "event-driven",
  "role-based",
  "customer-facing",
  "user-facing",
  "production-ready",
  "open-source",
  "cross-team",
  "cross-functional",
  "time-series",
  "high-risk",
  "non-specialist",
  "wording-only",
  "follow-up",
  "interview-ready",
  "near-duplicate",
]);

type PublicQuestionCandidate = {
  question: string;
  shortDescription: string;
  explanation: string;
  sampleAnswer: string;
  category?: { name: string } | null;
};

function hasForbiddenContent(value: string) {
  const normalized = value.toLowerCase();
  const slugLikeTokens = value.toLowerCase().match(new RegExp(SLUG_LIKE_TOKEN.source, "g")) ?? [];
  return FORBIDDEN_CONTENT.test(normalized)
    || slugLikeTokens.some((token) => !NATURAL_HYPHENATED_TERMS.has(token));
}

function isCompleteInterviewQuestion(value: string) {
  const words = value.trim().split(/\s+/).filter(Boolean);
  return words.length >= 6 && value.trim().endsWith("?") && !/\?\s*[a-z]/.test(value);
}

/** Keeps malformed or generated placeholder records out of public question cards. */
export function isPublicQuestionQualityValid(question: PublicQuestionCandidate) {
  const fields = [question.question, question.shortDescription, question.explanation, question.sampleAnswer];
  return fields.every((field) => field.trim().length >= 20 && !hasForbiddenContent(field))
    && isCompleteInterviewQuestion(question.question)
    && Boolean(question.category?.name?.trim());
}