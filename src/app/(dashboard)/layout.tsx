import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white overflow-x-hidden">
      {/* Dynamic Desktop Sidebar */}
      <Sidebar />

      {/* Main Page Area */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Mobile Header Bar */}
        <header className="md:hidden flex h-14 items-center justify-between px-6 border-b border-[#1a1a1a] bg-black">
          <span className="font-extrabold text-sm tracking-tight text-white">
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
