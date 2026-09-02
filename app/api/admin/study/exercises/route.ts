import { z } from "zod";
import { requireAdminApi } from "@/lib/admin";
import { studyExerciseSchema } from "@/lib/study";
import { createStudyExercise } from "@/lib/study";
import { prisma } from "@/lib/prisma";

const idSchema = z.object({ id: z.string().min(1).max(100) });

export async function POST(request: Request) {
  const guard = await requireAdminApi();
  if (guard.response) return guard.response;

  const body: unknown = await request.json();

  try {
    const data = studyExerciseSchema.parse(body);
    const result = await createStudyExercise(data);
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
    const result = await prisma.studyExercise.update({
      where: { id },
      data: {
        question: typeof data.question === "string" ? data.question : undefined,
		difficulty: typeof data.difficulty === "string" ? (data.difficulty as "EASY" | "MEDIUM" | "HARD") : undefined,
		hint: typeof data.hint === "string" || data.hint === null ? data.hint : undefined,
		solution: typeof data.solution === "string" || data.solution === null ? data.solution : undefined,
		explanation: typeof data.explanation === "string" || data.explanation === null ? data.explanation : undefined,
        sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : undefined,
      },
    });
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
    await prisma.studyExercise.delete({ where: { id } });
    return Response.json({ deleted: true });
  } catch (error) {
    return Response.json({ error: "Record not found or delete failed." }, { status: 404 });
  }
}
