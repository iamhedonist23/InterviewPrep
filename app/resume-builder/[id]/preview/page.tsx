import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getOwnedResume, ResumeNotFoundError } from "@/lib/resume";
import { getResumeTemplateComponent } from "@/components/resume/templates";
import { DownloadPdfButton } from "@/components/resume/download-pdf-button";

export const dynamic = "force-dynamic";

export default async function ResumePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?callbackUrl=/resume-builder");

  const { id } = await params;

  try {
    const resume = await getOwnedResume(session.user.id, id);
    const ResumeTemplate = getResumeTemplateComponent(resume.template);
    return (
      <div className="min-h-screen bg-paper/60 py-10 print:bg-white print:py-0">
        <div className="mx-auto mb-6 flex max-w-[8.5in] items-center justify-between px-4 print:hidden">
          <Link href={`/resume-builder/${resume.id}`} className="text-sm font-bold text-coral">
            ← Back to editor
          </Link>
          <DownloadPdfButton />
        </div>

        <ResumeTemplate
          title={resume.title}
          personalInfo={resume.personalInfo}
          education={resume.education}
          experience={resume.experience}
          projects={resume.projects}
          skills={resume.skills}
          certifications={resume.certifications}
          achievements={resume.achievements}
          languages={resume.languages}
          customSections={resume.customSections}
        />
      </div>
    );
  } catch (error) {
    if (error instanceof ResumeNotFoundError) notFound();
    throw error;
  }
}
