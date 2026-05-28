import type { Fund } from "@/store/useStore";

interface FundCardProps {
  fund?: Fund & {
    changePercent?: number | null;
    currency?: string;
  };
}

const formatCurrency = (value: number | null | undefined, currency = "INR") => {
  if (value === null || value === undefined) return "N/A";
  const symbol = currency === "INR" ? "₹" : "$";
  return `${symbol}${value.toFixed(2)}`;
};

const formatPercent = (value: number | null | undefined) => {
  if (value === null || value === undefined) return "N/A";
  return `${(value * 100).toFixed(2)}%`;
};

const formatAum = (value: number | null | undefined, currency = "INR") => {
  if (!value) return "N/A";
  const symbol = currency === "INR" ? "₹" : "$";
  if (value >= 1000) return `${symbol}${(value / 1000).toFixed(2)}K Cr`;
  return `${symbol}${value.toFixed(1)} Cr`;
};

export default function FundCard({ fund }: FundCardProps) {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold">
        {fund?.schemeName || "Fund Information"}
      </h2>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">NAV</p>
          <p className="font-semibold">
            {formatCurrency(fund?.nav, fund?.currency)}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">1Y Return</p>
          <p className="font-semibold text-green-600">
            {formatPercent(fund?.returns1y)}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Expense Ratio</p>
          <p className="font-semibold">{formatPercent(fund?.expenseRatio)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">AUM</p>
          <p className="font-semibold">{formatAum(fund?.aum, fund?.currency)}</p>
        </div>
      </div>
    </div>
  );
}
