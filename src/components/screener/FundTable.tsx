import { Button } from "@/components/ui/button";

export default function FundTable() {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-muted-foreground">Fund Table will be here</p>
      <div className="mt-4 flex gap-2">
        <Button>Add to Watchlist</Button>
        <Button>Add to Compare</Button>
      </div>
    </div>
  );
}
