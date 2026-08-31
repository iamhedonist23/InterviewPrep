"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Status = "NOT_STARTED" | "STARTED" | "COMPLETED";

export function TopicProgressActions({ topicId, initialStatus }: { topicId: string; initialStatus: Status }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(initialStatus);
  const [loading, setLoading] = useState(false);

  async function send(action: "start" | "complete") {
    setLoading(true);
    try {
      const response = await fetch("/api/study/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId, action }),
      });
      if (response.ok) {
        setStatus(action === "start" ? "STARTED" : "COMPLETED");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  if (status === "COMPLETED") {
    return <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-bold text-ink">✓ Completed</span>;
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {status === "NOT_STARTED" && (
        <button
          type="button"
          onClick={() => send("start")}
          disabled={loading}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-bold text-paper hover:bg-coral disabled:opacity-60"
        >
          {loading ? "Starting…" : "Start topic"}
        </button>
      )}
      {status === "STARTED" && (
        <button
          type="button"
          onClick={() => send("complete")}
          disabled={loading}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-bold text-paper hover:bg-coral disabled:opacity-60"
        >
          {loading ? "Saving…" : "Mark complete"}
        </button>
      )}
    </div>
  );
}
