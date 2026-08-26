"use client";
import { signOut } from "next-auth/react";
export function LogoutButton() { return <button type="button" onClick={() => signOut({ callbackUrl: "/" })} className="text-sm font-bold text-ink/60 hover:text-coral">Log out</button>; }
