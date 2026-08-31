import { formatMonthYear, dateRange, type ResumeTemplateProps, type DateLike } from "./shared";

// Deliberately plain: no color accents, no boxes, no icons — optimized for
// applicant-tracking-system parsing rather than visual polish.
export function MinimalResumeTemplate({
  title,
  personalInfo,
  education,
  experience,
  projects,
  skills,
  certifications,
  achievements,
  languages,
  customSections,
}: ResumeTemplateProps) {
  const contactLine = [personalInfo?.location, personalInfo?.email, personalInfo?.phone, personalInfo?.website, personalInfo?.linkedin, personalInfo?.github, personalInfo?.portfolio]
    .filter(Boolean)
    .join(" | ");

  return (
    <div className="mx-auto max-w-[8.5in] bg-white p-10 font-sans text-[13px] leading-relaxed text-black print:m-0 print:p-8">
      <header>
        <h1 className="text-2xl font-bold">{personalInfo?.fullName || title}</h1>
        {personalInfo?.professionalTitle && <p className="mt-0.5">{personalInfo.professionalTitle}</p>}
        {contactLine && <p className="mt-1 text-[12px] text-black/70">{contactLine}</p>}
      </header>

      {personalInfo?.summary && (
        <Section title="Summary">
          <p>{personalInfo.summary}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((item, index) => (
            <Entry
              key={index}
              heading={`${String(item.jobTitle ?? "")}, ${String(item.company ?? "")}`}
              meta={dateRange(item.startDate as DateLike, item.endDate as DateLike, Boolean(item.isCurrent))}
              description={item.description ? String(item.description) : undefined}
              bullets={Array.isArray(item.achievements) ? (item.achievements as string[]) : []}
            />
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map((item, index) => (
            <Entry
              key={index}
              heading={`${[item.degree, item.fieldOfStudy].filter(Boolean).join(", ")}, ${String(item.institution ?? "")}`}
              meta={dateRange(item.startDate as DateLike, item.endDate as DateLike, Boolean(item.isCurrent))}
              description={item.description ? String(item.description) : undefined}
            />
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <p>{skills.map((item) => item.name).filter(Boolean).join(", ")}</p>
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((item, index) => (
            <Entry
              key={index}
              heading={String(item.name ?? "")}
              meta={[Array.isArray(item.technologies) ? (item.technologies as string[]).join(", ") : "", dateRange(item.startDate as DateLike, item.endDate as DateLike)]
                .filter(Boolean)
                .join(" — ")}
              description={item.description ? String(item.description) : undefined}
              bullets={Array.isArray(item.achievements) ? (item.achievements as string[]) : []}
            />
          ))}
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications">
          {certifications.map((item, index) => (
            <Entry key={index} heading={String(item.name ?? "")} meta={String(item.organization ?? "")} />
          ))}
        </Section>
      )}

      {achievements.length > 0 && (
        <Section title="Achievements">
          {achievements.map((item, index) => (
            <Entry key={index} heading={String(item.title ?? "")} meta={formatMonthYear(item.date as DateLike)} description={item.description ? String(item.description) : undefined} />
          ))}
        </Section>
      )}

      {languages.length > 0 && (
        <Section title="Languages">
          <p>{languages.map((item) => `${item.name} (${String(item.proficiency ?? "").toLowerCase()})`).join(", ")}</p>
        </Section>
      )}

      {customSections.map((section, index) => (
        <Section key={index} title={String(section.title ?? "Additional")}>
          <p className="whitespace-pre-line">{String(section.content ?? "")}</p>
        </Section>
      ))}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 break-inside-avoid border-t border-black/20 pt-3 first:mt-6 first:border-0 first:pt-0">
      <h2 className="text-[11px] font-bold uppercase tracking-wider">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function Entry({ heading, meta, description, bullets }: { heading: string; meta?: string; description?: string; bullets?: string[] }) {
  return (
    <div className="mb-3 break-inside-avoid last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <p className="font-semibold">{heading || "Untitled"}</p>
        {meta && <p className="text-[12px] text-black/60">{meta}</p>}
      </div>
      {description && <p className="mt-0.5">{description}</p>}
      {bullets && bullets.filter(Boolean).length > 0 && (
        <ul className="mt-0.5 list-disc space-y-0.5 pl-5">
          {bullets.filter(Boolean).map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
