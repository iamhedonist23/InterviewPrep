import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { RESUME_LIMITS, RESUME_INACTIVITY_DAYS } from "@/lib/resume-limits";

export { RESUME_LIMITS, RESUME_INACTIVITY_DAYS };

function isParsableUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

const optionalUrl = z
  .string()
  .trim()
  .max(300)
  .transform((value) => (value === "" || /^https?:\/\//i.test(value) ? value : `https://${value}`))
  .refine((value) => value === "" || isParsableUrl(value), "Enter a valid URL")
  .optional()
  .or(z.literal(""));

const optionalEmail = z.string().trim().max(200).email().optional().or(z.literal(""));
const optionalDate = z.coerce.date().optional().nullable();
const shortText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));
const bulletList = z.array(z.string().trim().max(500)).max(RESUME_LIMITS.maxBulletsPerEntry).optional();
const sortOrder = z.number().int().min(0).max(1000).default(0);

export const sectionOrderSchema = z
  .array(
    z.enum([
      "summary",
      "experience",
      "education",
      "skills",
      "projects",
      "certifications",
      "achievements",
      "languages",
      "custom",
    ]),
  )
  .max(20);

export const personalInfoSchema = z.object({
  fullName: shortText(150),
  professionalTitle: shortText(150),
  email: optionalEmail,
  phone: shortText(30),
  location: shortText(150),
  website: optionalUrl,
  linkedin: optionalUrl,
  github: optionalUrl,
  portfolio: optionalUrl,
  summary: shortText(2000),
});

export const educationSchema = z.object({
  id: z.string().cuid().optional(),
  institution: z.string().trim().min(1).max(200),
  degree: shortText(150),
  fieldOfStudy: shortText(150),
  location: shortText(150),
  startDate: optionalDate,
  endDate: optionalDate,
  isCurrent: z.boolean().default(false),
  description: shortText(2000),
  sortOrder,
});

export const experienceSchema = z.object({
  id: z.string().cuid().optional(),
  company: z.string().trim().min(1).max(200),
  jobTitle: z.string().trim().min(1).max(200),
  location: shortText(150),
  startDate: optionalDate,
  endDate: optionalDate,
  isCurrent: z.boolean().default(false),
  description: shortText(2000),
  achievements: bulletList,
  sortOrder,
});

export const projectSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(200),
  description: shortText(2000),
  technologies: z.array(z.string().trim().max(60)).max(30).optional(),
  projectUrl: optionalUrl,
  githubUrl: optionalUrl,
  startDate: optionalDate,
  endDate: optionalDate,
  achievements: bulletList,
  sortOrder,
});

export const skillSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(100),
  category: shortText(100),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]).optional().nullable(),
  sortOrder,
});

export const certificationSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(200),
  organization: shortText(200),
  issueDate: optionalDate,
  expirationDate: optionalDate,
  credentialId: shortText(150),
  credentialUrl: optionalUrl,
  sortOrder,
});

export const achievementSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().trim().min(1).max(200),
  description: shortText(1000),
  date: optionalDate,
  sortOrder,
});

export const languageSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(100),
  proficiency: z.enum(["BASIC", "CONVERSATIONAL", "FLUENT", "NATIVE"]).default("CONVERSATIONAL"),
  sortOrder,
});

export const customSectionSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().trim().min(1).max(150),
  content: shortText(5000),
  sortOrder,
});

export const createResumeSchema = z.object({
  title: z.string().trim().min(1).max(150),
  template: z.string().trim().min(1).max(50).default("classic"),
});

export const updateResumeSchema = z.object({
  title: z.string().trim().min(1).max(150).optional(),
  template: z.string().trim().min(1).max(50).optional(),
  isDefault: z.boolean().optional(),
  sectionOrder: sectionOrderSchema.optional(),
  personalInfo: personalInfoSchema.optional(),
  education: z.array(educationSchema).max(RESUME_LIMITS.maxEducation).optional(),
  experience: z.array(experienceSchema).max(RESUME_LIMITS.maxExperience).optional(),
  projects: z.array(projectSchema).max(RESUME_LIMITS.maxProjects).optional(),
  skills: z.array(skillSchema).max(RESUME_LIMITS.maxSkills).optional(),
  certifications: z.array(certificationSchema).max(RESUME_LIMITS.maxCertifications).optional(),
  achievements: z.array(achievementSchema).max(RESUME_LIMITS.maxAchievements).optional(),
  languages: z.array(languageSchema).max(RESUME_LIMITS.maxLanguages).optional(),
  customSections: z.array(customSectionSchema).max(RESUME_LIMITS.maxCustomSections).optional(),
});

export type CreateResumeInput = z.infer<typeof createResumeSchema>;
export type UpdateResumeInput = z.infer<typeof updateResumeSchema>;

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------
export class ResumeNotFoundError extends Error {
  constructor() {
    super("Resume not found.");
    this.name = "ResumeNotFoundError";
  }
}

export class ResumeLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResumeLimitError";
  }
}

