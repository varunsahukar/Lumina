import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import FundTable from "@/components/screener/FundTable";
import FilterPanel from "@/components/screener/FilterPanel";
import CompareBar from "@/components/screener/CompareBar";

export default function ScreenerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          <div className="container py-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Fund Screener</h1>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <FilterPanel />
                </div>
                <div className="lg:col-span-3">
                  <FundTable />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <CompareBar />
      <MobileNav />
    </div>
  );
}
