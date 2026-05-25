import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      <Navbar />
      <main className="container flex-1 flex flex-col items-center justify-center py-20 relative z-10 text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-100">
            Welcome to <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">LuminaVest</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Invest in direct mutual funds with ease. Discover, analyze, and manage your portfolio all in one intelligent wealth platform.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 hover:text-slate-950 font-extrabold px-8 py-6 text-base rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.2)] transition-all">
            <a href="/screener">Explore Funds</a>
          </Button>
          <Button asChild variant="outline" className="bg-slate-900/60 border-slate-700 hover:bg-slate-800 text-slate-200 font-bold px-8 py-6 text-base rounded-xl backdrop-blur-sm transition-all">
            <a href="/register">Get Started Now</a>
          </Button>
        </div>
      </main>
    </div>
  );
}
