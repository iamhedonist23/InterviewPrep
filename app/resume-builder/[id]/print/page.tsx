import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getOwnedResume, ResumeNotFoundError } from "@/lib/resume";
import { getResumeTemplateComponent } from "@/components/resume/templates";
import { ResumePrintView } from "@/components/resume/resume-print-view";

export const dynamic = "force-dynamic";

export default async function ResumePrintPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?callbackUrl=/resume-builder");

  const { id } = await params;

  try {
    const resume = await getOwnedResume(session.user.id, id);
    const ResumeTemplate = getResumeTemplateComponent(resume.template);
    const returnUrl = `/resume-builder/${resume.id}/preview`;

    return (
      <ResumePrintView resumeId={resume.id} returnUrl={returnUrl}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== "undefined") {
                window.addEventListener("load", () => {
                  window.setTimeout(() => {
                    try {
                      window.print();
                    } catch (error) {
                      // Browsers may block auto print without a user gesture.
                    }
                  }, 500);
                });
              }
            `,
          }}
        />
        <div className="min-h-screen bg-white p-0 print:bg-white print:p-0">
          <div id="resume-print-root">
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
        </div>
      </ResumePrintView>
    );
  } catch (error) {
    if (error instanceof ResumeNotFoundError) notFound();
    throw error;
  }
}
