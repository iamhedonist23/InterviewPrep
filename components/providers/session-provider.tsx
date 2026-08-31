"use client";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

// next-auth/react's client functions (signOut, signIn, useSession) require a
// SessionProvider mounted somewhere in the tree in the App Router — without
// it, calls like signOut() can silently fail to complete instead of throwing
// a visible error, which is exactly the "logout button does nothing" bug
// this fixes. RootLayout itself must stay a Server Component, so this
// wrapper exists purely to give SessionProvider a client boundary to live in.
export function SessionProvider({ children }: { children: ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}