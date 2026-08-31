"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ExperienceEditor,
  EducationEditor,
  ProjectsEditor,
  SkillsEditor,
  CertificationsEditor,
  AchievementsEditor,
  LanguagesEditor,
  CustomSectionsEditor,
} from "@/components/resume/section-editors";
import {
  type EducationItem,
  type ExperienceItem,
  type ProjectItem,
  type SkillItem,
  type CertificationItem,
  type AchievementItem,
  type LanguageItem,
  type CustomSectionItem,
  toApiEducation,
  toApiExperience,
  toApiProjects,
  toApiSkills,
  toApiCertifications,
  toApiAchievements,
} from "@/components/resume/section-types";

type PersonalInfo = {
  fullName?: string | null;
  professionalTitle?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  website?: string | null;
  linkedin?: string | null;
  summary?: string | null;
};

type Props = {
  resumeId: string;
  initialTitle: string;
  initialTemplate: string;
  initialPersonalInfo: PersonalInfo | null;
  initialEducation: EducationItem[];
  initialExperience: ExperienceItem[];
  initialProjects: ProjectItem[];
  initialSkills: SkillItem[];
  initialCertifications: CertificationItem[];
  initialAchievements: AchievementItem[];
  initialLanguages: LanguageItem[];
  initialCustomSections: CustomSectionItem[];
};

const TEMPLATES = ["classic", "modern", "minimal"];

const PERSONAL_FIELDS: Array<{ key: keyof PersonalInfo; label: string; placeholder: string }> = [
  { key: "fullName", label: "Full name", placeholder: "Jane Doe" },
  { key: "professionalTitle", label: "Professional title", placeholder: "Android Developer" },
  { key: "email", label: "Email", placeholder: "jane@example.com" },
  { key: "phone", label: "Phone", placeholder: "+91 98765 43210" },
  { key: "location", label: "Location", placeholder: "Udaipur, India" },
  { key: "website", label: "Website", placeholder: "janedoe.dev" },
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/janedoe" },
];

const TABS = ["Personal", "Experience", "Education", "Skills", "Projects", "Certifications", "Achievements", "Languages", "Custom"] as const;
type Tab = (typeof TABS)[number];

export function ResumeEditorForm(props: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("Personal");
  const [title, setTitle] = useState(props.initialTitle);
  const [template, setTemplate] = useState(props.initialTemplate);
  const [info, setInfo] = useState<PersonalInfo>(props.initialPersonalInfo ?? {});
  const [education, setEducation] = useState(props.initialEducation);
  const [experience, setExperience] = useState(props.initialExperience);
  const [projects, setProjects] = useState(props.initialProjects);
  const [skills, setSkills] = useState(props.initialSkills);
  const [certifications, setCertifications] = useState(props.initialCertifications);
  const [achievements, setAchievements] = useState(props.initialAchievements);
  const [languages, setLanguages] = useState(props.initialLanguages);
  const [customSections, setCustomSections] = useState(props.initialCustomSections);

  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/resumes/${props.resumeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          template,
          personalInfo: info,
          education: toApiEducation(education),
          experience: toApiExperience(experience),
          projects: toApiProjects(projects),
          skills: toApiSkills(skills),
          certifications: toApiCertifications(certifications),
          achievements: toApiAchievements(achievements),
          languages,
          customSections,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Could not save your changes.");
        setSaving(false);
        return;
      }
      setSavedAt(new Date());
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-8">
      <nav className="flex flex-wrap gap-2 border-b border-ink/10 pb-4" aria-label="Resume sections">
        {TABS.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setTab(name)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              tab === name ? "bg-ink text-paper" : "text-ink/60 hover:bg-mint"
            }`}
          >
            {name}
          </button>
        ))}
      </nav>

      <div className="mt-8">
        {tab === "Personal" && (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-ink/70">
                Resume title
                <input className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={150} />
              </label>
              <label className="block text-sm font-semibold text-ink/70">
                Template
                <select className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm capitalize" value={template} onChange={(e) => setTemplate(e.target.value)}>
                  {TEMPLATES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold">Personal information</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {PERSONAL_FIELDS.map(({ key, label, placeholder }) => (
                  <label key={key} className="block text-sm font-semibold text-ink/70">
                    {label}
                    <input
                      className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm"
                      value={info[key] ?? ""}
                      placeholder={placeholder}
                      onChange={(e) => setInfo((current) => ({ ...current, [key]: e.target.value }))}
                      maxLength={200}
                    />
                  </label>
                ))}
              </div>
              <label className="mt-4 block text-sm font-semibold text-ink/70">
                Professional summary
                <textarea
                  className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm"
                  rows={4}
                  value={info.summary ?? ""}
                  onChange={(e) => setInfo((current) => ({ ...current, summary: e.target.value }))}
                  maxLength={2000}
                />
              </label>
            </div>
          </div>
        )}

        {tab === "Experience" && <ExperienceEditor items={experience} onChange={setExperience} />}
        {tab === "Education" && <EducationEditor items={education} onChange={setEducation} />}
        {tab === "Skills" && <SkillsEditor items={skills} onChange={setSkills} />}
        {tab === "Projects" && <ProjectsEditor items={projects} onChange={setProjects} />}
        {tab === "Certifications" && <CertificationsEditor items={certifications} onChange={setCertifications} />}
        {tab === "Achievements" && <AchievementsEditor items={achievements} onChange={setAchievements} />}
        {tab === "Languages" && <LanguagesEditor items={languages} onChange={setLanguages} />}
        {tab === "Custom" && <CustomSectionsEditor items={customSections} onChange={setCustomSections} />}
      </div>

      <div className="sticky bottom-4 mt-10 flex items-center gap-4 rounded-2xl border border-ink/10 bg-white/95 p-4 shadow-lg backdrop-blur">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-bold text-paper hover:bg-coral disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {savedAt && !saving && <span className="text-sm text-ink/50">Saved {savedAt.toLocaleTimeString()}</span>}
        {error && <span className="text-sm font-semibold text-coral">{error}</span>}
      </div>
    </div>
  );
}
