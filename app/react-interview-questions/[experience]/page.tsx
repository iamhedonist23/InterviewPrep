import type { Metadata } from "next";
import { TechnologyExperiencePage, technologyExperienceMetadata } from "@/components/questions/experience-page";
import type { ExperienceSlug } from "@/lib/experience-seo";

export const revalidate = 1800;
type Props = { params: Promise<{ experience: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { experience } = await params; return technologyExperienceMetadata("react-developer", experience as ExperienceSlug); }
export default async function ReactExperiencePage({ params }: Props) { const { experience } = await params; return <TechnologyExperiencePage technologySlug="react-developer" publicSlug="react" experience={experience as ExperienceSlug} />; }
