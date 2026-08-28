import { describe, it, expect } from "vitest";
import { simpleScore } from "@/lib/practice";

describe("simpleScore", () => {
  it("scores an empty answer as 0", () => {
    expect(simpleScore("", ["closures", "hoisting"])).toBe(0);
  });

  it("scores a whitespace-only answer as 0", () => {
    expect(simpleScore("   ", ["closures"])).toBe(0);
  });

  it("gives a higher score for an answer that hits key points than one that doesn't", () => {
    const keyPoints = ["closures capture variables", "hoisting moves declarations"];
    const goodAnswer = "Closures capture variables from their enclosing scope, and hoisting moves declarations up.";
    const weakAnswer = "It just works somehow I think.";
    expect(simpleScore(goodAnswer, keyPoints)).toBeGreaterThan(simpleScore(weakAnswer, keyPoints));
  });

  it("never scores above 100", () => {
    const longAnswer = "closures hoisting ".repeat(200);
    expect(simpleScore(longAnswer, ["closures", "hoisting"])).toBeLessThanOrEqual(100);
  });

  it("is case-insensitive when matching key point words", () => {
    const scoreLower = simpleScore("this covers CLOSURES in depth", ["closures"]);
    const scoreUpper = simpleScore("this covers closures in depth", ["closures"]);
    expect(scoreLower).toBe(scoreUpper);
  });

  it("ignores short key-point words (4 chars or fewer) when matching", () => {
    // "is" and "a" are too short to count as a real match on their own.
    const score = simpleScore("this is a test answer", ["is a"]);
    const baseline = simpleScore("this is a test answer", []);
    expect(score).toBe(baseline);
  });

  it("returns a deterministic score for the same input", () => {
    const answer = "React hooks let you use state in function components.";
    const keyPoints = ["state", "function components"];
    expect(simpleScore(answer, keyPoints)).toBe(simpleScore(answer, keyPoints));
  });
});
