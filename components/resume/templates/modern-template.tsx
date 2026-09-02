import { formatMonthYear, dateRange, type ResumeTemplateProps, type DateLike } from "./shared";

export function ModernResumeTemplate({
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
  const contactItems = [personalInfo?.location, personalInfo?.email, personalInfo?.phone, personalInfo?.website, personalInfo?.linkedin, personalInfo?.github, personalInfo?.portfolio].filter(
    Boolean,
  ) as string[];

  return (
    <div className="mx-auto grid max-w-[8.5in] grid-cols-[2.3in_1fr] bg-white text-[#1d1d1d] shadow-sm print:m-0 print:flex print:items-start print:shadow-none print:[print-color-adjust:exact] print:[-webkit-print-color-adjust:exact]">
      {/* Sidebar */}
      <aside className="bg-ink px-6 py-10 text-paper print:w-[2.3in] print:shrink-0 print:break-inside-avoid">
        <h1 className="font-display text-2xl font-bold leading-tight">{personalInfo?.fullName || title}</h1>
        {personalInfo?.professionalTitle && <p className="mt-1 text-sm text-paper/70">{personalInfo.professionalTitle}</p>}

        {contactItems.length > 0 && (
          <SidebarSection title="Contact">
            <ul className="space-y-1.5 text-xs text-paper/80">
              {contactItems.map((item, index) => (
                <li key={index} className="break-words">{item}</li>
              ))}
            </ul>
          </SidebarSection>
        )}

        {skills.length > 0 && (
          <SidebarSection title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {skills.map((item, index) => (
                <span key={index} className="rounded-full bg-paper/15 px-2.5 py-1 text-[11px] font-semibold">
                  {String(item.name ?? "")}
                </span>
              ))}
            </div>
          </SidebarSection>
        )}

        {languages.length > 0 && (
          <SidebarSection title="Languages">
            <ul className="space-y-1 text-xs text-paper/80">
              {languages.map((item, index) => (
                <li key={index}>
                  {String(item.name ?? "")} <span className="text-paper/50">· {String(item.proficiency ?? "").toLowerCase()}</span>
                </li>
              ))}
            </ul>
          </SidebarSection>
        )}

        {certifications.length > 0 && (
          <SidebarSection title="Certifications">
            <ul className="space-y-2 text-xs text-paper/80">
              {certifications.map((item, index) => (
                <li key={index}>
                  <p className="font-semibold text-paper">{String(item.name ?? "")}</p>
                  {item.organization ? <p className="text-paper/60">{String(item.organization)}</p> : null}
                </li>
              ))}
            </ul>
          </SidebarSection>
        )}
      </aside>

      {/* Main column */}
      <main className="min-w-0 px-8 py-10 print:w-auto print:min-w-0 print:flex-1 print:p-8">
        {personalInfo?.summary && (
          <MainSection title="Summary">
            <p className="text-sm leading-relaxed text-ink/80">{personalInfo.summary}</p>
          </MainSection>
        )}

        {experience.length > 0 && (
          <MainSection title="Experience">
            {experience.map((item, index) => (
              <EntryBlock
                key={index}
                heading={String(item.jobTitle ?? "")}
                subheading={String(item.company ?? "")}
                meta={[String(item.location ?? ""), dateRange(item.startDate as DateLike, item.endDate as DateLike, Boolean(item.isCurrent))].filter(Boolean).join(" · ")}
                description={item.description ? String(item.description) : undefined}
                bullets={Array.isArray(item.achievements) ? (item.achievements as string[]) : []}
              />
            ))}
          </MainSection>
        )}

        {projects.length > 0 && (
          <MainSection title="Projects">
            {projects.map((item, index) => (
              <EntryBlock
                key={index}
                heading={String(item.name ?? "")}
                subheading={Array.isArray(item.technologies) ? (item.technologies as string[]).join(", ") : ""}
                meta={dateRange(item.startDate as DateLike, item.endDate as DateLike)}
                description={item.description ? String(item.description) : undefined}
                bullets={Array.isArray(item.achievements) ? (item.achievements as string[]) : []}
                link={String(item.projectUrl ?? item.githubUrl ?? "")}
              />
            ))}
          </MainSection>
        )}

        {education.length > 0 && (
          <MainSection title="Education">
            {education.map((item, index) => (
              <EntryBlock
                key={index}
                heading={[item.degree, item.fieldOfStudy].filter(Boolean).join(", ")}
                subheading={String(item.institution ?? "")}
                meta={[String(item.location ?? ""), dateRange(item.startDate as DateLike, item.endDate as DateLike, Boolean(item.isCurrent))].filter(Boolean).join(" · ")}
                description={item.description ? String(item.description) : undefined}
              />
            ))}
          </MainSection>
        )}

        {achievements.length > 0 && (
          <MainSection title="Achievements">
            {achievements.map((item, index) => (
              <EntryBlock key={index} heading={String(item.title ?? "")} meta={formatMonthYear(item.date as DateLike)} description={item.description ? String(item.description) : undefined} />
            ))}
          </MainSection>
        )}

        {customSections.map((section, index) => (
          <MainSection key={index} title={String(section.title ?? "Additional")}>
            <p className="whitespace-pre-line text-sm leading-relaxed text-ink/80">{String(section.content ?? "")}</p>
          </MainSection>
        ))}
      </main>
    </div>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 break-inside-avoid">
      <h2 className="text-[11px] font-bold uppercase tracking-[.16em] text-paper/50">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function MainSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7 break-inside-avoid first:mt-0">
      <h2 className="text-xs font-bold uppercase tracking-[.16em] text-coral">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function EntryBlock({
  heading,
  subheading,
  meta,
  description,
  bullets,
  link,
}: {
  heading: string;
  subheading?: string;
  meta?: string;
  description?: string;
  bullets?: string[];
  link?: string;
}) {
  return (
    <div className="mb-4 break-inside-avoid last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <p className="text-sm font-bold text-ink">{heading || "Untitled"}</p>
        {meta && <p className="text-xs text-ink/50">{meta}</p>}
      </div>
      {subheading && <p className="text-sm text-ink/70">{subheading}</p>}
      {link && <p className="text-xs text-coral">{link}</p>}
      {description && <p className="mt-1 text-sm leading-relaxed text-ink/80">{description}</p>}
      {bullets && bullets.filter(Boolean).length > 0 && (
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-ink/80">
          {bullets.filter(Boolean).map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
