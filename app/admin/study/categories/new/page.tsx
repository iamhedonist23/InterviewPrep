"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui/container";

export default function AdminStudyCategoryForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: "",
    slug: "",
    description: "",
    sortOrder: 0,
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/admin/study/categories", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/study/categories");
      } else {
        const result = await response.json();
        setError(result.error || "Could not create category");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="py-16">
      <Container>
        <Link href="/admin/study/categories" className="text-sm font-bold text-ink/55">
          ← Back to categories
        </Link>

        <div className="mt-8 max-w-2xl">
          <h1 className="font-display text-4xl font-bold">Create study category</h1>
          <p className="mt-3 text-ink/60">
            A category groups related learning paths (e.g., Java, JavaScript, Python).
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border border-ink/10 bg-white/70 p-6">
            <label className="block">
              <span className="text-sm font-bold">Category name</span>
              <input
                type="text"
                required
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="e.g., Java"
                className="mt-2 h-11 w-full rounded-xl border border-ink/15 bg-paper px-3 font-normal"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold">URL slug</span>
              <input
                type="text"
                required
                value={data.slug}
                onChange={(e) => setData({ ...data, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
                placeholder="e.g., java"
                className="mt-2 h-11 w-full rounded-xl border border-ink/15 bg-paper px-3 font-normal"
              />
              <p className="mt-1 text-xs text-ink/50">Lowercase, alphanumeric, and hyphens only</p>
            </label>

            <label className="block">
              <span className="text-sm font-bold">Description</span>
              <textarea
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                placeholder="What will users learn?"
                className="mt-2 min-h-24 w-full rounded-xl border border-ink/15 bg-paper p-3 font-normal"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold">Sort order</span>
              <input
                type="number"
                value={data.sortOrder}
                onChange={(e) => setData({ ...data, sortOrder: parseInt(e.target.value) })}
                className="mt-2 h-11 w-full rounded-xl border border-ink/15 bg-paper px-3 font-normal"
              />
              <p className="mt-1 text-xs text-ink/50">Lower numbers appear first</p>
            </label>

            {error && (
              <p role="alert" className="rounded-lg bg-error/10 px-4 py-3 text-sm font-semibold text-error">
                {error}
              </p>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={busy}
                className="rounded-full bg-coral px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
              >
                {busy ? "Creating..." : "Create category"}
              </button>
              <Link
                href="/admin/study/categories"
                className="rounded-full border border-ink/15 px-5 py-3 text-sm font-bold hover:border-ink/30"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
