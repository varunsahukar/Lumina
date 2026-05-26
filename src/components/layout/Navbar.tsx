import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  minimal?: boolean;
}

export default function Navbar({ minimal = false }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a1a1a] bg-black h-16">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8 ml-8 md:ml-16">
          <a
            href="/"
            className="flex items-center"
          >
            <span className="font-bold text-xl tracking-tight text-white -mx-[50px]">
              Lumina<span className="text-emerald-400">Vest</span>
            </span>
          </a>

          {!minimal && (
            <nav className="hidden md:flex items-center gap-8">
              <Button asChild variant="ghost" className="text-[#a3a3a3] hover:text-white font-medium transition-colors">
                <a href="/screener">Screener</a>
              </Button>
              <Button asChild variant="ghost" className="text-[#a3a3a3] hover:text-white font-medium transition-colors">
                <a href="/portfolio">Portfolio</a>
              </Button>
              <Button asChild variant="ghost" className="text-[#a3a3a3] hover:text-white font-medium transition-colors">
                <a href="/dashboard">Dashboard</a>
              </Button>
            </nav>
          )}
        </div>

        <a
          href="/login"
          className="inline-flex items-center gap-2 rounded-full bg-white text-black hover:bg-slate-100 text-sm font-semibold px-5 py-2.5 transition-colors -mx-[200px]"
        >
          <span>Sign In</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}
