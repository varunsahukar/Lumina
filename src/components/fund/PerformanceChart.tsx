"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface HistoryPoint {
  date: string;
  nav: number;
}

interface PerformanceChartProps {
  history?: HistoryPoint[];
}

export default function PerformanceChart({ history = [] }: PerformanceChartProps) {
  const chartData = history.map((point) => ({
    date: new Date(point.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    nav: point.nav,
  }));

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold">Performance</h2>
      {chartData.length > 1 ? (
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis
                domain={["dataMin", "dataMax"]}
                tick={{ fontSize: 12 }}
                width={64}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="nav"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-muted-foreground mt-2">
          NAV history is not available yet for this fund.
        </p>
      )}
    </div>
  );
}
