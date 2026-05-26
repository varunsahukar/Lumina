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
      {/* Background radial glow - white/5 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <Navbar />
      <main className="container flex-1 flex flex-col items-center justify-center py-16 relative z-10 text-center space-y-12 animate-fade-in">
        {/* Hero Section */}
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Welcome to LuminaVest
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
            Invest in direct mutual funds with ease. Discover, analyze, and manage your portfolio all in one intelligent wealth platform.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-white hover:bg-neutral-200 text-black font-extrabold px-8 py-6 text-base rounded-xl transition-all">
            <a href="/screener">Explore Funds</a>
          </Button>
          <Button asChild variant="outline" className="bg-transparent border-white/20 hover:bg-white/10 text-white font-bold px-8 py-6 text-base rounded-xl transition-all">
            <a href="/register">Get Started Now</a>
          </Button>
        </div>

        {/* Real-time stats bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full border-t border-neutral-900 pt-12 mt-6">
          <div className="flex flex-col items-center space-y-2 p-4 bg-neutral-950 border border-neutral-900 rounded-2xl">
            <div className="p-2 bg-white/10 rounded-xl text-white">
              <Database className="h-5 w-5" />
            </div>
            <span className="text-2xl font-black text-white">{fundsCount}+</span>
            <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Active Mutual Funds</span>
          </div>

          <div className="flex flex-col items-center space-y-2 p-4 bg-neutral-950 border border-neutral-900 rounded-2xl">
            <div className="p-2 bg-white/10 rounded-xl text-white">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-2xl font-black text-white">{usersCount}+</span>
            <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Registered Investors</span>
          </div>

          <div className="flex flex-col items-center space-y-2 p-4 bg-neutral-950 border border-neutral-900 rounded-2xl">
            <div className="p-2 bg-white/10 rounded-xl text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-2xl font-black text-white">{formattedAum}</span>
            <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Tracked Assets (AUM)</span>
          </div>
        </div>
      </main>
    </div>
  );
}
