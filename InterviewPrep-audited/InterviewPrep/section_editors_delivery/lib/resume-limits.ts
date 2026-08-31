// Kept separate from lib/resume.ts (which imports the Prisma client) so that
// client components can import these limits without pulling server-only code
// into the browser bundle.
export const RESUME_LIMITS = {
  maxResumesPerUser: 20,
  maxEducation: 10,
  maxExperience: 15,
  maxProjects: 15,
  maxSkills: 60,
  maxCertifications: 20,
  maxAchievements: 20,
  maxLanguages: 15,
  maxCustomSections: 10,
  maxBulletsPerEntry: 15,
} as const;

// A resume with no edits for this many days is treated as abandoned and is
// eligible for cleanup by the cron job at app/api/cron/cleanup-resumes.
export const RESUME_INACTIVITY_DAYS = 7;
