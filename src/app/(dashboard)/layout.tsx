import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import { AgencyLogo } from "@/components/agency/AgencyPrimitives";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="agency-page flex min-h-screen overflow-x-hidden">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-20 items-center justify-between border-b-[3px] border-black bg-[#f7eee8] px-5 dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b] md:hidden">
          <AgencyLogo />
          <ThemeToggle compact />
        </header>

        <main className="flex-1 pb-20 md:pb-0">
          <div className="mx-auto w-full max-w-[1680px] px-5 py-8 md:px-10 lg:px-14">
            {children}
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
