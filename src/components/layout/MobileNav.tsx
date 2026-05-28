import Link from "next/link";

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 grid h-16 grid-cols-3 border-t-[3px] border-black bg-[#f7eee8] md:hidden">
      {[
        { label: "Home", href: "/dashboard" },
        { label: "Screener", href: "/screener" },
        { label: "Portfolio", href: "/portfolio" },
      ].map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="grid place-items-center border-r-[3px] border-black text-xs font-bold uppercase tracking-[0.12em] last:border-r-0"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
