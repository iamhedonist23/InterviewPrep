"use client";
import {
  RepeatableSection,
  TextField,
  TextAreaField,
  DateField,
  SelectField,
  CheckboxField,
  BulletListField,
} from "@/components/resume/section-editor-primitives";
import {
  type EducationItem,
  type ExperienceItem,
  type ProjectItem,
  type SkillItem,
  type CertificationItem,
  type AchievementItem,
  type LanguageItem,
  type CustomSectionItem,
} from "@/components/resume/section-types";
import { RESUME_LIMITS } from "@/lib/resume-limits";

// RESUME_LIMITS mirrors the caps enforced server-side in lib/resume.ts.
const {
  maxEducation,
  maxExperience,
  maxProjects,
  maxSkills,
  maxCertifications,
  maxAchievements,
  maxLanguages,
  maxCustomSections,
} = RESUME_LIMITS;

export function ExperienceEditor({ items, onChange }: { items: ExperienceItem[]; onChange: (items: ExperienceItem[]) => void }) {
  return (
    <RepeatableSection
      title="Experience"
      description="Your work history, most relevant first."
      items={items}
      onChange={onChange}
      maxItems={maxExperience}
      makeBlank={() => ({ company: "", jobTitle: "", location: "", startDate: "", endDate: "", isCurrent: false, description: "", achievements: [] })}
      itemLabel={(item) => [item.jobTitle, item.company].filter(Boolean).join(" @ ")}
      renderItem={(item, update) => (
        <>
          <TextField label="Job title" value={item.jobTitle} onChange={(v) => update({ jobTitle: v })} maxLength={200} />
          <TextField label="Company" value={item.company} onChange={(v) => update({ company: v })} maxLength={200} />
          <TextField label="Location" value={item.location} onChange={(v) => update({ location: v })} maxLength={150} />
          <div className="flex items-end">
            <CheckboxField label="I currently work here" checked={item.isCurrent} onChange={(v) => update({ isCurrent: v, endDate: v ? "" : item.endDate })} />
          </div>
          <DateField label="Start date" value={item.startDate} onChange={(v) => update({ startDate: v })} />
          {!item.isCurrent && <DateField label="End date" value={item.endDate} onChange={(v) => update({ endDate: v })} />}
          <div className="sm:col-span-2">
            <TextAreaField label="Description" value={item.description} onChange={(v) => update({ description: v })} maxLength={2000} />
          </div>
          <div className="sm:col-span-2">
            <BulletListField label="Key achievements" values={item.achievements} onChange={(v) => update({ achievements: v })} maxItems={RESUME_LIMITS.maxBulletsPerEntry} />
          </div>
        </>
      )}
    />
  );
}

export function EducationEditor({ items, onChange }: { items: EducationItem[]; onChange: (items: EducationItem[]) => void }) {
  return (
    <RepeatableSection
      title="Education"
      items={items}
      onChange={onChange}
      maxItems={maxEducation}
      makeBlank={() => ({ institution: "", degree: "", fieldOfStudy: "", location: "", startDate: "", endDate: "", isCurrent: false, description: "" })}
      itemLabel={(item) => [item.degree, item.institution].filter(Boolean).join(" @ ")}
      renderItem={(item, update) => (
        <>
          <TextField label="Institution" value={item.institution} onChange={(v) => update({ institution: v })} maxLength={200} />
          <TextField label="Degree" value={item.degree} onChange={(v) => update({ degree: v })} maxLength={150} />
          <TextField label="Field of study" value={item.fieldOfStudy} onChange={(v) => update({ fieldOfStudy: v })} maxLength={150} />
          <TextField label="Location" value={item.location} onChange={(v) => update({ location: v })} maxLength={150} />
          <div className="flex items-end">
            <CheckboxField label="Currently studying" checked={item.isCurrent} onChange={(v) => update({ isCurrent: v, endDate: v ? "" : item.endDate })} />
          </div>
          <DateField label="Start date" value={item.startDate} onChange={(v) => update({ startDate: v })} />
          {!item.isCurrent && <DateField label="End date" value={item.endDate} onChange={(v) => update({ endDate: v })} />}
          <div className="sm:col-span-2">
            <TextAreaField label="Description" value={item.description} onChange={(v) => update({ description: v })} maxLength={2000} />
          </div>
        </>
      )}
    />
  );
}

export function ProjectsEditor({ items, onChange }: { items: ProjectItem[]; onChange: (items: ProjectItem[]) => void }) {
  return (
    <RepeatableSection
      title="Projects"
      items={items}
      onChange={onChange}
      maxItems={maxProjects}
      makeBlank={() => ({ name: "", description: "", technologies: "", projectUrl: "", githubUrl: "", startDate: "", endDate: "", achievements: [] })}
      itemLabel={(item) => item.name}
      renderItem={(item, update) => (
        <>
          <TextField label="Project name" value={item.name} onChange={(v) => update({ name: v })} maxLength={200} />
          <TextField label="Technologies (comma-separated)" value={item.technologies} onChange={(v) => update({ technologies: v })} maxLength={500} placeholder="React, Node.js, PostgreSQL" />
          <TextField label="Project URL" value={item.projectUrl} onChange={(v) => update({ projectUrl: v })} maxLength={300} placeholder="https://…" />
          <TextField label="GitHub URL" value={item.githubUrl} onChange={(v) => update({ githubUrl: v })} maxLength={300} placeholder="https://github.com/…" />
          <DateField label="Start date" value={item.startDate} onChange={(v) => update({ startDate: v })} />
          <DateField label="End date" value={item.endDate} onChange={(v) => update({ endDate: v })} />
          <div className="sm:col-span-2">
            <TextAreaField label="Description" value={item.description} onChange={(v) => update({ description: v })} maxLength={2000} />
          </div>
          <div className="sm:col-span-2">
            <BulletListField label="Key achievements" values={item.achievements} onChange={(v) => update({ achievements: v })} maxItems={RESUME_LIMITS.maxBulletsPerEntry} />
          </div>
        </>
      )}
    />
  );
}

