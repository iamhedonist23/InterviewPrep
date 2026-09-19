"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { LessonAbout } from "@/components/learn/lesson-about";
import { LessonContents, type ContentsItem } from "@/components/learn/lesson-contents";
import { LessonOwner } from "@/components/learn/lesson-owner";

type LessonPageShellProps = {
  contentsItems: ContentsItem[];
  difficulty: string;
  readingMinutes?: number;
  updatedAt?: Date | string;
  sectionCount: number;
  category: string;
  children: ReactNode;
};

export function LessonPageShell({ contentsItems, difficulty, readingMinutes, updatedAt, sectionCount, category, children }: LessonPageShellProps) {
  const [activePanel, setActivePanel] = useState<"contents" | "about" | "owner" | null>(null);

  return (
    <>
      <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="w-full">{children}</div>
        <div className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-4 pt-14">
            <LessonContents items={contentsItems} embedded desktopOpen={activePanel === null ? undefined : activePanel === "contents"} onDesktopOpenChange={open => setActivePanel(open ? "contents" : null)} />
            <LessonAbout
              difficulty={difficulty}
              readingMinutes={readingMinutes}
              sectionCount={sectionCount}
              category={category}
              embedded
              desktopOpen={activePanel === null ? undefined : activePanel === "about"}
              onDesktopOpenChange={open => setActivePanel(open ? "about" : null)}
            />
            <LessonOwner updatedAt={updatedAt} embedded desktopOpen={activePanel === null ? undefined : activePanel === "owner"} onDesktopOpenChange={open => setActivePanel(open ? "owner" : null)} />
          </div>
        </div>
      </div>
      <LessonContents items={contentsItems} mobileOnly />
      <LessonAbout difficulty={difficulty} readingMinutes={readingMinutes} sectionCount={sectionCount} category={category} mobileOnly />
      <LessonOwner updatedAt={updatedAt} mobileOnly />
    </>
  );
}
