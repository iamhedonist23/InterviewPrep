"use client";

import { useRouter } from "next/navigation";

export function DownloadPdfButton({ resumeId }: { resumeId: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/resume-builder/${resumeId}/print`)}
      className="print:hidden inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-bold text-paper hover:bg-coral"
    >
      Download as PDF
    </button>
  );
}
