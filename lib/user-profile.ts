import { z } from "zod";
import { ExperienceLevel } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// Fixed option lists per the product spec — kept here (not a DB table) since
// they're a small, curated, code-owned set rather than user-generated data.
export const TARGET_ROLES = [
  "Java Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Frontend Developer",
  "Android Developer",
  "Software Engineer",
  "DevOps Engineer",
  "Data Engineer",
] as const;

export const TECHNOLOGY_OPTIONS = [
  "Java",
  "Spring Boot",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Kotlin",
  "Android",
  "SQL",
  "PostgreSQL",
  "System Design",
] as const;

export const onboardingSchema = z.object({
  targetRole: z.enum(TARGET_ROLES),
  experienceLevel: z.nativeEnum(ExperienceLevel),
  preferredTechnologies: z.array(z.enum(TECHNOLOGY_OPTIONS)).min(1, "Pick at least one technology").max(TECHNOLOGY_OPTIONS.length),
  dailyGoalMinutes: z.number().int().min(5).max(240),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;

export async function getUserProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      targetRole: true,
      experienceLevel: true,
      preferredTechnologies: true,
      dailyGoalMinutes: true,
      onboardingCompleted: true,
    },
  });
}

// Always takes userId as an explicit, server-derived parameter — callers
// must pull it from the session, never from the request body.
export async function completeOnboarding(userId: string, input: OnboardingInput) {
  return prisma.user.update({
    where: { id: userId },
    data: { ...input, onboardingCompleted: true },
    select: { onboardingCompleted: true },
  });
}
