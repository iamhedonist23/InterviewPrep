"use client";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const links = [["Interview Questions", "/interview-questions"], ["Practice", "/practice"], ["Mock Interview", "/mock-interview"], ["Learn", "/learn"], ["Categories", "/categories"], ["Resources", "/blog"], ["Create Resume", "/resume-builder"], ["About", "/about"]];
export function MobileNav({ signedIn }: { signedIn: boolean }) { const [open, setOpen] = useState(false); return <><div className="flex items-center gap-2"><Link href="/search" aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full hover:bg-mint"><Search size={19} aria-hidden="true" /></Link><button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-mint">{open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}</button></div>{open && <nav id="mobile-navigation" className="absolute left-0 right-0 top-20 border-t border-ink/10 bg-paper px-5 py-5 shadow-lg lg:hidden" aria-label="Mobile navigation">{links.map(([label, href]) => <Link onClick={() => setOpen(false)} className="block border-b border-ink/10 py-3 font-semibold" href={href} key={href}>{label}</Link>)}<Button href={signedIn ? "/dashboard" : "/login"} className="mt-4 w-full">{signedIn ? "My dashboard" : "Log in"}</Button></nav>}</>; }
