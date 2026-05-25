import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { TrendingUp, Users, Database } from "lucide-react";

export default async function Home() {
  // Fetch real statistics from database
  let fundsCount = 65;
  let usersCount = 12;
  let totalAum = 1245000;

  try {
    fundsCount = await prisma.fund.count();
    usersCount = await prisma.user.count();
    const rawAum = await prisma.fund.aggregate({
      _sum: {
        aum: true
      }
    });
    if (rawAum._sum.aum) {
      totalAum = Number(rawAum._sum.aum);
    }
  } catch (error) {
    console.error("Failed to load landing page stats from db:", error);
  }

  // Format AUM
  const formattedAum = totalAum > 100000 
    ? `₹${(totalAum / 100000).toFixed(2)} Lakh Cr` 
    : `₹${(totalAum).toLocaleString("en-IN")} Cr`;

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      <Navbar />
      <main className="container flex-1 flex flex-col items-center justify-center py-16 relative z-10 text-center space-y-12 animate-fade-in">
        {/* Hero Section */}
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Welcome to <span className="text-white">LuminaVest</span>
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
            Invest in direct mutual funds with ease. Discover, analyze, and manage your portfolio all in one intelligent wealth platform.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 hover:text-slate-950 font-extrabold px-8 py-6 text-base rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.2)] transition-all">
            <a href="/screener">Explore Funds</a>
          </Button>
          <Button asChild variant="outline" className="bg-slate-900/60 border-slate-700 hover:bg-slate-800 text-slate-200 font-bold px-8 py-6 text-base rounded-xl backdrop-blur-sm transition-all">
            <a href="/register">Get Started Now</a>
          </Button>
        </div>

        {/* Real-time stats bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full border-t border-slate-900 pt-12 mt-6">
          <div className="flex flex-col items-center space-y-2 p-4 bg-slate-900/20 border border-slate-900 rounded-2xl">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Database className="h-5 w-5" />
            </div>
            <span className="text-2xl font-black text-white">{fundsCount}+</span>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Mutual Funds</span>
          </div>

          <div className="flex flex-col items-center space-y-2 p-4 bg-slate-900/20 border border-slate-900 rounded-2xl">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-2xl font-black text-white">{usersCount}+</span>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Registered Investors</span>
          </div>

          <div className="flex flex-col items-center space-y-2 p-4 bg-slate-900/20 border border-slate-900 rounded-2xl">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-2xl font-black text-white">{formattedAum}</span>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Tracked Assets (AUM)</span>
          </div>
        </div>
      </main>
    </div>
  );
}
