import Link from "next/link";

type Props = { active: "all" | "questions" | "topics"; questionCount: number; topicCount: number };

export function SavedTabs({ active, questionCount, topicCount }: Props) {
  const tabs: { key: "all" | "questions" | "topics"; label: string; href: string }[] = [
    { key: "all", label: "All", href: "/dashboard/saved" },
    { key: "questions", label: `Interview questions (${questionCount})`, href: "/dashboard/saved?tab=questions" },
    { key: "topics", label: `Study topics (${topicCount})`, href: "/dashboard/saved?tab=topics" },
  ];
  return (
    <div className="mt-8 flex flex-wrap gap-2 border-b border-ink/10 pb-1">
      {tabs.map(tab => (
        <Link
          key={tab.key}
          href={tab.href}
          className={`rounded-t-lg px-4 py-2 text-sm font-bold ${active === tab.key ? "border-b-2 border-coral text-coral" : "text-ink/55 hover:text-ink"}`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
