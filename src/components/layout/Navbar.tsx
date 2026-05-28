import { Button } from "@/components/ui/button";
import { ArrowUpRight, LayoutDashboard } from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";

interface NavbarProps {
  minimal?: boolean;
}

export default async function Navbar({ minimal = false }: NavbarProps) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a1a1a] bg-black h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center"
          >
            <span className="font-bold text-xl tracking-tight text-white">
              Lumina<span className="text-emerald-400">Vest</span>
            </span>
          </Link>

          {!minimal && (
            <nav className="hidden md:flex items-center gap-8">
              <Button asChild variant="ghost" className="text-[#a3a3a3] hover:text-white font-medium transition-colors">
                <Link href="/screener">Screener</Link>
              </Button>
              <Button asChild variant="ghost" className="text-[#a3a3a3] hover:text-white font-medium transition-colors">
                <Link href="/portfolio">Portfolio</Link>
              </Button>
              <Button asChild variant="ghost" className="text-[#a3a3a3] hover:text-white font-medium transition-colors">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </nav>
          )}
        </div>

        {isLoggedIn ? (
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black hover:bg-slate-100 text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            <span>Dashboard</span>
            <LayoutDashboard className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black hover:bg-slate-100 text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            <span>Sign In</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </header>
  );
}
