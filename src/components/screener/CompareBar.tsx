import { Button } from "@/components/ui/button";

export default function CompareBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 hidden md:block">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">Compare Funds (0/4)</p>
        </div>
        <Button>Compare Selected</Button>
      </div>
    </div>
  );
}
