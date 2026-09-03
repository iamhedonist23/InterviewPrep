import { describe, expect, it } from "vitest";
import { paginateItems } from "@/lib/learn-pagination";

describe("paginateItems", () => {
  it("returns the requested page slice and total pages", () => {
    const items = Array.from({ length: 25 }, (_, index) => index + 1);

    const result = paginateItems(items, 2, 10);

    expect(result.currentPage).toBe(2);
    expect(result.pageCount).toBe(3);
    expect(result.items).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  it("clamps page numbers outside the valid range", () => {
    const items = Array.from({ length: 5 }, (_, index) => index + 1);

    const result = paginateItems(items, 100, 2);

    expect(result.currentPage).toBe(3);
    expect(result.items).toEqual([5]);
  });
});
