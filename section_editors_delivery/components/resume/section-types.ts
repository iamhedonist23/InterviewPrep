export type EducationItem = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string; // "YYYY-MM-DD" or ""
  endDate: string;
  isCurrent: boolean;
  description: string;
};

export type ExperienceItem = {
  company: string;
  jobTitle: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  achievements: string[];
};

export type ProjectItem = {
  name: string;
  description: string;
  technologies: string; // comma-separated in the UI, split on save
  projectUrl: string;
  githubUrl: string;
  startDate: string;
  endDate: string;
  achievements: string[];
};

export type SkillItem = {
  name: string;
  category: string;
  level: "" | "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
};

export type CertificationItem = {
  name: string;
  organization: string;
  issueDate: string;
  expirationDate: string;
  credentialId: string;
  credentialUrl: string;
};

export type AchievementItem = {
  title: string;
  description: string;
  date: string;
};

export type LanguageItem = {
  name: string;
  proficiency: "BASIC" | "CONVERSATIONAL" | "FLUENT" | "NATIVE";
};

export type CustomSectionItem = {
  title: string;
  content: string;
};

export const blankEducation = (): EducationItem => ({
  institution: "",
  degree: "",
  fieldOfStudy: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
});

export const blankExperience = (): ExperienceItem => ({
  company: "",
  jobTitle: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
  achievements: [],
});

export const blankProject = (): ProjectItem => ({
  name: "",
  description: "",
  technologies: "",
  projectUrl: "",
  githubUrl: "",
  startDate: "",
  endDate: "",
  achievements: [],
});

export const blankSkill = (): SkillItem => ({ name: "", category: "", level: "" });

export const blankCertification = (): CertificationItem => ({
  name: "",
  organization: "",
  issueDate: "",
  expirationDate: "",
  credentialId: "",
  credentialUrl: "",
});

export const blankAchievement = (): AchievementItem => ({ title: "", description: "", date: "" });

export const blankLanguage = (): LanguageItem => ({ name: "", proficiency: "CONVERSATIONAL" });

export const blankCustomSection = (): CustomSectionItem => ({ title: "", content: "" });

// -----------------------------------------------------------------------
// Server <-> client shape conversions
// -----------------------------------------------------------------------
type ServerDate = string | Date | null | undefined;

function toDateInput(value: ServerDate): string {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function toApiDate(value: string): string | null {
  return value ? value : null;
}

export function fromServerEducation(items: Array<Record<string, unknown>>): EducationItem[] {
  return items.map((item) => ({
    institution: String(item.institution ?? ""),
    degree: String(item.degree ?? ""),
    fieldOfStudy: String(item.fieldOfStudy ?? ""),
    location: String(item.location ?? ""),
    startDate: toDateInput(item.startDate as ServerDate),
    endDate: toDateInput(item.endDate as ServerDate),
    isCurrent: Boolean(item.isCurrent),
    description: String(item.description ?? ""),
  }));
}

export function toApiEducation(items: EducationItem[]) {
  return items.map((item) => ({ ...item, startDate: toApiDate(item.startDate), endDate: toApiDate(item.endDate) }));
}

export function fromServerExperience(items: Array<Record<string, unknown>>): ExperienceItem[] {
  return items.map((item) => ({
    company: String(item.company ?? ""),
    jobTitle: String(item.jobTitle ?? ""),
    location: String(item.location ?? ""),
    startDate: toDateInput(item.startDate as ServerDate),
    endDate: toDateInput(item.endDate as ServerDate),
    isCurrent: Boolean(item.isCurrent),
    description: String(item.description ?? ""),
    achievements: Array.isArray(item.achievements) ? (item.achievements as string[]) : [],
  }));
}

export function toApiExperience(items: ExperienceItem[]) {
  return items.map((item) => ({ ...item, startDate: toApiDate(item.startDate), endDate: toApiDate(item.endDate) }));
}

export function fromServerProjects(items: Array<Record<string, unknown>>): ProjectItem[] {
  return items.map((item) => ({
    name: String(item.name ?? ""),
    description: String(item.description ?? ""),
    technologies: Array.isArray(item.technologies) ? (item.technologies as string[]).join(", ") : "",
    projectUrl: String(item.projectUrl ?? ""),
    githubUrl: String(item.githubUrl ?? ""),
    startDate: toDateInput(item.startDate as ServerDate),
    endDate: toDateInput(item.endDate as ServerDate),
    achievements: Array.isArray(item.achievements) ? (item.achievements as string[]) : [],
  }));
}

export function toApiProjects(items: ProjectItem[]) {
  return items.map((item) => ({
    ...item,
    technologies: item.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    startDate: toApiDate(item.startDate),
    endDate: toApiDate(item.endDate),
  }));
}

export function fromServerSkills(items: Array<Record<string, unknown>>): SkillItem[] {
  return items.map((item) => ({
    name: String(item.name ?? ""),
    category: String(item.category ?? ""),
    level: (item.level as SkillItem["level"]) ?? "",
  }));
}

export function toApiSkills(items: SkillItem[]) {
  return items.map((item) => ({ ...item, level: item.level === "" ? null : item.level }));
}

export function fromServerCertifications(items: Array<Record<string, unknown>>): CertificationItem[] {
  return items.map((item) => ({
    name: String(item.name ?? ""),
    organization: String(item.organization ?? ""),
    issueDate: toDateInput(item.issueDate as ServerDate),
    expirationDate: toDateInput(item.expirationDate as ServerDate),
    credentialId: String(item.credentialId ?? ""),
    credentialUrl: String(item.credentialUrl ?? ""),
  }));
}

export function toApiCertifications(items: CertificationItem[]) {
  return items.map((item) => ({ ...item, issueDate: toApiDate(item.issueDate), expirationDate: toApiDate(item.expirationDate) }));
}

export function fromServerAchievements(items: Array<Record<string, unknown>>): AchievementItem[] {
  return items.map((item) => ({
    title: String(item.title ?? ""),
    description: String(item.description ?? ""),
    date: toDateInput(item.date as ServerDate),
  }));
}

export function toApiAchievements(items: AchievementItem[]) {
  return items.map((item) => ({ ...item, date: toApiDate(item.date) }));
}

export function fromServerLanguages(items: Array<Record<string, unknown>>): LanguageItem[] {
  return items.map((item) => ({
    name: String(item.name ?? ""),
    proficiency: (item.proficiency as LanguageItem["proficiency"]) ?? "CONVERSATIONAL",
  }));
}

export function fromServerCustomSections(items: Array<Record<string, unknown>>): CustomSectionItem[] {
  return items.map((item) => ({ title: String(item.title ?? ""), content: String(item.content ?? "") }));
}
