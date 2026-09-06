import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("Home page CTAs", () => {
  it("links the next-question CTA to the practice page and communicates the product value", () => {
    const source = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
    expect(source).toContain("Next question");
    expect(source).toContain('href="/practice"');
    expect(source).toContain("Interview Questions & Answers for Every Career");
    expect(source).toContain("Prepare smarter. Interview with confidence.");
    expect(source).toContain("Explore practical interview questions, detailed answers, learning paths, guided practice, and mock interviews for technical and behavioral interviews.");
    expect(source).toContain("Practice at your pace");
    expect(source).toContain("Build confidence with focused practice, structured learning paths, and realistic interview questions.");
    expect(source).toContain("Choose your starting point");
  });
});
