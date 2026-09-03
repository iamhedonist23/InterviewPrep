import { describe, expect, it } from "vitest";
import {
  classifySimilarity,
  normalizeQuestion,
  withoutArtificialContext,
} from "@/lib/question-similarity";

describe("question similarity", () => {
  it("normalizes punctuation, whitespace, and case", () => {
    expect(normalizeQuestion(" What is JVM? ")).toBe("what is jvm");
    expect(normalizeQuestion("what is JVM ?")).toBe("what is jvm");
  });

  it("removes configured artificial context", () => {
    expect(withoutArtificialContext("How does JVM work in a production environment?"))
      .toBe("How does JVM work?");
    expect(classifySimilarity("What is a priority queue?", "what is a priority queue ?").type)
      .toBe("EXACT_DUPLICATE");
  });

  it("keeps distinct concepts out of automatic duplicate classification", () => {
    expect(classifySimilarity("How does HashMap work internally?", "How would you optimize HashMap performance?").type)
      .toBe("LEGITIMATE_VARIATION");
  });
});
