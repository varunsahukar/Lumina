import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { TrendingUp, Users, Database, LineChart } from "lucide-react";

export default async function Home() {
  let fundsCount = 65;
  let usersCount = 12;
  let totalAum = 1245000;

  try {
    fundsCount = await prisma.fund.count();
    usersCount = await prisma.user.count();
    const rawAum = await prisma.fund.aggregate({
      _sum: {
        aum: true,
      },
    });
    if (rawAum._sum.aum) {
      totalAum = Number(rawAum._sum.aum);
    }
  } catch (error) {
    console.error("Failed to load landing page stats from db:", error);
  }

  const formattedAum =
    totalAum > 100000
      ? `₹${(totalAum / 100000).toFixed(2)} Lakh Cr`
      : `₹${totalAum.toLocaleString("en-IN")} Cr`;

  const sampleTickers = [
    { symbol: "NIFTY 50", price: "22,845.30", change: "+0.82%" },
    { symbol: "SENSEX", price: "75,412.10", change: "+0.65%" },
    { symbol: "NIFTY BANK", price: "48,120.55", change: "+1.12%" },
    { symbol: "MIDCAP 150", price: "14,932.40", change: "+1.45%" },
    { symbol: "INDIA VIX", price: "12.84", change: "-3.21%" },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] font-sans">
      <Navbar minimal />

      <main className="container">
        {/* Hero Section */}
        <section className="py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4">
            Trade the{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              markets
            </span>{" "}
            like a quant.
          </h1>
          <p className="text-[#a3a3a3] text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            LuminaVest turns India&apos;s mutual fund universe into a live stock market terminal —
            screen direct plans, backtest strategies, and deploy capital in a matte-black, pro-grade
            console.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button
              asChild
              className="bg-white text-black hover:bg-slate-100 font-semibold px-8 py-6 text-sm rounded-full flex items-center justify-center gap-2"
            >
              <a href="/screener">
                Launch Market Screener
                <TrendingUp className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[#1a1a1a] bg-black hover:bg-[#0a0a0a] text-white font-semibold px-8 py-6 text-sm rounded-full flex items-center justify-center"
            >
              <a href="/register">Create Free Account</a>
            </Button>
          </div>
        </section>

        {/* Section Spacer */}
        <div className="h-20" />

        {/* India Indices Snapshot (Scrolling Ticker) */}
        <section className="mb-20 w-full">
          <div className="flex items-center justify-between mb-4 px-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#a3a3a3]">
            
            </span>
            <span className="text-xs text-[#a3a3a3] font-medium">Live · 15 min delay</span>
          </div>
          <div className="overflow-hidden border-y border-[#1a1a1a] bg-black py-0">
            <div className="flex gap-12 animate-[scrollRightToLeft_30s_linear_infinite]">
              {[...sampleTickers, ...sampleTickers].map((t, idx) => (
                <div
                  key={`${t.symbol}-${idx}`}
                  className="flex flex-col items-start min-w-[140px] flex-shrink-0"
                >
                  <span className="font-semibold text-sm text-white">{t.symbol}</span>
                  <span className="font-bold text-lg text-white mt-0.5">{t.price}</span>
                  <span
                    className={`mt-0.5 font-semibold text-sm ${
                      t.change.startsWith("-") ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {t.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Spacer */}
        <div className="h-20" />

        {/* Direct Plan Flow & Mutual Fund Universe */}
        <section className="flex flex-col items-center mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#a3a3a3] font-semibold mb-1">
                    Direct plan flow
                  </p>
                  <p className="text-xl font-bold text-emerald-400">+₹4.2 Cr</p>
                </div>
                <div className="p-3 rounded-xl border border-[#1a1a1a] text-emerald-400">
                  <LineChart className="h-5 w-5" />
                </div>
              </div>
              <div className="h-24 w-full rounded-xl bg-gradient-to-tr from-emerald-500/10 via-sky-500/5 to-black relative overflow-hidden">
                <div className="absolute inset-x-3 bottom-3 flex items-end gap-1">
                  {[40, 55, 38, 80, 62, 90, 70].map((h, idx) => (
                    <div
                      key={idx}
                      className="flex-1 rounded-full bg-emerald-400"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#a3a3a3] font-semibold mb-1">
                    Mutual fund universe
                  </p>
                  <p className="text-xl font-bold text-white">{fundsCount}+ screened schemes</p>
                </div>
                <div className="p-3 rounded-xl border border-[#1a1a1a] text-white">
                  <Database className="h-5 w-5" />
                </div>
              </div>
              <ul className="space-y-3 text-sm text-[#a3a3a3]">
                <li className="flex items-center justify-between">
                  <span>Equity · Mid / Small Cap baskets</span>
                  <span className="font-semibold text-emerald-400">High Sharpe</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Debt · Roll-down & Gilt ladders</span>
                  <span className="font-semibold text-sky-400">Stable duration</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Hybrid · Balanced advantage</span>
                  <span className="font-semibold text-amber-300">Smart beta</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom Stats Block */}
        <section className="flex flex-col items-center pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl border border-[#1a1a1a] text-white">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#a3a3a3] mb-1">
                    Active Mutual Funds
                  </p>
                  <p className="text-xl font-bold text-white">{fundsCount}+</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl border border-[#1a1a1a] text-white">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#a3a3a3] mb-1">
                    Registered Investors
                  </p>
                  <p className="text-xl font-bold text-white">{usersCount}+</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#1a1a1a] bg-black p-6 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl border border-[#1a1a1a] text-white">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#a3a3a3] mb-1">
                    Tracked Assets (AUM)
                  </p>
                  <p className="text-xl font-bold text-white">{formattedAum}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
