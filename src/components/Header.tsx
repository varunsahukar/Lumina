import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">LuminaVest</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium ml-auto">
          <Link href="/funds" className="transition-colors hover:text-foreground/80">
            Funds
          </Link>
          <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
            Dashboard
          </Link>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
