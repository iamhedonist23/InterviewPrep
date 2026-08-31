-- AlterTable
ALTER TABLE "User" ADD COLUMN "targetRole" TEXT;
ALTER TABLE "User" ADD COLUMN "experienceLevel" "ExperienceLevel";
ALTER TABLE "User" ADD COLUMN "dailyGoalMinutes" INTEGER;
ALTER TABLE "User" ADD COLUMN "preferredTechnologies" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "User" ADD COLUMN "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false;
