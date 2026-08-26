import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "ADMIN") redirect("/");
  return session;
}

export async function requireAdminApi() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { session: null, response: Response.json({ error: "Authentication required." }, { status: 401 }) };
  if (session.user.role !== "ADMIN") return { session: null, response: Response.json({ error: "Administrator access required." }, { status: 403 }) };
  return { session, response: null };
}
