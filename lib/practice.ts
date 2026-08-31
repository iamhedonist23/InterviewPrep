export type PracticeQuestion = {
  id: string;
  question: string;
  explanation: string;
  keyPoints: string[];
  category: { name: string; slug: string };
  difficulty?: string;
  interviewType?: string;
};

export function simpleScore(answer: string, keyPoints: string[]) {
  const normalized = answer.trim().toLowerCase();
  if (!normalized) return 0;
  const words = new Set(normalized.split(/[^a-z0-9]+/).filter(Boolean));
  const matches = keyPoints.reduce((count, point) => {
    const pointWords = point.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    return count + (pointWords.some(word => word.length > 4 && words.has(word)) ? 1 : 0);
  }, 0);
  return Math.min(100, Math.round(35 + Math.min(45, normalized.length / 20) + matches * 10));
}
