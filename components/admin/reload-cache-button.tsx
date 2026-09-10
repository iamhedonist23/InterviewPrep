"use client";

import { useState } from "react";

export function ReloadCacheButton() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function handleClick() {
    setBusy(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/reload-cache", {
        method: "POST",
        headers: { "content-type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to refresh cache.");
      }

      setMessage(data.message || "Caches refreshed.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to refresh cache.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <div className="inline-flex items-center gap-3">
        <button
          type="button"
          onClick={handleClick}
          disabled={busy}
          className="rounded-full border border-ink/15 bg-ink px-5 py-3 text-sm font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Refreshing..." : "Reload cache"}
        </button>
        {message ? <p className="text-sm text-coral">{message}</p> : null}
      </div>
    </div>
  );
}
