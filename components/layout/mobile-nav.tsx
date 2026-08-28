"use client";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const links = [["Interview Questions", "/interview-questions"], ["Practice", "/practice"], ["Categories", "/categories"], ["Resources", "/blog"], ["Create Resume", "/resume-builder"], ["About", "/about"]];
export function MobileNav({ signedIn }: { signedIn: boolean }) { const [open, setOpen] = useState(false); return <><div className="flex items-center gap-2 lg:hidden"><Link href="/search" aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full hover:bg-mint"><Search size={19} /></Link><button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-mint">{open ? <X size={21} /> : <Menu size={21} />}</button></div>{open && <nav className="absolute left-0 right-0 top-20 border-t border-ink/10 bg-paper px-5 py-5 shadow-lg lg:hidden" aria-label="Mobile navigation">{links.map(([label, href]) => <Link onClick={() => setOpen(false)} className="block border-b border-ink/10 py-3 font-semibold" href={href} key={href}>{label}</Link>)}<Button href={signedIn ? "/account" : "/login"} className="mt-4 w-full">{signedIn ? "My account" : "Log in"}</Button></nav>}</>; }
