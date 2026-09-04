import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { listResumes } from "@/lib/resume";
import { Container } from "@/components/ui/container";
import { CreateResumeButton } from "@/components/resume/create-resume-button";
import { DeleteResumeButton } from "@/components/resume/delete-resume-button";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Resume Builder", robots: { index: false, follow: false } };

export default async function ResumeBuilderPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?callbackUrl=/resume-builder");

  const resumes = await listResumes(session.user.id);

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Free forever</p>
            <h1 className="mt-3 font-display text-4xl font-bold">Resume Builder</h1>
            <p className="mt-3 text-ink/60">Create, save, and manage multiple resumes for different roles.</p>
            <p className="mt-1 text-xs text-ink/45">
              Resumes untouched for 7 days are automatically removed — open and save one to keep it around.
            </p>
          </div>
          <CreateResumeButton />
        </div>

        {resumes.length ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <div key={resume.id} className="rounded-2xl border border-ink/10 bg-white/70 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-bold">{resume.title || "Untitled resume"}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">{resume.template} template</p>
                  </div>
                  {resume.isDefault && (
                    <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold">Default</span>
                  )}
                </div>
                <p className="mt-4 text-xs text-ink/50">
                  Last edited {new Date(resume.lastEditedAt).toLocaleDateString()}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <Link href={`/resume-builder/${resume.id}`} className="text-sm font-bold text-coral">
                    Open →
                  </Link>
                  <Link href={`/resume-builder/${resume.id}/preview`} className="text-sm font-bold text-ink/60 hover:text-coral">
                    Preview
                  </Link>
                  <DeleteResumeButton resumeId={resume.id} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-ink/20 p-12 text-center">
            <p className="text-ink/60">You haven&apos;t created a resume yet.</p>
            <div className="mt-5 flex justify-center">
              <CreateResumeButton />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
