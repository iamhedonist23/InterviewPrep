"use client";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(formData: FormData) {
    setBusy(true);
    setError("");

    const password = String(formData.get("password") ?? "");
    const adminToken = String(formData.get("adminToken") ?? "");
    if (!password && !adminToken) {
      setError("Enter your password or admin token.");
      setBusy(false);
      return;
    }

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password,
      adminToken,
      redirect: false,
    });

    if (result?.error) {
      setError("Email or password is incorrect.");
      setBusy(false);
      return;
    }

    // Confirm this account actually has admin access before redirecting, so
    // a valid-but-non-admin login gets a clear message here instead of a
    // silent bounce back from the server-side admin guard. This is purely
    // for a better error message — requireAdmin()/requireAdminApi() remain
    // the actual enforcement no matter what happens client-side.
    const session = await getSession();
    if (session?.user?.role !== "ADMIN") {
      setError("This account does not have administrator access.");
      setBusy(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <form action={submit} className="grid gap-5">
      <label className="text-sm font-bold text-paper">
        Email
        <input required name="email" type="email" autoComplete="email" className="mt-2 h-12 w-full rounded-xl border border-paper/20 bg-white/5 px-4 font-normal text-paper" />
      </label>
      <div className="border-t border-paper/10 pt-5">
        <label className="text-sm font-bold text-paper">
          Admin token
          <input name="adminToken" type="password" autoComplete="one-time-code" className="mt-2 h-12 w-full rounded-xl border border-paper/20 bg-white/5 px-4 font-normal text-paper" />
        </label>
        <p className="mt-2 text-xs text-paper/50">Use the configured admin token instead of a password.</p>
      </div>
      <label className="text-sm font-bold text-paper">
        Password
        <input name="password" type="password" autoComplete="current-password" className="mt-2 h-12 w-full rounded-xl border border-paper/20 bg-white/5 px-4 font-normal text-paper" />
      </label>
      {error && <p role="alert" className="text-sm font-semibold text-coral">{error}</p>}
      <Button type="submit" disabled={busy} className="bg-coral hover:bg-white hover:text-ink">
        {busy ? "Signing in…" : "Sign in to admin"}
      </Button>
    </form>
  );
}
