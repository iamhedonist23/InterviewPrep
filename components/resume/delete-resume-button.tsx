"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteResumeButton({ resumeId }: { resumeId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this resume? This cannot be undone.")) return;
    setLoading(true);
    const response = await fetch(`/api/resumes/${resumeId}`, { method: "DELETE" });
    if (response.ok) router.refresh();
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="text-sm font-semibold text-ink/50 hover:text-coral disabled:opacity-50"
    >
      {loading ? "Deleting…" : "Delete"}
    </button>
  );
}
