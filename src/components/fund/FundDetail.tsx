export default function FundDetail() {
  return (
    <div className="border rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold">Key Metrics</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
          <p className="font-semibold">1.25</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Alpha</p>
          <p className="font-semibold">0.85</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Beta</p>
          <p className="font-semibold">0.95</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Std Deviation</p>
          <p className="font-semibold">12.5%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Fund Manager</p>
          <p className="font-semibold">John Doe</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Launch Date</p>
          <p className="font-semibold">01 Jan 2020</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8">AI Summary</h2>
      <p className="text-muted-foreground">
        This is a diversified equity fund with a focus on large-cap stocks. It has consistently outperformed its benchmark over the past 3 years with a Sharpe ratio of 1.25, indicating good risk-adjusted returns.
      </p>
    </div>
  );
}