// ---------------------------------------------------------------------------
// Full include shape returned to clients
// ---------------------------------------------------------------------------
const fullResumeInclude = {
  personalInfo: true,
  education: { orderBy: { sortOrder: "asc" as const } },
  experience: { orderBy: { sortOrder: "asc" as const } },
  projects: { orderBy: { sortOrder: "asc" as const } },
  skills: { orderBy: { sortOrder: "asc" as const } },
  certifications: { orderBy: { sortOrder: "asc" as const } },
  achievements: { orderBy: { sortOrder: "asc" as const } },
  languages: { orderBy: { sortOrder: "asc" as const } },
  customSections: { orderBy: { sortOrder: "asc" as const } },
};

// ---------------------------------------------------------------------------
// Ownership-enforced service functions.
// `userId` MUST always come from the server-side session, never from the
// client/request body.
// ---------------------------------------------------------------------------

export async function listResumes(userId: string) {
  return prisma.resume.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, template: true, isDefault: true, lastEditedAt: true, createdAt: true, updatedAt: true },
  });
}

export async function getOwnedResume(userId: string, resumeId: string) {
  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId },
    include: fullResumeInclude,
  });
  if (!resume) throw new ResumeNotFoundError();
  return resume;
}

export async function createResume(userId: string, input: CreateResumeInput) {
  const count = await prisma.resume.count({ where: { userId } });
  if (count >= RESUME_LIMITS.maxResumesPerUser) {
    throw new ResumeLimitError(`You can create at most ${RESUME_LIMITS.maxResumesPerUser} resumes.`);
  }
  return prisma.resume.create({
    data: {
      userId,
      title: input.title,
      template: input.template,
      isDefault: count === 0,
      personalInfo: { create: {} },
    },
    include: fullResumeInclude,
  });
}

export async function updateResume(userId: string, resumeId: string, input: UpdateResumeInput) {
  // Ownership check first: throws ResumeNotFoundError if the resume isn't
  // owned by this user (or doesn't exist), before any writes happen.
  await getOwnedResume(userId, resumeId);

  return prisma.$transaction(async (tx) => {
    const owned = await tx.resume.findFirst({ where: { id: resumeId, userId }, select: { id: true } });
    if (!owned) throw new ResumeNotFoundError();

    if (input.isDefault) {
      await tx.resume.updateMany({ where: { userId, NOT: { id: resumeId } }, data: { isDefault: false } });
    }

    await tx.resume.update({
      where: { id: resumeId },
      data: {
        title: input.title,
        template: input.template,
        isDefault: input.isDefault,
        sectionOrder: input.sectionOrder,
        lastEditedAt: new Date(),
      },
    });

    if (input.personalInfo) {
      await tx.resumePersonalInfo.upsert({
        where: { resumeId },
        create: { resumeId, ...input.personalInfo },
        update: input.personalInfo,
      });
    }

    if (input.education) await replaceChildren(tx, "resumeEducation", resumeId, input.education);
    if (input.experience) await replaceChildren(tx, "resumeExperience", resumeId, input.experience);
    if (input.projects) await replaceChildren(tx, "resumeProject", resumeId, input.projects);
    if (input.skills) await replaceChildren(tx, "resumeSkill", resumeId, input.skills);
    if (input.certifications) await replaceChildren(tx, "resumeCertification", resumeId, input.certifications);
    if (input.achievements) await replaceChildren(tx, "resumeAchievement", resumeId, input.achievements);
    if (input.languages) await replaceChildren(tx, "resumeLanguage", resumeId, input.languages);
    if (input.customSections) await replaceChildren(tx, "resumeCustomSection", resumeId, input.customSections);

    return tx.resume.findFirstOrThrow({ where: { id: resumeId, userId }, include: fullResumeInclude });
  });
}

// Generic "replace all children of this resume for a given section" helper.
// Delete-then-create is simplest and safe here because every write is
// wrapped in the outer transaction and scoped by resumeId, which itself was
// already verified to belong to the requesting user.
type TxClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];
type ChildModelName =
  | "resumeEducation"
  | "resumeExperience"
  | "resumeProject"
  | "resumeSkill"
  | "resumeCertification"
  | "resumeAchievement"
  | "resumeLanguage"
  | "resumeCustomSection";

interface ChildDelegate {
  deleteMany: (args: { where: { resumeId: string } }) => Promise<unknown>;
  createMany: (args: { data: Record<string, unknown>[] }) => Promise<unknown>;
}

async function replaceChildren(
  tx: TxClient,
  model: ChildModelName,
  resumeId: string,
  items: Array<{ id?: string } & Record<string, unknown>>,
) {
  const delegate = tx[model] as unknown as ChildDelegate;
  await delegate.deleteMany({ where: { resumeId } });
  if (items.length === 0) return;
  await delegate.createMany({
    data: items.map(({ id: _id, ...rest }) => ({ ...rest, resumeId })),
  });
}

export async function deleteResume(userId: string, resumeId: string) {
  const owned = await prisma.resume.findFirst({ where: { id: resumeId, userId }, select: { id: true } });
  if (!owned) throw new ResumeNotFoundError();
  await prisma.resume.delete({ where: { id: resumeId } });
}

// Used by the daily cron job (app/api/cron/cleanup-resumes). Not user-facing
// and takes no userId, since it operates across all users by design.
export async function deleteInactiveResumes(inactivityDays: number = RESUME_INACTIVITY_DAYS) {
  const cutoff = new Date(Date.now() - inactivityDays * 24 * 60 * 60 * 1000);
  const result = await prisma.resume.deleteMany({ where: { lastEditedAt: { lt: cutoff } } });
  return result.count;
}