const SKILL_LEVELS = ["", "BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];

export function SkillsEditor({ items, onChange }: { items: SkillItem[]; onChange: (items: SkillItem[]) => void }) {
  return (
    <RepeatableSection
      title="Skills"
      description="Technical and professional skills."
      items={items}
      onChange={onChange}
      maxItems={maxSkills}
      makeBlank={(): SkillItem => ({ name: "", category: "", level: "" })}
      itemLabel={(item) => item.name}
      renderItem={(item, update) => (
        <>
          <TextField label="Skill" value={item.name} onChange={(v) => update({ name: v })} maxLength={100} placeholder="React" />
          <TextField label="Category" value={item.category} onChange={(v) => update({ category: v })} maxLength={100} placeholder="Frontend" />
          <SelectField label="Level" value={item.level} options={SKILL_LEVELS} onChange={(v) => update({ level: v as SkillItem["level"] })} />
        </>
      )}
    />
  );
}

export function CertificationsEditor({ items, onChange }: { items: CertificationItem[]; onChange: (items: CertificationItem[]) => void }) {
  return (
    <RepeatableSection
      title="Certifications"
      items={items}
      onChange={onChange}
      maxItems={maxCertifications}
      makeBlank={() => ({ name: "", organization: "", issueDate: "", expirationDate: "", credentialId: "", credentialUrl: "" })}
      itemLabel={(item) => item.name}
      renderItem={(item, update) => (
        <>
          <TextField label="Certification name" value={item.name} onChange={(v) => update({ name: v })} maxLength={200} />
          <TextField label="Issuing organization" value={item.organization} onChange={(v) => update({ organization: v })} maxLength={200} />
          <DateField label="Issue date" value={item.issueDate} onChange={(v) => update({ issueDate: v })} />
          <DateField label="Expiration date" value={item.expirationDate} onChange={(v) => update({ expirationDate: v })} />
          <TextField label="Credential ID" value={item.credentialId} onChange={(v) => update({ credentialId: v })} maxLength={150} />
          <TextField label="Credential URL" value={item.credentialUrl} onChange={(v) => update({ credentialUrl: v })} maxLength={300} placeholder="https://…" />
        </>
      )}
    />
  );
}

export function AchievementsEditor({ items, onChange }: { items: AchievementItem[]; onChange: (items: AchievementItem[]) => void }) {
  return (
    <RepeatableSection
      title="Achievements"
      items={items}
      onChange={onChange}
      maxItems={maxAchievements}
      makeBlank={() => ({ title: "", description: "", date: "" })}
      itemLabel={(item) => item.title}
      renderItem={(item, update) => (
        <>
          <TextField label="Title" value={item.title} onChange={(v) => update({ title: v })} maxLength={200} />
          <DateField label="Date" value={item.date} onChange={(v) => update({ date: v })} />
          <div className="sm:col-span-2">
            <TextAreaField label="Description" value={item.description} onChange={(v) => update({ description: v })} maxLength={1000} />
          </div>
        </>
      )}
    />
  );
}

const LANGUAGE_PROFICIENCIES = ["BASIC", "CONVERSATIONAL", "FLUENT", "NATIVE"];

export function LanguagesEditor({ items, onChange }: { items: LanguageItem[]; onChange: (items: LanguageItem[]) => void }) {
  return (
    <RepeatableSection
      title="Languages"
      items={items}
      onChange={onChange}
      maxItems={maxLanguages}
      makeBlank={(): LanguageItem => ({ name: "", proficiency: "CONVERSATIONAL" })}
      itemLabel={(item) => item.name}
      renderItem={(item, update) => (
        <>
          <TextField label="Language" value={item.name} onChange={(v) => update({ name: v })} maxLength={100} placeholder="Spanish" />
          <SelectField label="Proficiency" value={item.proficiency} options={LANGUAGE_PROFICIENCIES} onChange={(v) => update({ proficiency: v as LanguageItem["proficiency"] })} />
        </>
      )}
    />
  );
}

export function CustomSectionsEditor({ items, onChange }: { items: CustomSectionItem[]; onChange: (items: CustomSectionItem[]) => void }) {
  return (
    <RepeatableSection
      title="Custom sections"
      description="Publications, volunteer work, awards, interests, courses, references — anything else."
      items={items}
      onChange={onChange}
      maxItems={maxCustomSections}
      makeBlank={() => ({ title: "", content: "" })}
      itemLabel={(item) => item.title}
      renderItem={(item, update) => (
        <>
          <TextField label="Section title" value={item.title} onChange={(v) => update({ title: v })} maxLength={150} placeholder="Volunteer Work" />
          <div className="sm:col-span-2">
            <TextAreaField label="Content" value={item.content} onChange={(v) => update({ content: v })} maxLength={5000} rows={4} />
          </div>
        </>
      )}
    />
  );
}
