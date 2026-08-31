import { describe, it, expect, vi, beforeEach } from "vitest";

const findMany = vi.fn();

vi.mock("@/lib/prisma", () => ({ prisma: { resume: { findMany } } }));

const { listResumesWithCompletion } = await import("@/lib/resume");
const { getResumeTemplateComponent, RESUME_TEMPLATES } = await import("@/components/resume/templates");
const { ClassicResumeTemplate } = await import("@/components/resume/templates/classic-template");
const { ModernResumeTemplate } = await import("@/components/resume/templates/modern-template");
const { MinimalResumeTemplate } = await import("@/components/resume/templates/minimal-template");

beforeEach(() => {
  findMany.mockReset();
});

function resumeRow(overrides: Record<string, unknown> = {}) {
  return {
    id: "resume-1",
    title: "My Resume",
    template: "classic",
    lastEditedAt: new Date("2026-01-01"),
    personalInfo: null,
    _count: { experience: 0, education: 0, skills: 0, projects: 0, certifications: 0, achievements: 0 },
    ...overrides,
  };
}

describe("listResumesWithCompletion", () => {
  it("scores an entirely empty resume as 0%", async () => {
    findMany.mockResolvedValue([resumeRow()]);
    const [result] = await listResumesWithCompletion("user-1");
    expect(result.completionPercent).toBe(0);
  });

  it("scores a fully filled-out resume as 100%", async () => {
    findMany.mockResolvedValue([
      resumeRow({
        personalInfo: { fullName: "Jane Doe", professionalTitle: "Engineer", summary: "Experienced engineer." },
        _count: { experience: 1, education: 1, skills: 3, projects: 1, certifications: 0, achievements: 0 },
      }),
    ]);
    const [result] = await listResumesWithCompletion("user-1");
    expect(result.completionPercent).toBe(100);
  });

  it("gives partial credit for a partially filled resume", async () => {
    findMany.mockResolvedValue([
      resumeRow({
        personalInfo: { fullName: "Jane Doe", professionalTitle: "Engineer", summary: null },
        _count: { experience: 1, education: 0, skills: 0, projects: 0, certifications: 0, achievements: 0 },
      }),
    ]);
    const [result] = await listResumesWithCompletion("user-1");
    // 2 of 6 checks pass (name+title, has experience) => 33%
    expect(result.completionPercent).toBe(33);
  });

  it("counts projects OR certifications OR achievements as a single combined check, not three", async () => {
    const withOneExtra = resumeRow({ _count: { experience: 0, education: 0, skills: 0, projects: 1, certifications: 0, achievements: 0 } });
    const withAllThreeExtras = resumeRow({ _count: { experience: 0, education: 0, skills: 0, projects: 1, certifications: 1, achievements: 1 } });
    findMany.mockResolvedValueOnce([withOneExtra]);
    const [oneExtra] = await listResumesWithCompletion("user-1");
    findMany.mockResolvedValueOnce([withAllThreeExtras]);
    const [allExtras] = await listResumesWithCompletion("user-1");
    expect(oneExtra.completionPercent).toBe(allExtras.completionPercent);
  });

  it("does not fetch full section content, only counts and a few scalar fields", async () => {
    findMany.mockResolvedValue([resumeRow()]);
    await listResumesWithCompletion("user-1");
    const callArgs = findMany.mock.calls[0][0];
    expect(callArgs.select).not.toHaveProperty("experience");
    expect(callArgs.select._count).toBeDefined();
  });
});

describe("resume template registry", () => {
  it("resolves each known template key to its component", () => {
    expect(getResumeTemplateComponent("classic")).toBe(ClassicResumeTemplate);
    expect(getResumeTemplateComponent("modern")).toBe(ModernResumeTemplate);
    expect(getResumeTemplateComponent("minimal")).toBe(MinimalResumeTemplate);
  });

  it("falls back to the classic template for an unknown/legacy key", () => {
    expect(getResumeTemplateComponent("some-old-template-name")).toBe(ClassicResumeTemplate);
    expect(getResumeTemplateComponent("")).toBe(ClassicResumeTemplate);
  });

  it("exposes a human-readable label for every template", () => {
    expect(RESUME_TEMPLATES.classic.label).toBe("Classic");
    expect(RESUME_TEMPLATES.modern.label).toBe("Modern");
    expect(RESUME_TEMPLATES.minimal.label).toBe("Minimal");
  });
});
