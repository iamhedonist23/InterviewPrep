"use client";
import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

export function SaveTopicButton({ topicId, initialSaved }: { topicId: string; initialSaved: boolean }) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      const response = await fetch("/api/saved-study-topics", {
        method: saved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId }),
      });
      if (response.ok) setSaved(current => !current);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-bold disabled:opacity-60 ${
        saved ? "border-coral bg-coral/10 text-coral" : "border-ink/15 text-ink/70 hover:border-ink/30"
      }`}
    >
      {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
      {saved ? "Saved" : "Save for later"}
    </button>
  );
}
