import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">LuminaVest</span>
          </a>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6 ml-auto">
          <Button asChild variant="ghost">
            <a href="/screener">Screener</a>
          </Button>
          <Button asChild variant="ghost">
            <a href="/portfolio">Portfolio</a>
          </Button>
          <Button asChild>
            <a href="/login">Sign In</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
