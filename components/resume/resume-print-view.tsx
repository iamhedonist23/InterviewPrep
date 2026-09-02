"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ResumePrintView({ resumeId, returnUrl, children }: { resumeId: string; returnUrl: string; children: ReactNode }) {
  const hasTriggeredPrint = useRef(false);

  useEffect(() => {
    const handleAfterPrint = () => {
      window.location.href = returnUrl;
    };

    window.addEventListener("afterprint", handleAfterPrint);

    const timer = window.setTimeout(() => {
      if (hasTriggeredPrint.current) return;

      hasTriggeredPrint.current = true;

      try {
        window.print();
      } catch {
        // The browser may block automatic print without a user gesture.
      }
    }, 400);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [returnUrl]);

  return (
    <div className="resume-export-shell bg-white text-black">
      <div className="mb-4 flex items-center justify-between gap-3 print:hidden">
        <a href={returnUrl} className="text-sm font-bold text-coral">
          ← Back to preview
        </a>
        <button
          type="button"
          onClick={() => {
            hasTriggeredPrint.current = true;
            window.print();
          }}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-bold text-paper hover:bg-coral"
        >
          Print PDF
        </button>
      </div>
      {children}
    </div>
  );
}
