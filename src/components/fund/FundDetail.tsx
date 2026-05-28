import type { Fund } from "@/store/useStore";

interface FundDetailProps {
  fund?: Fund & {
    launchDate?: string | null;
    benchmarkIndex?: string | null;
  };
}

const formatMetric = (value: number | null | undefined, suffix = "") => {
  if (value === null || value === undefined) return "N/A";
  return `${value.toFixed(2)}${suffix}`;
};

const formatPercent = (value: number | null | undefined) => {
  if (value === null || value === undefined) return "N/A";
  return `${(value * 100).toFixed(2)}%`;
};

export default function FundDetail({ fund }: FundDetailProps) {
  return (
    <div className="border rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold">Key Metrics</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
          <p className="font-semibold">{formatMetric(fund?.sharpeRatio)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Alpha</p>
          <p className="font-semibold">{formatMetric(fund?.alpha)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Beta</p>
          <p className="font-semibold">{formatMetric(fund?.beta)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Std Deviation</p>
          <p className="font-semibold">{formatPercent(fund?.stdDeviation)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Fund Manager</p>
          <p className="font-semibold">{fund?.managerName || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Launch Date</p>
          <p className="font-semibold">
            {fund?.launchDate
              ? new Date(fund.launchDate).toLocaleDateString("en-IN")
              : "N/A"}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8">AI Summary</h2>
      <p className="text-muted-foreground">
        {fund
          ? `${fund.schemeName} is a ${fund.category} fund from ${fund.amcName || "its AMC"}. Current NAV is ${fund.nav.toFixed(2)}, with ${formatPercent(fund.returns3y)} 3-year returns where available.`
          : "Real fund data will appear here once the backend returns this fund."}
      </p>
    </div>
  );
}
