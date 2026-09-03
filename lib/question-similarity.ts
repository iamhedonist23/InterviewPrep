const CONTEXT_PATTERNS = [
  /\s+for a global team(?: with distributed members)?/i,
  /\s+for scalability/i,
  /\s+when scalability is a critical concern/i,
  /\s+with strict security(?: and compliance)? requirements?/i,
  /\s+in a distributed environment/i,
  /\s+for a large[- ]scale (?:application|production system)/i,
  /\s+in a production environment/i,
  /\s+for enterprise applications?/i,
  /\s+with performance constraints?/i,
  /\s+in a cloud environment/i,
  /\s+when security is critical/i,
];

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "be", "by", "do", "does", "for", "from",
  "how", "in", "is", "it", "of", "on", "or", "the", "to", "what",
  "when", "why", "would", "you", "your",
]);

export function normalizeQuestion(value: string) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[“”„‟]/g, '"')
    .replace(/[‘’‚‛]/g, "'")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function questionTokens(value: string) {
  return new Set(
    normalizeQuestion(value)
      .split(" ")
      .filter((token) => token.length > 1 && !STOP_WORDS.has(token)),
  );
}

export function jaccardSimilarity(left: string, right: string) {
  const leftTokens = questionTokens(left);
  const rightTokens = questionTokens(right);
  if (!leftTokens.size || !rightTokens.size) return 0;
  let intersection = 0;
  for (const token of leftTokens) if (rightTokens.has(token)) intersection++;
  return intersection / (leftTokens.size + rightTokens.size - intersection);
}

export function tokenContainment(left: string, right: string) {
  const leftTokens = questionTokens(left);
  const rightTokens = questionTokens(right);
  if (Math.min(leftTokens.size, rightTokens.size) < 5) return 0;
  let intersection = 0;
  for (const token of leftTokens) if (rightTokens.has(token)) intersection++;
  return intersection / Math.min(leftTokens.size, rightTokens.size);
}

export function lexicalSimilarity(left: string, right: string) {
  return Math.max(jaccardSimilarity(left, right), tokenContainment(left, right));
}

export function withoutArtificialContext(value: string) {
  let result = value.trim();
  for (const pattern of CONTEXT_PATTERNS) result = result.replace(pattern, "");
  return result.replace(/\s+/g, " ").trim();
}

export function isContextVariation(left: string, right: string) {
  const leftWithoutContext = normalizeQuestion(withoutArtificialContext(left));
  const rightWithoutContext = normalizeQuestion(withoutArtificialContext(right));
  return leftWithoutContext === rightWithoutContext && normalizeQuestion(left) !== normalizeQuestion(right);
}

export function classifySimilarity(left: string, right: string) {
  const leftNormalized = normalizeQuestion(left);
  const rightNormalized = normalizeQuestion(right);
  if (leftNormalized === rightNormalized) return { type: "EXACT_DUPLICATE" as const, score: 1 };
  const score = lexicalSimilarity(left, right);
  if (isContextVariation(left, right)) return { type: "CONTEXT_VARIATION" as const, score };
  if (score >= 0.9) return { type: "NEAR_DUPLICATE" as const, score };
  if (score >= 0.78) return { type: "NEEDS_REVIEW" as const, score };
  return { type: "LEGITIMATE_VARIATION" as const, score };
}

export function findPotentialDuplicate<T extends { question: string }>(candidate: string, existing: T[]) {
  return existing
    .map((item) => ({ item, match: classifySimilarity(candidate, item.question) }))
    .filter(({ match }) => match.type === "EXACT_DUPLICATE" || match.type === "NEAR_DUPLICATE")
    .sort((left, right) => right.match.score - left.match.score);
}

export type SimilarityType = ReturnType<typeof classifySimilarity>["type"];
