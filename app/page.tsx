import type { Metadata } from "next";
import { ArrowRight, BookOpen, Check, ChevronRight, Code2, MessageCircle, Search, Sparkles, Target, Users, Video } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { CategoryCarousel } from "@/components/home/category-carousel";
import { getCachedHomepagePublicContent } from "@/lib/public-content";

export const revalidate = 1800;
export const metadata: Metadata = {
  title: "Interview Questions & Answers for Every Career | InstantInterviewPrep",
  description:
    "Practice 3,000+ interview questions and answers for software development, Java, Python, SQL, React, DevOps, data science, behavioral interviews, sales, and more. Prepare for your next interview for free.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Interview Questions & Answers for Every Career | InstantInterviewPrep",
    description:
      "Practice interview questions and answers for technical, behavioral, and career interviews. Prepare for your next interview for free.",
    type: "website",
    url: "/",
    siteName: "InstantInterviewPrep",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "InstantInterviewPrep interview questions and answers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interview Questions & Answers for Every Career | InstantInterviewPrep",
    description:
      "Practice interview questions and answers for technical, behavioral, and career interviews for free.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

const levels = [
  { label: "Fresher", value: "FRESHER" },
  { label: "Internship", value: "INTERNSHIP" },
  { label: "Mid-level", value: "MID_LEVEL" },
  { label: "Experienced", value: "EXPERIENCED" },
];
const interviewTypes = [
  ["Technical", "TECHNICAL", Code2, "Show how you think through technical problems."],
  ["Behavioral", "BEHAVIORAL", Users, "Shape clear stories from your real experience."],
  ["Case study", "CASE_STUDY", Target, "Practice structured thinking for open-ended prompts."],
  ["Situational", "SITUATIONAL", Video, "Walk through how you'd handle a real workplace scenario."],
] as const;

export default async function Home() {
  const { categoriesWithCounts, popularQuestions, resources: cachedResources, learnCategories, faqs } = await getCachedHomepagePublicContent();
  const resources = cachedResources.map((article) => ({ ...article, publishedAt: article.publishedAt ? new Date(String(article.publishedAt)) : null }));
  const homepageFaq = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;
  const categories = categoriesWithCounts
    .map((category) => ({ id: category.id, name: category.name, slug: category.slug, description: category.description, questionCount: category._count.questions }));

  return <>
  {homepageFaq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaq) }} />}
  <section className="overflow-hidden border-b border-ink/10"><Container className="grid min-h-[610px] items-center gap-12 py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-24"><div><Badge>100% free, always</Badge><h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">Prepare smarter.<br /><span className="text-coral">Interview</span> with confidence.</h1><p className="mt-7 max-w-xl text-lg leading-8 text-ink/65">Practice interview questions, improve your answers, and prepare for your next job, completely free.</p><div className="mt-9 flex flex-wrap gap-3"><Button href="/practice">Start Practicing <ArrowRight size={17} /></Button><Button href="/interview-questions" variant="outline">Explore Questions</Button></div></div><div className="relative"><div className="absolute -inset-5 rounded-[3rem] bg-mint/60 blur-2xl" /><Card className="relative rotate-1 bg-white p-7 shadow-xl shadow-ink/10"><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-widest text-ink/50">Today&apos;s practice</span><span className="text-sm font-bold text-coral">03 / 10</span></div><div className="mt-5 h-2 rounded-full bg-mint"><div className="h-full w-[30%] rounded-full bg-coral" /></div><p className="mt-10 font-display text-2xl font-bold leading-tight">Tell me about a project you&apos;re proud of.</p><p className="mt-5 text-sm leading-6 text-ink/55">A strong answer connects your actions to a clear outcome. Keep your story focused and specific.</p><div className="mt-8 rounded-xl border border-ink/10 bg-paper p-4 text-sm text-ink/60">Your answer appears here...</div><div className="mt-5 flex justify-end"><Button href="/practice">Next question <ChevronRight size={17} /></Button></div></Card></div></Container></section>
  <section className="bg-ink py-5"><Container className="flex flex-wrap items-center justify-between gap-4"><p className="text-sm font-semibold text-paper">Find your next question</p><form action="/search" className="flex min-w-[min(100%,420px)] flex-1 gap-2 sm:max-w-xl"><label className="sr-only" htmlFor="question-search">Search interview questions</label><input id="question-search" name="q" placeholder="Try “Tell me about yourself”" className="h-11 min-w-0 flex-1 rounded-full bg-paper px-5 text-sm text-ink outline-none" /><button className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral text-white" aria-label="Search"><Search size={18} /></button></form></Container></section>
  <Section eyebrow="Start with what matters" title="Popular Interview Questions">
    <p className="max-w-2xl text-lg leading-8 text-ink/60">Practice interview questions organized by role, technology, and experience level.</p>
    {categories.length ? (
      <CategoryCarousel categories={categories} />
    ) : (
      <Card className="border-dashed bg-transparent">
        <p className="text-ink/60">Browse the interview question library to choose a role or topic.</p>
      </Card>
    )}
    <Button href="/interview-questions" variant="text" className="mt-6 px-0">View All Interview Questions <ArrowRight size={16} /></Button>
  </Section>
  <Section className="bg-mint/60" eyebrow="A path for every career stage" title="Choose your experience level"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{levels.map(level => <Button key={level.value} href={`/interview-questions?experience=${level.value}`} variant="outline" className="justify-between border-ink/15 bg-paper px-5">{level.label}<ArrowRight size={16} /></Button>)}</div></Section>
  <Section eyebrow="Different formats, same preparation" title="Practice the interview you are walking into"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{interviewTypes.map(([name, typeValue, Icon, text]) => <Link key={name} href={`/interview-questions?type=${typeValue}`} className="group block"><Card className="h-full transition-transform hover:-translate-y-1"><Icon className="text-coral" size={23} /><h3 className="mt-6 font-display text-lg font-bold">{name}</h3><p className="mt-2 text-sm leading-6 text-ink/60">{text}</p><ArrowRight className="mt-5 text-ink/35 transition group-hover:text-coral" size={17} /></Card></Link>)}</div></Section>
  <Section className="bg-white/60" eyebrow="Built for real preparation" title="Useful from the first question"><div className="grid gap-6 md:grid-cols-3">{[[BookOpen, "Know what good looks like", "Every question will pair naturally with guidance, so you can learn the shape of a strong answer."], [MessageCircle, "Practice in your own voice", "Use prompts as a starting point, then write answers that sound like you, not a script."], [Sparkles, "Keep it completely free", "The core preparation experience stays accessible to every student, candidate, and career changer."]].map(([Icon, title, text]) => <div key={title as string} className="flex gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint"><Icon size={20} /></div><div><h3 className="font-display text-lg font-bold">{title as string}</h3><p className="mt-2 leading-7 text-ink/60">{text as string}</p></div></div>)}</div></Section>
  <Section eyebrow="A place to begin" title="Fresh Interview Questions">{popularQuestions.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{popularQuestions.map(question => <Card key={question.id} className="flex h-full flex-col"><p className="text-xs font-bold uppercase tracking-widest text-coral">{question.category.name}</p><h3 className="mt-4 font-display text-xl font-bold leading-tight"><Link href={`/questions/${question.slug}`} className="hover:text-coral">{question.question}</Link></h3><p className="mt-3 flex-1 text-sm leading-7 text-ink/60">{question.shortDescription}</p><Link href={`/questions/${question.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-coral">Practice this question <ArrowRight size={16} /></Link></Card>)}</div> : <p className="text-ink/60">Browse the interview question library to choose a role or topic.</p>}<Button href="/interview-questions" variant="text" className="mt-6 px-0">View All Interview Questions <ArrowRight size={16} /></Button></Section>
  <Section eyebrow="Build understanding" title="Learn Interview Concepts"><p className="max-w-2xl text-lg leading-8 text-ink/60">Build strong fundamentals with structured learning paths and detailed topic explanations.</p>{learnCategories.length ? <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{learnCategories.slice(0, 6).map(category => <Link key={category.id} href={`/learn/${category.slug}`} className="group block"><Card className="h-full transition-transform hover:-translate-y-1"><BookOpen className="text-coral" size={23} /><h3 className="mt-5 font-display text-xl font-bold">{category.name}</h3>{category.description && <p className="mt-2 text-sm leading-6 text-ink/60">{category.description}</p>}<p className="mt-5 text-xs font-bold uppercase tracking-widest text-ink/40">{category._count.topics} {category._count.topics === 1 ? "topic" : "topics"}</p><ArrowRight className="mt-5 text-ink/35 transition group-hover:text-coral" size={17} /></Card></Link>)}</div> : <p className="mt-8 text-ink/60">Explore the interview question library to build your preparation fundamentals.</p>}<Button href="/learn" variant="text" className="mt-6 px-0">Explore all learning paths <ArrowRight size={16} /></Button></Section>
  <Section className="bg-mint/40" eyebrow="Keep learning between sessions" title="Latest Interview Resources"><p className="max-w-2xl text-lg leading-8 text-ink/60">Practical guides, tips, and resources to help you prepare for your next interview.</p>{resources.length ? <div className="mt-8 grid gap-5 md:grid-cols-3">{resources.map(article => <article className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white/70 p-6" key={article.id}><p className="text-xs font-bold uppercase tracking-widest text-coral">{article.category?.name ?? "Interview resource"}</p><h3 className="mt-4 font-display text-xl font-bold leading-tight"><Link href={`/blog/${article.slug}`} className="hover:text-coral">{article.title}</Link></h3><p className="mt-3 flex-1 text-sm leading-7 text-ink/60">{article.excerpt}</p>{article.publishedAt && <time dateTime={article.publishedAt.toISOString()} className="mt-5 text-xs font-bold uppercase tracking-widest text-ink/40">{article.publishedAt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>}<Link href={`/blog/${article.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-coral">Read resource <ArrowRight size={16} /></Link></article>)}</div> : <p className="mt-8 text-ink/60">Browse the resource center for practical interview guidance.</p>}<Button href="/blog" variant="text" className="mt-6 px-0">View All Resources <ArrowRight size={16} /></Button></Section>
  <Section eyebrow="Questions are welcome" title="Frequently asked questions">{faqs.length ? <div className="grid gap-4 md:grid-cols-3">{faqs.map(faq => <details key={faq.id} className="rounded-2xl border border-ink/10 bg-white/70 p-5"><summary className="cursor-pointer font-display text-lg font-bold">{faq.question}</summary><p className="mt-3 leading-7 text-ink/70">{faq.answer}</p></details>)}</div> : <p className="text-ink/60">Have a question about practice, learning, or your account? <Link href="/contact" className="font-bold text-coral">Contact the InterviewPrep team</Link>.</p>}<Button href="/faq" variant="text" className="mt-6 px-0">Visit the FAQ <ArrowRight size={16} /></Button></Section>
  <Section eyebrow="A little structure goes a long way" title="How it works"><div className="grid gap-8 md:grid-cols-3">{[[BookOpen, "Choose a focus", "Pick a role, experience level, or interview type to make practice relevant."], [Target, "Build your answer", "Read what interviewers look for, then write an answer in your own words."], [Check, "Get sharper", "Return often, explore a new category, and build calm through repetition."]].map(([Icon, title, text], i) => <div key={title as string} className="border-t-2 border-coral pt-5"><span className="font-display text-4xl font-bold text-ink/15">0{i + 1}</span><h3 className="mt-8 font-display text-xl font-bold">{title as string}</h3><p className="mt-3 leading-7 text-ink/60">{text as string}</p></div>)}</div></Section>
  <section className="pb-20"><Container><div className="rounded-3xl bg-coral px-7 py-12 text-white sm:px-14"><h2 className="max-w-xl font-display text-3xl font-bold sm:text-4xl">The best preparation is the kind you can actually keep doing.</h2><p className="mt-4 max-w-lg leading-7 text-white/80">No paywalls. No pressure. Just a clear place to practice before your next opportunity.</p><Button href="/practice" className="mt-7 bg-ink text-paper hover:bg-white hover:text-ink">Begin a practice session <ArrowRight size={17} /></Button></div></Container></section>
</>;
}
