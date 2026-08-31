"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Code2, Sparkles, BriefcaseBusiness, Target, Users, Video, BookOpen, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const CATEGORY_ICONS = [Code2, Sparkles, BriefcaseBusiness, Target, Users, Video, BookOpen, MessageCircle];

type CategoryItem = { id: string; name: string; slug: string; questionCount: number };

export function CategoryCarousel({ categories }: { categories: CategoryItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({ left: direction * Math.min(scroller.clientWidth * 0.8, 600), behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 pr-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category, index) => {
          const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length];
          return (
            <Link
              key={category.id}
              href={`/interview-questions/${category.slug}`}
              className="group block w-[220px] shrink-0 snap-start sm:w-[240px]"
            >
              <Card className="h-full transition-transform hover:-translate-y-1">
                <Icon className="text-coral" size={25} />
                <h3 className="mt-8 font-display text-lg font-bold">{category.name}</h3>
                <p className="mt-2 text-sm text-ink/55">{category.questionCount} interview questions</p>
                <ArrowRight className="mt-6 text-ink/35 transition group-hover:text-coral" size={19} />
              </Card>
            </Link>
          );
        })}
      </div>

      {categories.length > 4 && (
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll categories left"
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink/60 hover:border-coral hover:text-coral"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            aria-label="Scroll categories right"
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink/60 hover:border-coral hover:text-coral"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
