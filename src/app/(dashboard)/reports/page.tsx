"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Download,
  FileText,
  Loader2,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { roleDefinitions } from "@/lib/roles";
import { useAppStore, UserRole } from "@/store/useStore";

interface WorkspaceResponse {
  role: UserRole;
  source?: string;
  profile?: {
    reports?: Array<{ label: string; description: string }>;
    permissions?: Array<{ label: string; description: string }>;
    guardrail?: string;
  };
  activity?: Array<{
    label: string;
    value: string;
    note: string;
  }>;
  totals?: {
    fundsCount: number;
    usersCount: number;
    portfoliosCount: number;
    transactionsCount: number;
    totalAum: number;
    portfolioValue: number;
    portfolioInvested: number;
    avgReturn: number;
  };
}

async function fetchWorkspace(role: UserRole) {
  const response = await fetch(`/api/workspace?role=${role}`, { cache: "no-store" });
  const json = await response.json().catch(() => null);

  if (!response.ok || !json?.success) {
    throw new Error(json?.error || "Unable to load reports workspace");
  }

  return json.data as WorkspaceResponse;
}

export default function ReportsPage() {
  const { activeRole } = useAppStore();
  const { toast } = useToast();
  const role = roleDefinitions[activeRole];
  const [workspace, setWorkspace] = useState<WorkspaceResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadWorkspace = useCallback(async () => {
    setIsLoading(true);

    try {
      setWorkspace(await fetchWorkspace(activeRole));
    } catch (error) {
      toast({
        title: "Reports unavailable",
        description:
          error instanceof Error ? error.message : "Unable to load role reports.",
      });
      setWorkspace(null);
    } finally {
      setIsLoading(false);
    }
  }, [activeRole, toast]);

  useEffect(() => {
    void loadWorkspace();
  }, [loadWorkspace]);

  const reports = workspace?.profile?.reports?.length
    ? workspace.profile.reports
    : role.reports;
  const permissions = workspace?.profile?.permissions?.length
    ? workspace.profile.permissions
    : role.permissions;
  const activity = workspace?.activity || [];
  const totals = workspace?.totals;

  const exportQueue = useMemo(
    () =>
      reports.map((report, index) => ({
        ...report,
        code: `R${String(index + 1).padStart(2, "0")}`,
        status: index === 0 ? "Ready" : index === 1 ? "Review" : "Draft",
      })),
    [reports]
  );

  const handleExport = (label: string) => {
    const payload = {
      exportedAt: new Date().toISOString(),
      role: role.label,
      report: label,
      source: workspace?.source || "workspace",
      totals: workspace?.totals || null,
      reports,
      permissions,
      activity,
      guardrail: workspace?.profile?.guardrail || role.guardrail,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `${role.shortLabel.toLowerCase()}-${label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);

    toast({
      title: `${label} downloaded`,
      description: "A role-scoped JSON export was generated from the live workspace data.",
    });
  };

  return (
    <div className="space-y-12">
      <section className="grid gap-10 lg:grid-cols-[0.56fr_1fr] lg:items-start">
        <div className="sticky top-8">
          <p className="agency-label mb-6">{role.badge}</p>
          <h1 className="max-w-2xl text-[4.2rem] font-bold leading-[0.96] text-black dark:text-[#f7eee8] sm:text-[5.8rem]">
            {role.shortLabel}
            <span className="agency-pixel block text-[4rem] text-[#c95545] sm:text-[5.8rem]">
              reports
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-xl font-semibold leading-[1.4] text-[#4d4743] dark:text-[#bdb5ae]">
            {role.intro}
          </p>
          <Button
            type="button"
            onClick={loadWorkspace}
            disabled={isLoading}
            className="mt-8 h-12 rounded-none border-[3px] border-black bg-[#4ba1a7] px-5 font-bold text-black shadow-[5px_5px_0_#000] hover:bg-[#5fb8be] dark:border-[#f7eee8]/25"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="mr-2 h-4 w-4" />
            )}
            Refresh live role data
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ReportMetric
            label="Funds"
            value={isLoading ? "--" : String(totals?.fundsCount ?? 0)}
            note={workspace?.source || "workspace source"}
            tone="black"
          />
          <ReportMetric
            label="Portfolios"
            value={isLoading ? "--" : String(totals?.portfoliosCount ?? 0)}
            note={`${totals?.transactionsCount ?? 0} transactions`}
            tone="cream"
          />
          <ReportMetric
            label="Avg return"
            value={isLoading ? "--" : `${(totals?.avgReturn ?? 0).toFixed(1)}%`}
            note={`${totals?.usersCount ?? 0} accounts`}
            tone="teal"
          />
        </div>
      </section>

      <section className="agency-hard-shadow border-[3px] border-black bg-[#f7eee8] dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b]">
        <div className="grid gap-5 border-b-[3px] border-black p-7 dark:border-[#f7eee8]/20 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="agency-label mb-4">Report permissions</p>
            <h2 className="text-4xl font-bold leading-none text-[#082f33] dark:text-[#f7eee8] sm:text-6xl">
              Role-specific exports
            </h2>
          </div>
          <span className="inline-flex h-12 items-center border-[3px] border-black bg-white px-4 text-xs font-bold uppercase tracking-[0.14em] text-black dark:border-[#f7eee8]/25 dark:bg-[#141414] dark:text-[#f7eee8]">
            {role.label}
          </span>
        </div>

        <div className="grid gap-0 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b-[3px] border-black p-7 dark:border-[#f7eee8]/20 xl:border-b-0 xl:border-r-[3px]">
            <div className="grid gap-5 md:grid-cols-3">
              {exportQueue.map((report) => (
                <article
                  key={report.label}
                  className="flex min-h-[280px] flex-col justify-between border-[3px] border-black bg-white p-5 shadow-[6px_6px_0_#000] dark:border-[#f7eee8]/25 dark:bg-[#141414]"
                >
                  <div>
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#5b5652] dark:text-[#bdb5ae]">
                        {report.code}
                      </span>
                      <FileText className="h-5 w-5 text-[#c95545]" />
                    </div>
                    <h3 className="text-2xl font-bold leading-tight text-black dark:text-[#f7eee8]">
                      {report.label}
                    </h3>
                    <p className="mt-4 text-sm font-semibold leading-[1.5] text-[#5b5652] dark:text-[#bdb5ae]">
                      {report.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleExport(report.label)}
                    className="mt-7 flex h-12 items-center justify-between border-[3px] border-black bg-[#c95545] px-4 text-sm font-bold text-black"
                  >
                    {report.status}
                    <Download className="h-4 w-4" />
                  </button>
                </article>
              ))}
            </div>
          </div>

          <aside className="bg-[#0b0b0b] p-7 text-[#f7eee8]">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#8e8985]">
              Access rules
            </p>
            <div className="space-y-4">
              {permissions.map((permission) => (
                <div key={permission.label} className="border-b border-[#f7eee8]/15 pb-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#4ba1a7]" />
                    <div>
                      <p className="text-sm font-black">{permission.label}</p>
                      <p className="mt-1 text-xs font-bold leading-[1.45] text-[#bdb5ae]">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 border-[3px] border-[#4ba1a7] p-5 text-sm font-bold leading-[1.5]">
              {workspace?.profile?.guardrail || role.guardrail}
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.45fr_1fr]">
        <div>
          <p className="agency-label mb-5">Live activity</p>
          <h2 className="agency-pixel text-[4rem] text-[#c95545] sm:text-[5.2rem]">
            Audit-ready data
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {activity.length > 0 ? (
            activity.slice(0, 6).map((item, index) => (
              <article
                key={`${item.label}-${index}`}
                className="border-[3px] border-black bg-[#f7eee8] p-5 shadow-[5px_5px_0_#000] dark:border-[#f7eee8]/25 dark:bg-[#141414]"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="min-w-0 truncate text-base font-bold text-black dark:text-[#f7eee8]">
                    {item.label}
                  </p>
                  <Activity className="h-5 w-5 shrink-0 text-[#4ba1a7]" />
                </div>
                <p className="mt-5 text-3xl font-black text-[#c95545] dark:text-[#4ba1a7]">
                  {item.value}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.1em] text-[#5b5652] dark:text-[#bdb5ae]">
                  {item.note}
                </p>
              </article>
            ))
          ) : (
            <div className="border-[3px] border-black bg-[#0b0b0b] p-6 text-sm font-bold text-[#f7eee8]">
              No live rows yet. Sync funds or add investments to populate reports.
            </div>
          )}
        </div>
      </section>

      <section className="agency-hard-shadow-sm flex flex-col gap-5 border-[3px] border-black bg-[#4ba1a7] p-7 text-black dark:border-[#f7eee8]/25 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">Next action</p>
          <h2 className="mt-2 text-3xl font-bold">{role.primaryAction}</h2>
        </div>
        <button
          type="button"
          onClick={() => handleExport(role.primaryAction)}
          className="inline-flex h-14 items-center justify-center gap-3 border-[3px] border-black bg-[#f7eee8] px-6 text-sm font-bold shadow-[5px_5px_0_#000]"
        >
          Queue action
          <ArrowUpRight className="h-5 w-5" />
        </button>
      </section>
    </div>
  );
}

function ReportMetric({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone: "cream" | "teal" | "black";
}) {
  const toneClass = {
    cream: "bg-[#f7eee8] text-black",
    teal: "bg-[#4ba1a7] text-[#092d31]",
    black: "bg-[#0b0b0b] text-[#f7eee8]",
  }[tone];

  return (
    <article className={`agency-hard-shadow-sm border-[3px] border-black p-6 ${toneClass}`}>
      <p className="mb-8 text-xs font-bold uppercase tracking-[0.18em] opacity-70">{label}</p>
      <p className="agency-pixel text-[3.6rem] leading-none">{value}</p>
      <p className="mt-7 text-sm font-bold opacity-70">{note}</p>
    </article>
  );
}
