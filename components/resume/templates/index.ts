import { ClassicResumeTemplate } from "./classic-template";
import { ModernResumeTemplate } from "./modern-template";
import { MinimalResumeTemplate } from "./minimal-template";
import type { ResumeTemplateProps } from "./shared";

export const RESUME_TEMPLATES = {
  classic: { label: "Classic", component: ClassicResumeTemplate },
  modern: { label: "Modern", component: ModernResumeTemplate },
  minimal: { label: "Minimal", component: MinimalResumeTemplate },
} as const;

export type ResumeTemplateKey = keyof typeof RESUME_TEMPLATES;

export function getResumeTemplateComponent(key: string) {
  return (RESUME_TEMPLATES[key as ResumeTemplateKey] ?? RESUME_TEMPLATES.classic).component;
}

export type { ResumeTemplateProps };
