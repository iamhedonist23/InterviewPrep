import Link from "next/link";

const sources: Record<string, { label: string; href: string }[]> = {
  "Java Developer": [{ label: "Java documentation", href: "https://docs.oracle.com/en/java/" }],
  "JavaScript Developer": [{ label: "MDN JavaScript guide", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" }],
  "Python Developer": [{ label: "Python documentation", href: "https://docs.python.org/3/" }],
  "React Developer": [{ label: "React documentation", href: "https://react.dev/learn" }],
  SQL: [{ label: "PostgreSQL documentation", href: "https://www.postgresql.org/docs/" }],
  AWS: [{ label: "AWS documentation", href: "https://docs.aws.amazon.com/" }],
  Docker: [{ label: "Docker documentation", href: "https://docs.docker.com/" }],
  Kubernetes: [{ label: "Kubernetes documentation", href: "https://kubernetes.io/docs/" }],
  Linux: [{ label: "Linux kernel documentation", href: "https://docs.kernel.org/" }],
  DevOps: [{ label: "OpenTelemetry documentation", href: "https://opentelemetry.io/docs/" }],
  "API & Web Services": [{ label: "HTTP semantics on MDN", href: "https://developer.mozilla.org/en-US/docs/Web/HTTP" }],
  "Generative AI": [{ label: "NIST AI Risk Management Framework", href: "https://www.nist.gov/itl/ai-risk-management-framework" }],
};

export function OfficialSources({ category }: { category: string }) {
  const items = sources[category];
  if (!items?.length) return null;
  return (
    <section className="border-t border-ink/10 pt-8">
      <h2 className="font-display text-xl font-bold sm:text-2xl">Further reading</h2>
      <p className="mt-3 text-base leading-8 text-ink/70">Use the official documentation below to verify version-specific details and continue learning. Behavior may vary by version or provider.</p>
      <ul className="mt-4 grid gap-2">{items.map((item) => <li key={item.href}><Link href={item.href} target="_blank" rel="noreferrer" className="font-semibold text-coral hover:underline">{item.label}</Link></li>)}</ul>
    </section>
  );
}