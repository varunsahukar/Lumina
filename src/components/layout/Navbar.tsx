import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-extrabold text-xl tracking-tight text-slate-100">
              Lumina<span className="text-emerald-400">Vest</span>
            </span>
          </a>
        </div>
        <nav className="flex items-center space-x-2 ml-auto">
          <Button asChild variant="ghost" className="text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10 font-bold transition-all">
            <a href="/screener">Screener</a>
          </Button>
          <Button asChild variant="ghost" className="text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10 font-bold transition-all">
            <a href="/portfolio">Portfolio</a>
          </Button>
          <Button asChild variant="ghost" className="text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10 font-bold transition-all">
            <a href="/dashboard">Dashboard</a>
          </Button>
          <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold ml-2 rounded-xl">
            <a href="/login">Sign In</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
