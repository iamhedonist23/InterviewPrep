import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("Home page CTAs", () => {
  it("links the next-question CTA to the practice page and communicates the product value", () => {
    const source = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
    expect(source).toContain("Next question");
    expect(source).toContain('href="/practice"');
    expect(source).toContain("Prepare for technical and behavioral interviews with practical questions, detailed explanations, learning paths, and mock interviews.");
    expect(source).toContain("Choose your starting point");
  });
});
