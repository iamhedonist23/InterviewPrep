type PersonalInfo = {
  fullName?: string | null;
  professionalTitle?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  website?: string | null;
  linkedin?: string | null;
  github?: string | null;
  portfolio?: string | null;
  summary?: string | null;
} | null;

type DateLike = string | Date | null | undefined;

function formatMonthYear(value: DateLike): string {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function dateRange(start: DateLike, end: DateLike, isCurrent?: boolean) {
  const startLabel = formatMonthYear(start);
  const endLabel = isCurrent ? "Present" : formatMonthYear(end);
  if (!startLabel && !endLabel) return "";
  return [startLabel, endLabel].filter(Boolean).join(" – ");
}

// The Record<string, unknown> item shapes below mirror what
// getOwnedResume() returns straight from Prisma — this template intentionally
// stays loose/defensive since it renders live database records.
export function ClassicResumeTemplate({
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
}: {
  title: string;
  personalInfo: PersonalInfo;
  education: Array<Record<string, unknown>>;
  experience: Array<Record<string, unknown>>;
  projects: Array<Record<string, unknown>>;
  skills: Array<Record<string, unknown>>;
  certifications: Array<Record<string, unknown>>;
  achievements: Array<Record<string, unknown>>;
  languages: Array<Record<string, unknown>>;
  customSections: Array<Record<string, unknown>>;
}) {
  const contactLine = [personalInfo?.location, personalInfo?.email, personalInfo?.phone].filter(Boolean).join("  ·  ");
  const linkLine = [personalInfo?.website, personalInfo?.linkedin, personalInfo?.github, personalInfo?.portfolio]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <div className="mx-auto max-w-[8.5in] bg-white p-10 text-[#1d1d1d] shadow-sm print:m-0 print:shadow-none print:p-8">
      <header className="border-b-2 border-ink pb-4">
        <h1 className="font-display text-3xl font-bold">{personalInfo?.fullName || title}</h1>
        {personalInfo?.professionalTitle && <p className="mt-1 text-lg text-ink/70">{personalInfo.professionalTitle}</p>}
        {contactLine && <p className="mt-2 text-sm text-ink/60">{contactLine}</p>}
        {linkLine && <p className="text-sm text-ink/60">{linkLine}</p>}
      </header>

      {personalInfo?.summary && (
        <Section title="Summary">
          <p className="text-sm leading-relaxed text-ink/80">{personalInfo.summary}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((item, index) => (
            <EntryBlock
              key={index}
              heading={String(item.jobTitle ?? "")}
              subheading={String(item.company ?? "")}
              meta={[String(item.location ?? ""), dateRange(item.startDate as DateLike, item.endDate as DateLike, Boolean(item.isCurrent))]
                .filter(Boolean)
                .join(" · ")}
              description={item.description ? String(item.description) : undefined}
              bullets={Array.isArray(item.achievements) ? (item.achievements as string[]) : []}
            />
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map((item, index) => (
            <EntryBlock
              key={index}
              heading={[item.degree, item.fieldOfStudy].filter(Boolean).join(", ")}
              subheading={String(item.institution ?? "")}
              meta={[String(item.location ?? ""), dateRange(item.startDate as DateLike, item.endDate as DateLike, Boolean(item.isCurrent))]
                .filter(Boolean)
                .join(" · ")}
              description={item.description ? String(item.description) : undefined}
            />
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <p className="text-sm leading-relaxed text-ink/80">
            {skills.map((item) => item.name).filter(Boolean).join("  ·  ")}
          </p>
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
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
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications">
          {certifications.map((item, index) => (
            <EntryBlock
              key={index}
              heading={String(item.name ?? "")}
              subheading={String(item.organization ?? "")}
              meta={dateRange(item.issueDate as DateLike, item.expirationDate as DateLike)}
            />
          ))}
        </Section>
      )}

      {achievements.length > 0 && (
        <Section title="Achievements">
          {achievements.map((item, index) => (
            <EntryBlock key={index} heading={String(item.title ?? "")} meta={formatMonthYear(item.date as DateLike)} description={item.description ? String(item.description) : undefined} />
          ))}
        </Section>
      )}

      {languages.length > 0 && (
        <Section title="Languages">
          <p className="text-sm leading-relaxed text-ink/80">
            {languages.map((item) => `${item.name} (${String(item.proficiency ?? "").toLowerCase()})`).join("  ·  ")}
          </p>
        </Section>
      )}

      {customSections.map((section, index) => (
        <Section key={index} title={String(section.title ?? "Additional")}>
          <p className="whitespace-pre-line text-sm leading-relaxed text-ink/80">{String(section.content ?? "")}</p>
        </Section>
      ))}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 break-inside-avoid">
      <h2 className="text-xs font-bold uppercase tracking-[.16em] text-coral">{title}</h2>
      <div className="mt-2">{children}</div>
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
