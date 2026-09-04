import type { Metadata } from "next";
import { ExperiencePage, experienceMetadata } from "@/components/questions/experience-page";

export const revalidate = 1800;
export async function generateMetadata(): Promise<Metadata> { return experienceMetadata("experienced"); }
export default function ExperiencedInterviewQuestionsPage() { return <ExperiencePage experience="experienced" />; }
