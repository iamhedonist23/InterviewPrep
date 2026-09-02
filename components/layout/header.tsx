import { CircleUserRound, Search } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { authOptions } from "@/lib/auth";

const links = [["Learn", "/learn"], ["Interview Questions", "/interview-questions"], ["Practice", "/practice"], ["Mock Interview", "/mock-interview"], ["Categories", "/categories"], ["Resources", "/blog"], ["About", "/about"]];
export async function Header() { const session = await getServerSession(authOptions); return <header className="border-b border-ink/10 bg-paper/90 backdrop-blur"><Container className="relative flex h-20 items-center justify-between gap-6"><Link href="/" className="font-display text-xl font-bold tracking-tight">Interview<span className="text-coral">Prep</span></Link><nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">{links.map(([label, href]) => <Link className="text-sm font-semibold text-ink/70 hover:text-coral" href={href} key={href}>{label}</Link>)}</nav><div className="hidden items-center gap-2 lg:flex">{!session ? <Button href="/login" variant="outline">Log in</Button> : <Link href="/dashboard" aria-label="Go to your dashboard" title="Your dashboard" className="grid h-10 w-10 place-items-center rounded-full bg-mint hover:bg-coral hover:text-white"><CircleUserRound size={21} /></Link>}</div><div className="flex items-center gap-2 lg:hidden"><Link href="/search" aria-label="Search" className="hidden h-10 w-10 place-items-center rounded-full hover:bg-mint sm:grid"><Search size={19} /></Link><MobileNav signedIn={Boolean(session)} /></div></Container></header>; }
