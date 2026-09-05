import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rateLimit, requestSizeLimit, tooManyRequests } from "@/lib/request-security";

const contactSchema = z.object({
  name: z.string().trim().max(80).default(""),
  email: z.string().trim().email().max(160),
  issueType: z.string().trim().min(2).max(100),
  pageUrl: z.string().trim().url().max(500).or(z.literal("")),
  message: z.string().trim().min(10).max(5000),
  suggestedCorrection: z.string().trim().max(5000).default(""),
  website: z.string().max(0).default(""),
});

export async function POST(request: Request) {
  const limiter = rateLimit(request, "contact", 5, 15 * 60 * 1000);
  if (!limiter.allowed) return tooManyRequests(limiter.retryAfter);
  if (!requestSizeLimit(request)) return Response.json({ error: "Request is too large." }, { status: 413 });

  try {
    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ error: "Please provide a valid email, issue type, and message." }, { status: 400 });
    if (parsed.data.website) return Response.json({ message: "Thanks. Your message was sent." }, { status: 201 });

    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name || "Website visitor",
        email: parsed.data.email.toLowerCase(),
        subject: `Website feedback: ${parsed.data.issueType}`,
        message: `${parsed.data.pageUrl ? `Page URL: ${parsed.data.pageUrl}\n\n` : ""}${parsed.data.message}${parsed.data.suggestedCorrection ? `\n\nSuggested correction:\n${parsed.data.suggestedCorrection}` : ""}`,
      },
    });
    return Response.json({ message: "Thanks. Your message was sent to InstantInterviewPrep." }, { status: 201 });
  } catch {
    return Response.json({ error: "We could not send your message right now. Please email instantinterviewprep@gmail.com instead." }, { status: 500 });
  }
}
