"use client";

export function DownloadPdfButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-bold text-paper hover:bg-coral"
    >
      Download as PDF
    </button>
  );
}
