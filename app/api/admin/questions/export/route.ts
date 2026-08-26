import { requireAdminApi } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { IMPORT_HEADERS } from "@/lib/question-import";

export const runtime = "nodejs";
const csvCell = (value: unknown) => { const text = Array.isArray(value) ? JSON.stringify(value) : String(value ?? ""); return `"${text.replace(/"/g, '""')}"`; };
export async function GET() { const guard = await requireAdminApi(); if (guard.response) return guard.response; const questions = await prisma.interviewQuestion.findMany({ include: { category: true, subcategory: true }, orderBy: [{ category: { name: "asc" } }, { createdAt: "asc" }] }); const rows = questions.map(item => [item.question, item.slug, item.category.name, item.subcategory?.name ?? "", item.experienceLevel, item.difficulty, item.interviewType, item.shortDescription, item.explanation, item.sampleAnswer, item.keyPoints, item.commonMistakes, item.followUpQuestions, item.tags, item.seoTitle ?? "", item.seoDescription ?? "", item.isPublished]); const csv = [IMPORT_HEADERS.join(","), ...rows.map(row => row.map(csvCell).join(","))].join("\r\n") + "\r\n"; return new Response(csv, { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": "attachment; filename=interviewprep-questions.csv", "cache-control": "private, no-store" } }); }
