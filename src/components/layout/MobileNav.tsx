import { Button } from "@/components/ui/button";

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background md:hidden">
      <Button variant="ghost" className="flex flex-col items-center">
        <span>Home</span>
      </Button>
      <Button variant="ghost" className="flex flex-col items-center">
        <span>Screener</span>
      </Button>
      <Button variant="ghost" className="flex flex-col items-center">
        <span>Portfolio</span>
      </Button>
    </nav>
  );
}
