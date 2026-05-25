import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Dynamic Desktop Sidebar */}
      <Sidebar />

      {/* Main Page Area */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Mobile Header Bar */}
        <header className="md:hidden flex h-14 items-center justify-between px-6 border-b border-slate-900 bg-slate-950">
          <span className="font-extrabold text-sm tracking-tight bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            LuminaVest
          </span>
        </header>

        {/* Main Page Content Scroll Container */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation bar */}
      <MobileNav />
    </div>
  );
}
