import Link from "next/link";

export function ContentOwner({ publishedAt, updatedAt, showPolicyLink = true }: { publishedAt?: Date | string; updatedAt?: Date | string; showPolicyLink?: boolean }) {
  const formattedPublishedDate = publishedAt
    ? new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(publishedAt))
    : null;
  const formattedUpdatedDate = updatedAt
    ? new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(updatedAt))
    : null;

  return (
    <div className="not-prose border-y border-ink/10 py-4 text-sm text-ink/60">
      <p><span className="font-semibold text-ink">Content owner:</span>{" "}<Link href="/author/suresh-mali" className="font-semibold text-coral hover:underline">Suresh Mali</Link> - InstantInterviewPrep</p>
      <p className="mt-1">Suresh maintains the site and its interview-preparation content.</p>
      {formattedPublishedDate && <p className="mt-1"><span className="font-semibold text-ink">Published:</span> {formattedPublishedDate}</p>}
      {formattedUpdatedDate && <p className="mt-1"><span className="font-semibold text-ink">Last modified:</span> {formattedUpdatedDate}</p>}
      {showPolicyLink && <p className="mt-2">Learn how this content is created and maintained in our <Link href="/editorial-policy" className="font-semibold text-coral hover:underline">editorial policy</Link>.</p>}
    </div>
  );
}