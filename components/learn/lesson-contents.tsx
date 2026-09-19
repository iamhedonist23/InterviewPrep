"use client";

import { ListTree, X } from "lucide-react";
import { useEffect, useState } from "react";

export type ContentsItem = {
  id: string;
  label: string;
  kind?: "section" | "resource";
};

type LessonContentsProps = {
  items: ContentsItem[];
  onDesktopOpenChange?: (open: boolean) => void;
  desktopOpen?: boolean;
  embedded?: boolean;
  mobileOnly?: boolean;
};

export function LessonContents({ items, onDesktopOpenChange, desktopOpen, embedded = false, mobileOnly = false }: LessonContentsProps) {
  const [open, setOpen] = useState(false);
  const [desktopHovered, setDesktopHovered] = useState(false);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map(item => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -65% 0px", threshold: [0, 1] },
    );

    headings.forEach(heading => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  function selectItem(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
    setOpen(false);
    onDesktopOpenChange?.(false);
  }

  const expanded = desktopOpen ?? (open || desktopHovered);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close contents"
          className="fixed inset-0 z-40 bg-ink/20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <nav
        aria-label="Lesson contents"
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
        className={`${embedded ? "relative block min-h-11 w-full" : `fixed right-0 top-[calc(50%-4rem)] z-50 -translate-y-1/2 ${mobileOnly ? "lg:hidden" : ""}`} ${embedded ? (expanded ? "z-20" : "z-10") : ""} group/contents transition-transform duration-300 ease-out ${embedded ? "" : expanded ? "translate-x-0" : "translate-x-[calc(100%-2.75rem)]"}`}
      >
        <button
          type="button"
          aria-label={open ? "Close contents" : "Open contents"}
          aria-expanded={expanded}
          aria-controls="lesson-contents-list"
          onClick={() => {
            const nextOpen = !expanded;
            if (!embedded) setOpen(nextOpen);
            onDesktopOpenChange?.(nextOpen);
          }}
          title="Contents"
          className="absolute -left-11 top-0 z-10 flex h-11 w-11 items-center justify-center rounded-l-xl bg-ink text-paper shadow-lg shadow-ink/15 transition-colors hover:text-coral focus-visible:text-coral"
        >
          {open ? <X size={18} aria-hidden="true" /> : <ListTree size={18} aria-hidden="true" />}
        </button>

        <div className={`${embedded ? "absolute right-0 top-0" : "relative"} flex w-[280px] max-w-[calc(100vw-1rem)] rounded-l-2xl border border-r-0 border-ink/10 bg-ink p-5 text-paper shadow-2xl shadow-ink/20 transition-opacity duration-300 sm:p-6 ${expanded ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-bold">Contents</h2>
              <span className="text-xs text-paper/45">{items.length} sections</span>
            </div>
            <ul id="lesson-contents-list" className="mt-4 max-h-[min(65vh,32rem)] space-y-1 overflow-y-auto pr-1 text-sm">
              {items.map(item => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => selectItem(item.id)}
                    aria-current={activeId === item.id ? "location" : undefined}
                    className={`flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left transition-colors focus-visible:outline-paper ${activeId === item.id ? "bg-coral/15 font-semibold text-coral" : "text-paper/65 hover:bg-paper/10 hover:text-paper"}`}
                  >
                    <span aria-hidden="true" className={`mt-1 text-xs ${activeId === item.id ? "text-coral" : "text-paper/35"}`}>
                      {activeId === item.id ? "●" : item.kind === "resource" ? "○" : "·"}
                    </span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
