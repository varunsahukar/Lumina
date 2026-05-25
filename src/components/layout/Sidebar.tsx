import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-60 md:flex-col md:border-r">
      <div className="flex h-14 items-center px-6">
        <Link href="/" className="font-bold text-xl">
          LuminaVest
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-2">
        <Link
          href="/dashboard"
          className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="/screener"
          className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          Screener
        </Link>
        <Link
          href="/portfolio"
          className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          Portfolio
        </Link>
        <Link
          href="/reports"
          className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          Reports
        </Link>
      </nav>
    </aside>
  );
}
