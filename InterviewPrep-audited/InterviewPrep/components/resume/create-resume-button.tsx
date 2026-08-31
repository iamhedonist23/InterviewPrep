"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function CreateResumeButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Untitled Resume", template: "classic" }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Could not create resume.");
        setLoading(false);
        return;
      }
      router.push(`/resume-builder/${data.resume.id}`);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className={className}>
      <Button type="button" onClick={handleCreate} className={loading ? "opacity-60" : ""}>
        {loading ? "Creating…" : "+ Create Resume"}
      </Button>
      {error && <p className="mt-2 text-sm font-semibold text-coral">{error}</p>}
    </div>
  );
}
