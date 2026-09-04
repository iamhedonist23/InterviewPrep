import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PracticeSetup } from "@/components/practice/practice-setup";
import { getCachedPublicCategories } from "@/lib/public-content";
export const revalidate = 1800;
export const metadata: Metadata = { title: "Practice", description: "Practice interview questions for free, choose a category and difficulty, and build confidence one question at a time.", alternates: { canonical: "/practice" } };
export default async function PracticePage() { const categories = (await getCachedPublicCategories()).map(({ id, name, slug }) => ({ id, name, slug })); return <section className="py-16 sm:py-20"><Container><div className="mx-auto max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Free practice room</p><h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Practice with a little structure.</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-ink/60">Choose a focus, write your answer, and build confidence one question at a time. You can practice without an account.</p><div className="mt-10"><PracticeSetup categories={categories} /></div></div></Container></section>; }
