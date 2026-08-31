export type ResumePersonalInfo = {
  fullName?: string | null;
  professionalTitle?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  website?: string | null;
  linkedin?: string | null;
  github?: string | null;
  portfolio?: string | null;
  summary?: string | null;
} | null;

export type DateLike = string | Date | null | undefined;

export function formatMonthYear(value: DateLike): string {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function dateRange(start: DateLike, end: DateLike, isCurrent?: boolean) {
  const startLabel = formatMonthYear(start);
  const endLabel = isCurrent ? "Present" : formatMonthYear(end);
  if (!startLabel && !endLabel) return "";
  return [startLabel, endLabel].filter(Boolean).join(" – ");
}

// The Record<string, unknown> item shapes mirror what getOwnedResume()
// returns straight from Prisma — templates intentionally stay loose/
// defensive since they render live database records.
export type ResumeTemplateProps = {
  title: string;
  personalInfo: ResumePersonalInfo;
  education: Array<Record<string, unknown>>;
  experience: Array<Record<string, unknown>>;
  projects: Array<Record<string, unknown>>;
  skills: Array<Record<string, unknown>>;
  certifications: Array<Record<string, unknown>>;
  achievements: Array<Record<string, unknown>>;
  languages: Array<Record<string, unknown>>;
  customSections: Array<Record<string, unknown>>;
};
