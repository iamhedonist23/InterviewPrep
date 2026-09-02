"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";

interface Module {
  id: string;
  title: string;
  studyPath: { categoryId: string; name: string };
}

interface Category {
  id: string;
  name: string;
}

export default function AdminStudyTopicForm() {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [section, setSection] = useState({ title: "", content: "" });
  const [sections, setSections] = useState<typeof section[]>([]);
  const [example, setExample] = useState({ language: "javascript", code: "", explanation: "" });
  const [examples, setExamples] = useState<typeof example[]>([]);

  const [data, setData] = useState({
    moduleId: "",
    categoryId: "",
    title: "",
    slug: "",
    shortDescription: "",
    estimatedMinutes: 5,
  });

  useEffect(() => {
    // Fetch categories
    fetch("/api/admin/study/categories")
      .then((r) => r.json())
      .then((c) => setCategories(c || []))
      .catch(() => {});

    // Fetch modules
    fetch("/api/admin/study/modules")
      .then((r) => r.json())
      .then((m) => setModules(m || []))
      .catch(() => {});
  }, []);

  const filteredModules = data.categoryId ? modules.filter((m) => m.studyPath.categoryId === data.categoryId) : [];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      // Create topic
      const topicRes = await fetch("/api/admin/study/topics", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!topicRes.ok) {
        const result = await topicRes.json();
        setError(result.error || "Could not create topic");
        return;
      }

      const topic = await topicRes.json();

      // Add sections
      for (const sec of sections) {
        await fetch("/api/admin/study/sections", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...sec, topicId: topic.id }),
        });
      }

      // Add examples
      for (const ex of examples) {
        await fetch("/api/admin/study/examples", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...ex, topicId: topic.id }),
        });
      }

      router.push("/admin/study/topics");
    } catch (err) {
      setError("An error occurred");
    } finally {
      setBusy(false);
    }
  }

  function addSection() {
    if (section.title && section.content) {
      setSections([...sections, section]);
      setSection({ title: "", content: "" });
    }
  }

  function removeSection(idx: number) {
    setSections(sections.filter((_, i) => i !== idx));
  }

  function addExample() {
    if (example.language && example.code) {
      setExamples([...examples, example]);
      setExample({ language: "javascript", code: "", explanation: "" });
    }
  }

  function removeExample(idx: number) {
    setExamples(examples.filter((_, i) => i !== idx));
  }

  return (
    <section className="py-16">
      <Container>
        <Link href="/admin/study/topics" className="text-sm font-bold text-ink/55">
          ← Back to topics
        </Link>

        <div className="mt-8 max-w-4xl">
          <h1 className="font-display text-4xl font-bold">Create study topic</h1>
          <p className="mt-3 text-ink/60">
            Add a topic with sections (explanations), code examples, and exercises.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-8">
            {/* Basic info */}
            <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
              <h2 className="font-display text-xl font-bold">Topic information</h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold">Category</span>
                  <select
                    required
                    value={data.categoryId}
                    onChange={(e) =>
                      setData({ ...data, categoryId: e.target.value, moduleId: "" })
                    }
                    className="mt-2 h-11 w-full rounded-xl border border-ink/15 bg-paper px-3"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-bold">Module</span>
                  <select
                    required
                    value={data.moduleId}
                    onChange={(e) => setData({ ...data, moduleId: e.target.value })}
                    className="mt-2 h-11 w-full rounded-xl border border-ink/15 bg-paper px-3"
                  >
                    <option value="">Select module</option>
                    {filteredModules.map((mod) => (
                      <option key={mod.id} value={mod.id}>
                        {mod.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-4">
                <label className="block">
                  <span className="text-sm font-bold">Topic title</span>
                  <input
                    type="text"
                    required
                    value={data.title}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                    placeholder="e.g., HashMap in Java"
                    className="mt-2 h-11 w-full rounded-xl border border-ink/15 bg-paper px-3"
                  />
                </label>
              </div>

              <div className="mt-4">
                <label className="block">
                  <span className="text-sm font-bold">URL slug</span>
                  <input
                    type="text"
                    required
                    value={data.slug}
                    onChange={(e) =>
                      setData({
                        ...data,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                      })
                    }
                    placeholder="e.g., hashmap"
                    className="mt-2 h-11 w-full rounded-xl border border-ink/15 bg-paper px-3"
                  />
                </label>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold">Short description</span>
                  <textarea
                    value={data.shortDescription}
                    onChange={(e) =>
                      setData({ ...data, shortDescription: e.target.value })
                    }
                    placeholder="Brief summary for topic listings"
                    className="mt-2 min-h-20 w-full rounded-xl border border-ink/15 bg-paper p-3"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold">Estimated reading time (minutes)</span>
                  <input
                    type="number"
                    min="1"
                    max="600"
                    value={data.estimatedMinutes}
                    onChange={(e) =>
                      setData({ ...data, estimatedMinutes: parseInt(e.target.value) })
                    }
                    className="mt-2 h-11 w-full rounded-xl border border-ink/15 bg-paper px-3"
                  />
                </label>
              </div>
            </div>

            {/* Sections */}
            <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
              <h2 className="font-display text-xl font-bold">Content sections</h2>
              <p className="mt-1 text-sm text-ink/60">
                Add explanatory sections (What it is, How it works, Real-world examples, etc.)
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="block">
                    <span className="text-sm font-bold">Section title</span>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => setSection({ ...section, title: e.target.value })}
                      placeholder="e.g., What is HashMap?"
                      className="mt-2 h-11 w-full rounded-xl border border-ink/15 bg-paper px-3"
                    />
                  </label>
                </div>

                <div>
                  <label className="block">
                    <span className="text-sm font-bold">Content</span>
                    <textarea
                      value={section.content}
                      onChange={(e) =>
                        setSection({ ...section, content: e.target.value })
                      }
                      placeholder="Write your explanation here..."
                      className="mt-2 min-h-32 w-full rounded-xl border border-ink/15 bg-paper p-3 font-mono text-sm"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  onClick={addSection}
                  className="rounded-full border border-ink/15 px-4 py-2 text-sm font-bold hover:border-ink/30"
                >
                  + Add section
                </button>
              </div>

              {sections.length > 0 && (
                <div className="mt-6 space-y-2 border-t border-ink/10 pt-4">
                  {sections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg bg-ink/5 p-3"
                    >
                      <div>
                        <p className="font-semibold">{sec.title}</p>
                        <p className="text-xs text-ink/50">
                          {sec.content.length} characters
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSection(idx)}
                        className="text-xs font-bold text-error hover:text-coral"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Code examples */}
            <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
              <h2 className="font-display text-xl font-bold">Code examples</h2>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="block">
                    <span className="text-sm font-bold">Programming language</span>
                    <select
                      value={example.language}
                      onChange={(e) =>
                        setExample({ ...example, language: e.target.value })
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-ink/15 bg-paper px-3"
                    >
                      <option value="java">Java</option>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="sql">SQL</option>
                      <option value="cpp">C++</option>
                    </select>
                  </label>
                </div>

                <div>
                  <label className="block">
                    <span className="text-sm font-bold">Code</span>
                    <textarea
                      value={example.code}
                      onChange={(e) => setExample({ ...example, code: e.target.value })}
                      placeholder="Paste code here..."
                      className="mt-2 min-h-32 w-full rounded-xl border border-ink/15 bg-paper p-3 font-mono text-sm"
                    />
                  </label>
                </div>

                <div>
                  <label className="block">
                    <span className="text-sm font-bold">Explanation (optional)</span>
                    <textarea
                      value={example.explanation}
                      onChange={(e) =>
                        setExample({ ...example, explanation: e.target.value })
                      }
                      placeholder="Explain what this code does..."
                      className="mt-2 min-h-20 w-full rounded-xl border border-ink/15 bg-paper p-3"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  onClick={addExample}
                  className="rounded-full border border-ink/15 px-4 py-2 text-sm font-bold hover:border-ink/30"
                >
                  + Add example
                </button>
              </div>

              {examples.length > 0 && (
                <div className="mt-6 space-y-2 border-t border-ink/10 pt-4">
                  {examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg bg-ink/5 p-3"
                    >
                      <div>
                        <p className="font-semibold">{ex.language}</p>
                        <p className="text-xs text-ink/50">
                          {ex.code.length} characters
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeExample(idx)}
                        className="text-xs font-bold text-error hover:text-coral"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-error/10 px-4 py-3 text-sm font-semibold text-error">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={busy}
                className="rounded-full bg-coral px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
              >
                {busy ? "Creating..." : "Create topic"}
              </button>
              <Link
                href="/admin/study/topics"
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
