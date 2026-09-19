"use client";

import { Info, X } from "lucide-react";
import { useState } from "react";

type LessonAboutProps = {
  difficulty: string;
  readingMinutes?: number;
  sectionCount: number;
  category: string;
  onDesktopOpenChange?: (open: boolean) => void;
  desktopOpen?: boolean;
  embedded?: boolean;
  mobileOnly?: boolean;
};

export function LessonAbout({ difficulty, readingMinutes, sectionCount, category, onDesktopOpenChange, desktopOpen, embedded = false, mobileOnly = false }: LessonAboutProps) {
  const [open, setOpen] = useState(false);
  const [desktopHovered, setDesktopHovered] = useState(false);
  const expanded = desktopOpen ?? (open || desktopHovered);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close lesson information"
          className="fixed inset-0 z-40 bg-ink/20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        aria-label="About this lesson"
        onMouseEnter={() => {
          setDesktopHovered(true);
        }}
        onMouseLeave={() => {
          setDesktopHovered(false);
        }}
        onFocus={() => {
          setDesktopHovered(true);
        }}
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setDesktopHovered(false);
          }
        }}
        className={`${embedded ? "relative block min-h-11 w-full" : `fixed right-0 top-[calc(50%+6rem)] z-50 -translate-y-1/2 ${mobileOnly ? "lg:hidden" : ""}`} ${embedded ? (expanded ? "z-20" : "z-10") : ""} group/about transition-transform duration-300 ease-out ${embedded ? "" : expanded ? "translate-x-0" : "translate-x-[calc(100%-2.75rem)]"}`}
      >
        <button
          type="button"
          aria-label={open ? "Close lesson information" : "Open lesson information"}
          aria-expanded={expanded}
          aria-controls="lesson-about-panel"
          onClick={() => {
            const nextOpen = !expanded;
            if (!embedded) setOpen(nextOpen);
            onDesktopOpenChange?.(nextOpen);
          }}
          title="About this lesson"
          className="absolute -left-11 top-0 z-10 flex h-11 w-11 items-center justify-center rounded-l-xl bg-ink text-paper shadow-lg shadow-ink/15 transition-colors hover:text-coral focus-visible:text-coral"
        >
          {open ? <X size={18} aria-hidden="true" /> : <Info size={18} aria-hidden="true" />}
        </button>

        <div className={`${embedded ? "absolute right-0 top-0" : "relative"} max-h-[calc(100vh-2rem)] w-[280px] max-w-[calc(100vw-1rem)] overflow-y-auto rounded-l-2xl border border-r-0 border-ink/10 bg-white/95 p-5 text-ink shadow-2xl shadow-ink/15 backdrop-blur-sm transition-opacity duration-300 sm:p-6 ${expanded ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>

          <div id="lesson-about-panel">
            <h2 className="text-xs font-bold uppercase tracking-widest text-ink/60">About this lesson</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-ink/60">Difficulty</dt>
                <dd className="mt-1 font-bold capitalize text-ink">{difficulty}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink/60">Category</dt>
                <dd className="mt-1 font-bold text-ink">{category}</dd>
              </div>
              {readingMinutes && (
                <div>
                  <dt className="font-semibold text-ink/60">Reading time</dt>
                  <dd className="mt-1 font-bold text-ink">{readingMinutes} minutes</dd>
                </div>
              )}
              <div>
                <dt className="font-semibold text-ink/60">Content sections</dt>
                <dd className="mt-1 font-bold text-ink">{sectionCount}</dd>
              </div>
            </dl>
          </div>
        </div>
      </aside>
    </>
  );
}
