import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getOwnedResume, ResumeNotFoundError } from "@/lib/resume";
import { Container } from "@/components/ui/container";
import { ResumeEditorForm } from "@/components/resume/resume-editor-form";
import {
  fromServerEducation,
  fromServerExperience,
  fromServerProjects,
  fromServerSkills,
  fromServerCertifications,
  fromServerAchievements,
  fromServerLanguages,
  fromServerCustomSections,
} from "@/components/resume/section-types";

export const dynamic = "force-dynamic";

export default async function ResumeEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?callbackUrl=/resume-builder");

  const { id } = await params;

  try {
    const resume = await getOwnedResume(session.user.id, id);
    return (
      <section className="py-16">
        <Container>
          <Link href="/resume-builder" className="text-sm font-bold text-coral">
            ← Back to your resumes
          </Link>
          <h1 className="mt-3 font-display text-4xl font-bold">{resume.title}</h1>
          <ResumeEditorForm
            resumeId={resume.id}
            initialTitle={resume.title}
            initialTemplate={resume.template}
            initialPersonalInfo={resume.personalInfo}
            initialEducation={fromServerEducation(resume.education)}
            initialExperience={fromServerExperience(resume.experience)}
            initialProjects={fromServerProjects(resume.projects)}
            initialSkills={fromServerSkills(resume.skills)}
            initialCertifications={fromServerCertifications(resume.certifications)}
            initialAchievements={fromServerAchievements(resume.achievements)}
            initialLanguages={fromServerLanguages(resume.languages)}
            initialCustomSections={fromServerCustomSections(resume.customSections)}
          />
        </Container>
      </section>
    );
  } catch (error) {
    if (error instanceof ResumeNotFoundError) notFound();
    throw error;
  }
}
