import type { Metadata } from "next";
import { ExperiencePage, experienceMetadata } from "@/components/questions/experience-page";

export const revalidate = 1800;
export async function generateMetadata(): Promise<Metadata> { return experienceMetadata("mid-level"); }
export default function MidLevelInterviewQuestionsPage() { return <ExperiencePage experience="mid-level" />; }
