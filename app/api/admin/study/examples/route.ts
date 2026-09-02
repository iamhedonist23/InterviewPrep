import { z } from "zod";
import { requireAdminApi } from "@/lib/admin";
import { studyExampleSchema } from "@/lib/study";
import { invalidateLearnCache } from "@/lib/study-public";
import { createStudyExample } from "@/lib/study";
import { prisma } from "@/lib/prisma";

const idSchema = z.object({ id: z.string().min(1).max(100) });

export async function POST(request: Request) {
  const guard = await requireAdminApi();
  if (guard.response) return guard.response;

  const body: unknown = await request.json();

  try {
    const data = studyExampleSchema.parse(body);
    const result = await createStudyExample(data);
    invalidateLearnCache();
    return Response.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid input.", details: error.flatten() }, { status: 400 });
    }
    return Response.json({ error: "Could not create this record." }, { status: 409 });
  }
}

export async function PATCH(request: Request) {
  const guard = await requireAdminApi();
  if (guard.response) return guard.response;

  const body = await request.json();
  const parsed = idSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: "Invalid record ID." }, { status: 400 });
  }

  const { id } = parsed.data;
  const data = body as Record<string, unknown>;

  try {
    const result = await prisma.studyExample.update({
      where: { id },
      data: {
        language: typeof data.language === "string" ? data.language : undefined,
        code: typeof data.code === "string" ? data.code : undefined,
        explanation: typeof data.explanation === "string" || data.explanation === null ? data.explanation : undefined,
        sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : undefined,
      },
    });
    invalidateLearnCache();
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "Record not found or update failed." }, { status: 404 });
  }
}

export async function DELETE(request: Request) {
  const guard = await requireAdminApi();
  if (guard.response) return guard.response;

  const parsed = idSchema.safeParse(await request.json());

  if (!parsed.success) {
    return Response.json({ error: "Invalid record ID." }, { status: 400 });
  }

  const { id } = parsed.data;

  try {
    await prisma.studyExample.delete({ where: { id } });
    invalidateLearnCache();
    return Response.json({ deleted: true });
  } catch (error) {
    return Response.json({ error: "Record not found or delete failed." }, { status: 404 });
  }
}
