import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("Home page CTAs", () => {
  it("links the next-question CTA to the practice page", () => {
    const source = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
    expect(source).toContain("Next question");
    expect(source).toContain('href="/practice"');
  });
});
