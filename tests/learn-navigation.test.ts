import { describe, it, expect, vi, beforeEach } from "vitest";

const studyCategoryFindFirst = vi.fn();

vi.mock("@/lib/prisma", () => ({
  prisma: { studyCategory: { findFirst: studyCategoryFindFirst } },
}));

const { getAdjacentTopics } = await import("@/lib/study");

function buildCategory() {
  return {
    paths: [
      {
        modules: [
          { topics: [{ id: "t1", slug: "t1", title: "Topic 1" }, { id: "t2", slug: "t2", title: "Topic 2" }] },
          { topics: [{ id: "t3", slug: "t3", title: "Topic 3" }] },
        ],
      },
      {
        modules: [{ topics: [{ id: "t4", slug: "t4", title: "Topic 4" }] }],
      },
    ],
  };
}

beforeEach(() => {
  studyCategoryFindFirst.mockReset();
});

describe("getAdjacentTopics", () => {
  it("returns both neighbors for a topic in the middle of the flattened sequence", async () => {
    studyCategoryFindFirst.mockResolvedValue(buildCategory());
    const result = await getAdjacentTopics("java", "t2");
    expect(result.previous?.id).toBe("t1");
    expect(result.next?.id).toBe("t3");
  });

  it("crosses from the last topic of one module into the first topic of the next module", async () => {
    studyCategoryFindFirst.mockResolvedValue(buildCategory());
    const result = await getAdjacentTopics("java", "t2");
    expect(result.next?.id).toBe("t3");
  });

  it("crosses from the last topic of one path into the first topic of the next path", async () => {
    studyCategoryFindFirst.mockResolvedValue(buildCategory());
    const result = await getAdjacentTopics("java", "t3");
    expect(result.next?.id).toBe("t4");
  });

  it("returns null previous for the first topic and null next for the last topic", async () => {
    studyCategoryFindFirst.mockResolvedValue(buildCategory());
    const first = await getAdjacentTopics("java", "t1");
    expect(first.previous).toBeNull();
    const last = await getAdjacentTopics("java", "t4");
    expect(last.next).toBeNull();
  });

  it("returns nulls when the category cannot be found", async () => {
    studyCategoryFindFirst.mockResolvedValue(null);
    const result = await getAdjacentTopics("missing", "t1");
    expect(result).toEqual({ previous: null, next: null });
  });

  it("returns nulls when the topic id is not present in the published sequence", async () => {
    studyCategoryFindFirst.mockResolvedValue(buildCategory());
    const result = await getAdjacentTopics("java", "not-a-real-id");
    expect(result).toEqual({ previous: null, next: null });
  });
});
