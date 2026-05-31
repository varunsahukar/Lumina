import Link from "next/link";
import { ArrowUpRight, BarChart3, Building2, LineChart, WalletCards } from "lucide-react";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

export type InstrumentKind = "fund" | "stock";

export interface InstrumentPreviewStat {
  label: string;
  value: string;
  note?: string;
  tone?: "default" | "positive" | "warning";
}

export interface InstrumentHistoryPoint {
  label: string;
  value: number;
  displayValue?: string;
}

export interface InstrumentPreviewCardProps {
  kind: InstrumentKind;
  name: string;
  ticker?: string;
  issuer?: string;
  category?: string;
  description?: string;
  priceLabel?: string;
  priceValue?: string;
  stats: InstrumentPreviewStat[];
  history: InstrumentHistoryPoint[];
  historyLabel?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}

const kindMeta: Record<
  InstrumentKind,
  { label: string; icon: ComponentType<{ className?: string }> }
> = {
  fund: { label: "Mutual fund", icon: WalletCards },
  stock: { label: "Stock", icon: Building2 },
};

export default function InstrumentPreviewCard({
  kind,
  name,
  ticker,
  issuer,
  category,
  description,
  priceLabel = kind === "stock" ? "Last price" : "Current NAV",
  priceValue = "Awaiting data",
  stats,
  history,
  historyLabel = kind === "stock" ? "Revenue history" : "Fund history",
  actionHref,
  actionLabel = "Open details",
  className,
}: InstrumentPreviewCardProps) {
  const meta = kindMeta[kind];
  const Icon = meta.icon;
  const maxHistoryValue = Math.max(...history.map((point) => point.value), 0);

  return (
    <article className={cn("instrument-preview", className)}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="instrument-preview-badge">
              <Icon className="h-4 w-4" />
              {meta.label}
            </span>
            {ticker ? <span className="instrument-preview-code">{ticker}</span> : null}
          </div>
          <h3 className="text-2xl font-black leading-tight text-[var(--landing-ink)]">
            {name}
          </h3>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--landing-muted)]">
            {[issuer, category].filter(Boolean).join(" / ") || "Details updating"}
          </p>
        </div>

        <div className="instrument-preview-price">
          <p>{priceLabel}</p>
          <strong>{priceValue}</strong>
        </div>
      </div>

      {description ? (
        <p className="mt-5 text-sm font-semibold leading-6 text-[var(--landing-muted)]">
          {description}
        </p>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="instrument-preview-stat">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.1em] text-[var(--landing-muted)]">
              {stat.label}
            </p>
            <strong
              className={cn(
                "mt-2 block truncate text-xl font-black text-[var(--landing-ink)]",
                stat.tone === "positive" && "text-[var(--landing-teal)]",
                stat.tone === "warning" && "text-[var(--landing-red)]",
              )}
            >
              {stat.value}
            </strong>
            {stat.note ? (
              <span className="mt-2 block text-[0.68rem] font-bold uppercase text-[var(--landing-muted)]">
                {stat.note}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-6 border-t-2 border-[var(--landing-line)] pt-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--landing-muted)]">
            {historyLabel}
          </p>
          <BarChart3 className="h-5 w-5 text-[var(--landing-red)]" />
        </div>

        {history.length > 0 ? (
          <div className="instrument-preview-bars">
            {history.map((point, index) => {
              const width = maxHistoryValue > 0 ? Math.max(8, (point.value / maxHistoryValue) * 100) : 0;
              return (
                <div key={`${point.label}-${index}`} className="instrument-preview-bar-row">
                  <span className="instrument-preview-bar-label">{point.label}</span>
                  <div
                    className="instrument-preview-bar-track"
                    role="img"
                    aria-label={`${point.label}: ${point.displayValue ?? point.value}`}
                  >
                    <span
                      className="instrument-preview-bar-fill"
                      style={{ width: `${width}%`, animationDelay: `${index * 90}ms` }}
                    />
                  </div>
                  <span className="instrument-preview-bar-value">
                    {point.displayValue ?? point.value}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="instrument-preview-empty">
            <LineChart className="h-5 w-5" />
            History appears when yearly data is available.
          </div>
        )}
      </div>

      {actionHref ? (
        <Link className="instrument-preview-action" href={actionHref}>
          {actionLabel}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      ) : null}
    </article>
  );
}
