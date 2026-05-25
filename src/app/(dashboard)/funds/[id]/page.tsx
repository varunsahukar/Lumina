import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import FundCard from "@/components/fund/FundCard";
import FundDetail from "@/components/fund/FundDetail";
import PerformanceChart from "@/components/fund/PerformanceChart";
import { Button } from "@/components/ui/button";

export default function FundDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          <div className="container py-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Fund Details: {params.id}</h1>
                <div className="flex gap-2">
                  <Button>Add to Watchlist</Button>
                  <Button>Invest Now</Button>
                </div>
              </div>
              <FundCard />
              <PerformanceChart />
              <FundDetail />
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
