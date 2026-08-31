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

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
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
      <label className="text-sm font-bold text-paper">
        Password
        <input required name="password" type="password" autoComplete="current-password" className="mt-2 h-12 w-full rounded-xl border border-paper/20 bg-white/5 px-4 font-normal text-paper" />
      </label>
      {error && <p role="alert" className="text-sm font-semibold text-coral">{error}</p>}
      <Button type="submit" disabled={busy} className="bg-coral hover:bg-white hover:text-ink">
        {busy ? "Signing in…" : "Sign in to admin"}
      </Button>
    </form>
  );
}
