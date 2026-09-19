import type { ReactNode } from "react";
import { LessonAbout } from "@/components/learn/lesson-about";
import { LessonContents, type ContentsItem } from "@/components/learn/lesson-contents";

type LessonPageShellProps = {
  contentsItems: ContentsItem[];
  difficulty: string;
  readingMinutes?: number;
  sectionCount: number;
  category: string;
  children: ReactNode;
};

export function LessonPageShell({ contentsItems, difficulty, readingMinutes, sectionCount, category, children }: LessonPageShellProps) {
  return (
    <>
      <LessonContents items={contentsItems} />
      <LessonAbout
        difficulty={difficulty}
        readingMinutes={readingMinutes}
        sectionCount={sectionCount}
        category={category}
      />
      <div className="w-full">{children}</div>
    </>
  );
}
