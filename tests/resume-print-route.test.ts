import { existsSync, readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("resume print route", () => {
  it("provides a dedicated print page that triggers browser printing", () => {
    const routePath = new URL("../app/resume-builder/[id]/print/page.tsx", import.meta.url);
    expect(existsSync(routePath)).toBe(true);
    const source = readFileSync(routePath, "utf8");
    expect(source).toContain("window.print()");
  });
});
