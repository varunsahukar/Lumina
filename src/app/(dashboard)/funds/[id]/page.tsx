import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import FundCard from "@/components/fund/FundCard";
import FundDetail from "@/components/fund/FundDetail";
import PerformanceChart from "@/components/fund/PerformanceChart";
import { Button } from "@/components/ui/button";
import { backendFetch, normalizeFund, toNumber } from "@/lib/backend-api";

export default async function FundDetailPage({ params }: { params: { id: string } }) {
  const [fundResult, historyResult] = await Promise.allSettled([
    backendFetch<any>(`/funds/${encodeURIComponent(params.id)}`),
    backendFetch<any[]>(
      `/funds/${encodeURIComponent(params.id)}/history?days=180`
    ),
  ]);

  const fund =
    fundResult.status === "fulfilled" ? normalizeFund(fundResult.value) : null;
  const history =
    historyResult.status === "fulfilled"
      ? historyResult.value.map((point) => ({
          ...point,
          nav: toNumber(point.nav) ?? 0,
        }))
      : [];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          <div className="container py-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                  {fund?.schemeName || `Fund Details: ${params.id}`}
                </h1>
                <div className="flex gap-2">
                  <Button>Add to Watchlist</Button>
                  <Button>Invest Now</Button>
                </div>
              </div>
              {!fund && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                  Unable to load this fund from the backend. Check that the Nest API
                  is running and that this fund id exists.
                </div>
              )}
              <FundCard fund={fund || undefined} />
              <PerformanceChart history={history} />
              <FundDetail fund={fund || undefined} />
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
