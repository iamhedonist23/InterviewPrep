"use client";

import { UserRound, X } from "lucide-react";
import { useState } from "react";
import { ContentOwner } from "@/components/editorial/content-owner";

type LessonOwnerProps = {
  updatedAt?: Date | string;
  onDesktopOpenChange?: (open: boolean) => void;
  desktopOpen?: boolean;
  embedded?: boolean;
  mobileOnly?: boolean;
};

export function LessonOwner({ updatedAt, onDesktopOpenChange, desktopOpen, embedded = false, mobileOnly = false }: LessonOwnerProps) {
  const [open, setOpen] = useState(false);
  const [desktopHovered, setDesktopHovered] = useState(false);
  const expanded = desktopOpen ?? (open || desktopHovered);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close content owner information"
          className="fixed inset-0 z-40 bg-ink/20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        aria-label="Content owner"
        onMouseEnter={() => setDesktopHovered(true)}
        onMouseLeave={() => setDesktopHovered(false)}
        onFocus={() => setDesktopHovered(true)}
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDesktopHovered(false);
        }}
        className={`${embedded ? "relative block min-h-11 w-full" : `fixed right-0 top-[calc(50%+16rem)] z-50 -translate-y-1/2 ${mobileOnly ? "lg:hidden" : ""}`} ${embedded ? (expanded ? "z-20" : "z-10") : ""} group/owner transition-transform duration-300 ease-out ${embedded ? "" : expanded ? "translate-x-0" : "translate-x-[calc(100%-2.75rem)]"}`}
      >
        <button
          type="button"
          aria-label={open ? "Close content owner information" : "Open content owner information"}
          aria-expanded={expanded}
          aria-controls="lesson-owner-panel"
          onClick={() => {
            const nextOpen = !expanded;
            if (!embedded) setOpen(nextOpen);
            onDesktopOpenChange?.(nextOpen);
          }}
          title="Content owner"
          className="absolute -left-11 top-0 z-10 flex h-11 w-11 items-center justify-center rounded-l-xl bg-ink text-paper shadow-lg shadow-ink/15 transition-colors hover:text-coral focus-visible:text-coral"
        >
          {open ? <X size={18} aria-hidden="true" /> : <UserRound size={18} aria-hidden="true" />}
        </button>

        <div className={`${embedded ? "absolute right-0 top-0" : "relative"} max-h-[calc(100vh-2rem)] w-[280px] max-w-[calc(100vw-1rem)] overflow-y-auto rounded-l-2xl border border-r-0 border-ink/10 bg-white/95 p-5 text-ink shadow-2xl shadow-ink/15 backdrop-blur-sm transition-opacity duration-300 sm:p-6 ${expanded ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
          <div id="lesson-owner-panel">
            <h2 className="text-xs font-bold uppercase tracking-widest text-ink/60">Content owner</h2>
            <ContentOwner updatedAt={updatedAt} />
          </div>
        </div>
      </aside>
    </>
  );
}