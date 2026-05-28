"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  IndianRupee,
  Loader2,
  Plus,
  RefreshCcw,
  Target,
  Wallet,
} from "lucide-react";
import {
  Bar as RechartsBar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
} from "recharts";
import {
  AccentSquare,
  AgencyServiceCard,
  PixelIcon,
} from "@/components/agency/AgencyPrimitives";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAppStore, UserRole } from "@/store/useStore";

interface DashboardStats {
  fundsCount?: number;
  usersCount?: number;
  totalAum?: number;
  avgEquityReturns?: number | string;
}

interface FundOption {
  id: string;
  schemeCode?: string;
  schemeName: string;
  name?: string;
  category?: string;
  amcName?: string;
  nav: number;
  changePercent?: number | null;
  minInvestment?: number | null;
}

interface PortfolioSummary {
  id: string;
  name: string;
  invested: number;
  value: number;
  gain: number;
  returns: number;
  holdings?: Array<{
    id: string;
    schemeName: string;
    invested: number;
    value: number;
  }>;
}

interface RecentTransaction {
  id: string;
  schemeName: string;
  type: "BUY" | "SELL" | "SIP";
  amount: number;
  units: number;
  date: string;
  status: string;
}

interface Metric {
  label: string;
  value: string;
  note: string;
  tone: "cream" | "red" | "blue" | "teal" | "black";
}

interface RoleProfile {
  eyebrow: string;
  title: string;
  pixel: string;
  intro: string;
  metrics: Metric[];
  included: string[];
  steps: Array<{ id: string; title: string; body: string; red?: boolean }>;
}

interface WorkspaceActivity {
  label: string;
  value: string;
  note: string;
}

interface GoalPlan {
  id: string;
  name: string;
  current: number;
  target: number;
  progress: number;
  note: string;
}

interface WorkspaceData {
  profile: RoleProfile;
  chartData: Array<{
    name: string;
    views: number;
    aum?: number;
    avgReturn?: number;
  }>;
  activity: WorkspaceActivity[];
  goals: GoalPlan[];
  totals: {
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

const AUTO_PORTFOLIO_ID = "__auto__";
const DEFAULT_INVESTMENT_AMOUNT = "5000";

async function fetchJson(url: string) {
  const response = await fetch(url, { cache: "no-store" });
  const json = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(json?.error || json?.message || `Request failed: ${response.status}`);
  }

  return json;
}

export default function DashboardPage() {
  const router = useRouter();
  const { activeRole, setActiveRole } = useAppStore();
  const { toast } = useToast();
  const [investmentRequest, setInvestmentRequest] = useState({
    fundId: "",
    shouldOpen: false,
  });
  const requestedFundId = investmentRequest.fundId;
  const shouldOpenInvestment = investmentRequest.shouldOpen;
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [workspace, setWorkspace] = useState<WorkspaceData | null>(null);
  const [isWorkspaceLoading, setIsWorkspaceLoading] = useState(true);
  const [fundOptions, setFundOptions] = useState<FundOption[]>([]);
  const [portfolios, setPortfolios] = useState<PortfolioSummary[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);
  const [selectedFundId, setSelectedFundId] = useState("");
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(AUTO_PORTFOLIO_ID);
  const [orderType, setOrderType] = useState<"BUY" | "SIP">("BUY");
  const [investmentAmount, setInvestmentAmount] = useState(DEFAULT_INVESTMENT_AMOUNT);
  const [isInvestorDataLoading, setIsInvestorDataLoading] = useState(false);
  const [isInvesting, setIsInvesting] = useState(false);
  const [investmentDialogOpen, setInvestmentDialogOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setInvestmentRequest({
      fundId: params.get("fundId") || "",
      shouldOpen: params.get("invest") === "1",
    });
  }, []);

  const loadWorkspaceData = useCallback(async () => {
    setIsWorkspaceLoading(true);

    try {
      const json = await fetchJson(`/api/workspace?role=${activeRole}`);
      setWorkspace((json.data || null) as WorkspaceData | null);
    } catch (err) {
      console.error("Error loading role workspace:", err);
      setWorkspace(null);
    } finally {
      setIsWorkspaceLoading(false);
    }
  }, [activeRole]);

  useEffect(() => {
// sourcery skip: avoid-function-declarations-in-blocks
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard");
        const json = await res.json();
        if (json.success) {
          setStats(json.data);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  const loadInvestorData = useCallback(async () => {
    setIsInvestorDataLoading(true);

    try {
      const [fundsResult, investmentResult, selectedFundResult] = await Promise.allSettled([
        fetchJson("/api/funds?market=INDIA&limit=16"),
        fetchJson("/api/investments?includeFunds=true"),
        requestedFundId
          ? fetchJson(`/api/funds/${encodeURIComponent(requestedFundId)}`)
          : Promise.resolve(null),
      ]);

      const investmentJson =
        investmentResult.status === "fulfilled" ? investmentResult.value : null;
      const fundsJson = fundsResult.status === "fulfilled" ? fundsResult.value : null;
      const selectedFundJson =
        selectedFundResult.status === "fulfilled" ? selectedFundResult.value : null;
      const backendFunds = (fundsJson?.data || fundsJson?.funds || []) as FundOption[];
      const databaseFunds = (investmentJson?.data?.funds || []) as FundOption[];
      const selectedFund = selectedFundJson?.data as FundOption | undefined;
      const nextFundOptions = backendFunds.length > 0 ? backendFunds : databaseFunds;
      const mergedFundOptions =
        selectedFund && !nextFundOptions.some((fund) => fund.id === selectedFund.id)
          ? [selectedFund, ...nextFundOptions]
          : nextFundOptions;

      setFundOptions(mergedFundOptions);
      setPortfolios((investmentJson?.data?.portfolios || []) as PortfolioSummary[]);
      setRecentTransactions(
        (investmentJson?.data?.recentTransactions || []) as RecentTransaction[]
      );
      setSelectedFundId((current) =>
        selectedFund?.id || current || mergedFundOptions[0]?.id || ""
      );
    } catch (err) {
      console.error("Error loading investor data:", err);
    } finally {
      setIsInvestorDataLoading(false);
    }
  }, [requestedFundId]);

  useEffect(() => {
    if (activeRole !== "INVESTOR") {
      return;
    }

    loadInvestorData();
  }, [activeRole, loadInvestorData]);

  useEffect(() => {
    void loadWorkspaceData();
  }, [loadWorkspaceData]);

  useEffect(() => {
    if (!shouldOpenInvestment) return;
    setActiveRole("INVESTOR");
    if (requestedFundId) {
      setSelectedFundId(requestedFundId);
    }
    setInvestmentDialogOpen(true);
  }, [requestedFundId, setActiveRole, shouldOpenInvestment]);

  const profile = useMemo(
    () => workspace?.profile ?? buildRoleProfile(activeRole, stats),
    [activeRole, stats, workspace?.profile]
  );
  const roleChartData = workspace?.chartData?.length ? workspace.chartData : [];
  const quickActions = useMemo(() => buildQuickActions(activeRole), [activeRole]);

  const handleInvestmentSubmit = async () => {
    const amount = Number(investmentAmount);

    if (!selectedFundId || !Number.isFinite(amount) || amount <= 0) {
      toast({
        title: "Investment not ready",
        description: "Choose a fund and enter a valid amount.",
      });
      return false;
    }

    setIsInvesting(true);

    try {
      const response = await fetch("/api/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fundId: selectedFundId,
          portfolioId: selectedPortfolioId,
          amount,
          type: orderType,
        }),
      });
      const json = await response.json().catch(() => null);

      if (!response.ok || !json?.success) {
        throw new Error(json?.error || "Investment could not be added");
      }

      const units = Number(json.data?.transaction?.units || 0);
      const fundName = json.data?.fund?.schemeName || "selected fund";

      toast({
        title: "Investment added",
        description: `${units.toFixed(4)} units allocated in ${fundName}. Opening payment confirmation.`,
      });

      setInvestmentAmount(DEFAULT_INVESTMENT_AMOUNT);
      await Promise.all([loadInvestorData(), loadWorkspaceData()]);
      const paymentParams = new URLSearchParams({
        transactionId: String(json.data?.transaction?.id || ""),
        fundId: selectedFundId,
        fund: fundName,
        amount: String(amount),
        units: units.toFixed(4),
        type: orderType,
      });
      router.push(`/payment?${paymentParams.toString()}`);
      return true;
    } catch (err) {
      toast({
        title: "Investment failed",
        description: err instanceof Error ? err.message : "Unable to add investment.",
      });
      return false;
    } finally {
      setIsInvesting(false);
    }
  };

  const handleQuickAction = (action: string) => {
    if (action === "Invest Direct" && activeRole === "INVESTOR") {
      setInvestmentDialogOpen(true);
      return;
    }

    if (action === "My Portfolio") {
      router.push("/portfolio");
      return;
    }

    if (action === "Goal Planner") {
      document.getElementById("goal-planner")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    toast({
      title: `${action} triggered`,
      description: "Feature running inside the early-stage LuminaVest workspace.",
    });
  };

  if (isLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <div className="flex items-center gap-4 border-[3px] border-black bg-[#f7eee8] px-8 py-6 shadow-[8px_8px_0_#000]">
          <Loader2 className="h-6 w-6 animate-spin text-[#c95545]" />
          <span className="text-sm font-bold uppercase tracking-[0.18em]">Loading console</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-24">
      <section className="grid min-h-[calc(100vh-6rem)] gap-14 lg:grid-cols-[0.62fr_1fr] lg:items-start">
        <div className="sticky top-8">
          <div className="mb-10 grid grid-cols-4 text-xs font-bold">
            {["01", "02", "03", "04"].map((item, index) => (
              <div key={item}>
                <span className={index < 2 ? "text-[#2d8188]" : "text-[#5b5652]"}>{item}</span>
                <div className="mt-4 h-2 bg-[#ded5cf]">
                  <div className={index === 0 ? "h-full bg-[#2d8188]" : "h-full"} />
                </div>
              </div>
            ))}
          </div>
          <p className="agency-label mb-7">{profile.eyebrow}</p>
          <h1 className="max-w-xl text-[4.2rem] font-bold leading-[0.96] text-black dark:text-[#f7eee8] sm:text-[5.8rem]">
            {profile.title}
            <span className="agency-pixel block text-[4rem] text-[#c95545] sm:text-[5.8rem]">
              {profile.pixel}
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-xl font-semibold leading-[1.4] text-[#4d4743] dark:text-[#bdb5ae]">
            {profile.intro}
          </p>
        </div>

        <div className="space-y-10">
          <div className="grid gap-6 md:grid-cols-3">
            {profile.metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
            <div className="grid gap-6 sm:grid-cols-3">
              <AgencyServiceCard
                title="Screening"
                tone="cream"
                number="01"
                icon="brand"
                className="min-h-[310px]"
              />
              <AgencyServiceCard
                title="Allocation"
                tone="red"
                number="02"
                icon="web"
                className="min-h-[310px]"
              />
              <AgencyServiceCard
                title="Monitor"
                tone="blue"
                number="03"
                icon="desktop"
                className="min-h-[310px]"
              />
            </div>

            <aside className="agency-hard-shadow-sm flex min-h-[310px] flex-col justify-between bg-[#0b0b0b] text-[#f7eee8]">
              <div className="p-7">
                <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#8e8985]">
                  What&apos;s included
                </p>
                <ul className="space-y-4 text-sm font-semibold">
                  {profile.included.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="h-3 w-3 bg-[#4ba1a7]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleQuickAction("Open console action")}
                className="flex h-16 items-center justify-between bg-[#4ba1a7] px-6 font-bold text-black"
              >
                OPEN ACTION
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </aside>
          </div>
        </div>
      </section>

      {activeRole === "INVESTOR" ? (
        <>
          <InvestorInvestmentConsole
            funds={fundOptions}
            portfolios={portfolios}
            recentTransactions={recentTransactions}
            selectedFundId={selectedFundId}
            selectedPortfolioId={selectedPortfolioId}
            orderType={orderType}
            amount={investmentAmount}
            isLoading={isInvestorDataLoading}
            isInvesting={isInvesting}
            reviewOpen={investmentDialogOpen}
            onSelectedFundChange={setSelectedFundId}
            onSelectedPortfolioChange={setSelectedPortfolioId}
            onOrderTypeChange={setOrderType}
            onAmountChange={setInvestmentAmount}
            onReviewOpenChange={setInvestmentDialogOpen}
            onSubmit={handleInvestmentSubmit}
            onRefresh={loadInvestorData}
          />
          <GoalPlannerPanel goals={workspace?.goals || []} isLoading={isWorkspaceLoading} />
        </>
      ) : (
        <RoleWorkspaceConsole
          role={activeRole}
          workspace={workspace}
          isLoading={isWorkspaceLoading}
          onRefresh={loadWorkspaceData}
        />
      )}

      <section className="grid gap-12 lg:grid-cols-[0.35fr_1fr]">
        <div>
          <p className="agency-label mb-8">Operating flow</p>
          <h2 className="agency-pixel text-[4rem] text-[#c95545] sm:text-[5.5rem]">
            From signal to smart decision
          </h2>
        </div>
        <div>
          {profile.steps.map((step) => (
            <article key={step.id} className="border-b border-[#cfc4bd] py-10 first:pt-0 dark:border-[#f7eee8]/20">
              <div className="grid gap-6 md:grid-cols-[4.5rem_1fr]">
                <span className="text-2xl font-bold text-[#c95545]">{step.id}</span>
                <div>
                  <h3
                    className={`mb-4 text-[3.8rem] font-bold leading-none ${
                      step.red ? "text-[#c95545]" : "text-[#082f33] dark:text-[#4ba1a7]"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="max-w-4xl text-xl font-medium leading-[1.4] text-[#3c3836] dark:text-[#bdb5ae]">
                    {step.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_0.42fr]">
        <div className="agency-hard-shadow border-[3px] border-black bg-[#f7eee8] p-7 dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Live category distribution</h2>
            <AccentSquare />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={roleChartData}>
                <RechartsXAxis dataKey="name" stroke="currentColor" fontSize={12} tickLine={false} />
                <RechartsYAxis stroke="currentColor" fontSize={12} tickLine={false} />
                <RechartsTooltip
                  cursor={{ fill: "#eadfd8" }}
                  contentStyle={{
                    backgroundColor: "#0b0b0b",
                    border: "3px solid #000",
                    borderRadius: "0",
                    color: "#f7eee8",
                    fontSize: "12px",
                  }}
                />
                <RechartsBar dataKey="views" fill="#c95545" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="agency-hard-shadow-sm border-[3px] border-black bg-[#4ba1a7] p-7 dark:border-[#f7eee8]/25 dark:bg-[#123f45] dark:text-[#bcece6]">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#123f45]">
            Quick actions
          </p>
          {quickActions.map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => handleQuickAction(action)}
              className="flex w-full items-center justify-between border-b border-[#123f45]/40 py-5 text-left text-xl font-bold"
            >
              {action}
              <Plus className="h-5 w-5" />
            </button>
          ))}
          <div className="mt-10 flex justify-center">
            <PixelIcon kind="chart" />
          </div>
        </div>
      </section>
    </div>
  );
}

function GoalPlannerPanel({
  goals,
  isLoading,
}: {
  goals: GoalPlan[];
  isLoading: boolean;
}) {
  return (
    <section
      id="goal-planner"
      className="agency-hard-shadow border-[3px] border-black bg-[#f7eee8] dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b]"
    >
      <div className="grid gap-5 border-b-[3px] border-black p-7 dark:border-[#f7eee8]/20 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="agency-label mb-4">Goal Planner</p>
          <h2 className="text-4xl font-bold leading-none text-[#082f33] dark:text-[#f7eee8] sm:text-6xl">
            Portfolio-derived goals
          </h2>
        </div>
        <span className="border-[3px] border-black bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-black dark:border-[#f7eee8]/25 dark:bg-[#141414] dark:text-[#f7eee8]">
          {isLoading ? "Syncing" : "Live DB"}
        </span>
      </div>

      <div className="grid gap-5 p-7 lg:grid-cols-2">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <article
              key={goal.id}
              className="border-[3px] border-black bg-white p-5 shadow-[6px_6px_0_#000] dark:border-[#f7eee8]/25 dark:bg-[#141414] dark:shadow-[6px_6px_0_#4ba1a7]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#5b5652] dark:text-[#bdb5ae]">
                    {goal.name}
                  </p>
                  <h3 className="mt-3 text-3xl font-bold text-black dark:text-[#f7eee8]">
                    {goal.progress.toFixed(0)}% funded
                  </h3>
                </div>
                <Target className="h-7 w-7 text-[#c95545] dark:text-[#4ba1a7]" />
              </div>
              <div className="mt-6 h-4 border-2 border-black bg-[#eadfd8] dark:border-[#f7eee8]/25 dark:bg-[#252525]">
                <div
                  className="h-full bg-[#4ba1a7] transition-all duration-700"
                  style={{ width: `${Math.max(2, Math.min(100, goal.progress))}%` }}
                />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm font-bold">
                <span className="border-2 border-black bg-[#f7eee8] p-3 text-black dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b] dark:text-[#f7eee8]">
                  Current {formatCurrency(goal.current)}
                </span>
                <span className="border-2 border-black bg-[#cf6a5f] p-3 text-black dark:border-[#f7eee8]/25">
                  Target {formatCurrency(goal.target)}
                </span>
              </div>
              <p className="mt-5 text-sm font-semibold text-[#5b5652] dark:text-[#bdb5ae]">
                {goal.note}
              </p>
            </article>
          ))
        ) : (
          <div className="border-[3px] border-black bg-[#0b0b0b] p-6 text-sm font-bold text-[#f7eee8]">
            Add an investment and this planner will calculate progress from portfolio value.
          </div>
        )}
      </div>
    </section>
  );
}

function RoleWorkspaceConsole({
  role,
  workspace,
  isLoading,
  onRefresh,
}: {
  role: UserRole;
  workspace: WorkspaceData | null;
  isLoading: boolean;
  onRefresh: () => Promise<void>;
}) {
  const activity = workspace?.activity || [];
  const totals = workspace?.totals;

  return (
    <section className="agency-hard-shadow border-[3px] border-black bg-[#f7eee8] dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b]">
      <div className="grid gap-5 border-b-[3px] border-black p-7 dark:border-[#f7eee8]/20 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="agency-label mb-4">{roleLabel(role)}</p>
          <h2 className="text-4xl font-bold leading-none text-[#082f33] dark:text-[#f7eee8] sm:text-6xl">
            Live workspace data
          </h2>
        </div>
        <Button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="h-12 rounded-none border-[3px] border-black bg-[#4ba1a7] px-5 font-bold text-black shadow-[5px_5px_0_#000] hover:bg-[#5fb8be] dark:border-[#f7eee8]/25"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="mr-2 h-4 w-4" />
          )}
          Refresh live data
        </Button>
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.72fr_1fr]">
        <div className="border-b-[3px] border-black p-7 dark:border-[#f7eee8]/20 lg:border-b-0 lg:border-r-[3px]">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#5b5652] dark:text-[#bdb5ae]">
            Live totals
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <WorkspaceStat label="Funds" value={String(totals?.fundsCount ?? "--")} />
            <WorkspaceStat label="Users" value={String(totals?.usersCount ?? "--")} />
            <WorkspaceStat label="Portfolios" value={String(totals?.portfoliosCount ?? "--")} />
            <WorkspaceStat label="Transactions" value={String(totals?.transactionsCount ?? "--")} />
          </div>
        </div>

        <div className="p-7">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#5b5652] dark:text-[#bdb5ae]">
            Live activity
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {activity.length > 0 ? (
              activity.map((item, index) => (
                <article
                  key={`${item.label}-${index}`}
                  className="min-w-0 border-[3px] border-black bg-white p-5 shadow-[5px_5px_0_#000] dark:border-[#f7eee8]/25 dark:bg-[#141414] dark:shadow-[5px_5px_0_#c95545]"
                >
                  <p className="truncate text-sm font-bold text-black dark:text-[#f7eee8]">
                    {item.label}
                  </p>
                  <p className="mt-4 text-3xl font-black text-[#c95545] dark:text-[#4ba1a7]">
                    {item.value}
                  </p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-[#5b5652] dark:text-[#bdb5ae]">
                    {item.note}
                  </p>
                </article>
              ))
            ) : (
              <div className="border-[3px] border-black bg-[#0b0b0b] p-6 text-sm font-bold text-[#f7eee8]">
                No live rows yet. Sync funds or add investments to populate this workspace.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkspaceStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-[3px] border-black bg-white p-4 dark:border-[#f7eee8]/25 dark:bg-[#141414]">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5b5652] dark:text-[#bdb5ae]">
        {label}
      </p>
      <p className="mt-3 text-3xl font-black text-black dark:text-[#f7eee8]">{value}</p>
    </div>
  );
}

function InvestorInvestmentConsole({
  funds,
  portfolios,
  recentTransactions,
  selectedFundId,
  selectedPortfolioId,
  orderType,
  amount,
  isLoading,
  isInvesting,
  reviewOpen,
  onSelectedFundChange,
  onSelectedPortfolioChange,
  onOrderTypeChange,
  onAmountChange,
  onReviewOpenChange,
  onSubmit,
  onRefresh,
}: {
  funds: FundOption[];
  portfolios: PortfolioSummary[];
  recentTransactions: RecentTransaction[];
  selectedFundId: string;
  selectedPortfolioId: string;
  orderType: "BUY" | "SIP";
  amount: string;
  isLoading: boolean;
  isInvesting: boolean;
  reviewOpen: boolean;
  onSelectedFundChange: (value: string) => void;
  onSelectedPortfolioChange: (value: string) => void;
  onOrderTypeChange: (value: "BUY" | "SIP") => void;
  onAmountChange: (value: string) => void;
  onReviewOpenChange: (value: boolean) => void;
  onSubmit: () => Promise<boolean>;
  onRefresh: () => Promise<void>;
}) {
  const selectedFund = useMemo(
    () => funds.find((fund) => fund.id === selectedFundId) || funds[0],
    [funds, selectedFundId]
  );
  const amountValue = Number(amount);
  const validAmount = Number.isFinite(amountValue) && amountValue > 0 ? amountValue : 0;
  const previewUnits = selectedFund?.nav ? validAmount / selectedFund.nav : 0;
  const portfolioTotals = portfolios.reduce(
    (totals, portfolio) => ({
      invested: totals.invested + portfolio.invested,
      value: totals.value + portfolio.value,
    }),
    { invested: 0, value: 0 }
  );
  const activePortfolio =
    selectedPortfolioId === AUTO_PORTFOLIO_ID
      ? portfolios[0]
      : portfolios.find((portfolio) => portfolio.id === selectedPortfolioId);
  const canReview = Boolean(selectedFund && validAmount > 0 && !isInvesting);

  const handleConfirm = async () => {
    const didSubmit = await onSubmit();
    if (didSubmit) {
      onReviewOpenChange(false);
    }
  };

  return (
    <section className="agency-hard-shadow border-[3px] border-black bg-[#f7eee8]">
      <div className="grid gap-8 border-b-[3px] border-black p-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="agency-label mb-4">Investor Console</p>
          <h2 className="text-4xl font-bold leading-none text-[#082f33] sm:text-6xl">
            Add live investments
          </h2>
        </div>
        <Button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="h-12 rounded-none border-[3px] border-black bg-[#4ba1a7] px-5 font-bold text-black shadow-[5px_5px_0_#000] hover:bg-[#5fb8be]"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="mr-2 h-4 w-4" />
          )}
          Sync console
        </Button>
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.8fr_1.15fr_0.85fr]">
        <div className="border-b-[3px] border-black p-7 lg:border-b-0 lg:border-r-[3px]">
          <div className="mb-8 flex h-12 w-12 items-center justify-center border-[3px] border-black bg-[#cf6a5f] shadow-[4px_4px_0_#000]">
            <Wallet className="h-6 w-6 text-black" />
          </div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6c615b]">
            Portfolio total
          </p>
          <p className="agency-pixel text-[3.6rem] leading-none text-black">
            {formatCurrency(portfolioTotals.value || portfolioTotals.invested)}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="border-[3px] border-black bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6c615b]">
                Invested
              </p>
              <p className="mt-3 text-xl font-bold">{formatCurrency(portfolioTotals.invested)}</p>
            </div>
            <div className="border-[3px] border-black bg-[#4ba1a7] p-4 text-[#092d31]">
              <p className="text-xs font-bold uppercase tracking-[0.14em] opacity-70">
                Gain
              </p>
              <p className="mt-3 text-xl font-bold">
                {formatCurrency(portfolioTotals.value - portfolioTotals.invested)}
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm font-bold leading-[1.5] text-[#4d4743]">
            {activePortfolio?.name || "Core Portfolio"} will receive the next allocation.
          </p>
        </div>

        <div className="border-b-[3px] border-black p-7 lg:border-b-0 lg:border-r-[3px]">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#5b5652]">
                Fund
              </label>
              <Select value={selectedFund?.id || ""} onValueChange={onSelectedFundChange}>
                <SelectTrigger className="h-14 rounded-none border-[3px] border-black bg-white text-left font-bold">
                  <SelectValue placeholder="Select fund" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-[3px] border-black">
                  {funds.map((fund) => (
                    <SelectItem key={fund.id} value={fund.id} className="rounded-none">
                      <span className="block max-w-[22rem] truncate">
                        {fund.schemeName || fund.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#5b5652]">
                Amount
              </label>
              <div className="relative">
                <IndianRupee className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6c615b]" />
                <Input
                  type="number"
                  min="1"
                  step="500"
                  value={amount}
                  onChange={(event) => onAmountChange(event.target.value)}
                  className="h-14 rounded-none border-[3px] border-black bg-white pl-10 text-base font-bold"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#5b5652]">
                Type
              </label>
              <Select value={orderType} onValueChange={(value) => onOrderTypeChange(value as "BUY" | "SIP")}>
                <SelectTrigger className="h-14 rounded-none border-[3px] border-black bg-white font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none border-[3px] border-black">
                  <SelectItem value="BUY" className="rounded-none">One-time buy</SelectItem>
                  <SelectItem value="SIP" className="rounded-none">SIP allocation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#5b5652]">
                Portfolio
              </label>
              <Select value={selectedPortfolioId} onValueChange={onSelectedPortfolioChange}>
                <SelectTrigger className="h-14 rounded-none border-[3px] border-black bg-white font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none border-[3px] border-black">
                  <SelectItem value={AUTO_PORTFOLIO_ID} className="rounded-none">
                    Auto Core Portfolio
                  </SelectItem>
                  {portfolios.map((portfolio) => (
                    <SelectItem key={portfolio.id} value={portfolio.id} className="rounded-none">
                      {portfolio.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <PreviewStat label="Live NAV" value={selectedFund ? formatCurrency(selectedFund.nav) : "--"} />
            <PreviewStat label="Units" value={previewUnits ? previewUnits.toFixed(4) : "--"} />
            <PreviewStat label="Category" value={selectedFund?.category || "--"} />
          </div>

          <Button
            type="button"
            onClick={() => onReviewOpenChange(true)}
            disabled={!canReview}
            className="mt-7 h-14 w-full rounded-none border-[3px] border-black bg-[#c95545] text-base font-bold text-black shadow-[6px_6px_0_#000] hover:bg-[#d7796d]"
          >
            Review allocation
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="p-7">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#6c615b]">
            Recent investments
          </p>
          <div className="space-y-4">
            {recentTransactions.length > 0 ? (
              recentTransactions.slice(0, 4).map((transaction) => (
                <div
                  key={transaction.id}
                  className="border-[3px] border-black bg-white p-4 shadow-[4px_4px_0_#000]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="min-w-0 truncate text-sm font-bold">
                      {transaction.schemeName}
                    </p>
                    <span className="shrink-0 bg-[#0b0b0b] px-2 py-1 text-[0.65rem] font-bold text-[#f7eee8]">
                      {transaction.type}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm font-bold text-[#5b5652]">
                    <span>{formatCurrency(transaction.amount)}</span>
                    <span>{new Date(transaction.date).toLocaleDateString("en-IN")}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="border-[3px] border-black bg-[#0b0b0b] p-6 text-sm font-bold leading-[1.5] text-[#f7eee8]">
                No completed investments yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={reviewOpen} onOpenChange={onReviewOpenChange}>
        <DialogContent className="max-w-xl rounded-none border-[3px] border-black bg-[#f7eee8] p-0 shadow-[8px_8px_0_#000]">
          <DialogHeader className="border-b-[3px] border-black p-6 text-left">
            <DialogTitle className="text-3xl font-bold text-black">Review allocation</DialogTitle>
            <DialogDescription className="font-semibold text-[#5b5652]">
              {selectedFund?.schemeName || selectedFund?.name || "Selected fund"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-6">
            <PreviewRow label="Order type" value={orderType === "SIP" ? "SIP allocation" : "One-time buy"} />
            <PreviewRow label="Amount" value={formatCurrency(validAmount)} />
            <PreviewRow label="Live NAV" value={selectedFund ? formatCurrency(selectedFund.nav) : "--"} />
            <PreviewRow label="Units" value={previewUnits ? previewUnits.toFixed(4) : "--"} />
            <PreviewRow label="Portfolio" value={activePortfolio?.name || "Core Portfolio"} />
          </div>
          <div className="grid gap-3 border-t-[3px] border-black p-6 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onReviewOpenChange(false)}
              className="h-12 rounded-none border-[3px] border-black bg-white font-bold text-black"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={!canReview}
              className="h-12 rounded-none border-[3px] border-black bg-[#4ba1a7] font-bold text-black hover:bg-[#5fb8be]"
            >
              {isInvesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Add investment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function PreviewStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-[3px] border-black bg-white p-4">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#6c615b]">
        {label}
      </p>
      <p className="mt-3 truncate text-lg font-bold text-black">{value}</p>
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#d6cbc3] pb-3 last:border-b-0">
      <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#6c615b]">{label}</span>
      <span className="min-w-0 truncate text-right text-base font-bold text-black">{value}</span>
    </div>
  );
}

function formatCurrency(value: number) {
  const amount = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function MetricCard({ metric }: { metric: Metric }) {
  const toneClass = {
    cream: "bg-[#f7eee8] text-black",
    red: "bg-[#cf6a5f] text-[#171717]",
    blue: "bg-[#7b9cc8] text-[#102132]",
    teal: "bg-[#4ba1a7] text-[#092d31]",
    black: "bg-[#0b0b0b] text-[#f7eee8]",
  }[metric.tone];

  return (
    <article className={`agency-hard-shadow-sm border-[3px] border-black p-6 ${toneClass}`}>
      <p className="mb-8 text-xs font-bold uppercase tracking-[0.18em] opacity-70">{metric.label}</p>
      <p className="agency-pixel text-[3.5rem] leading-none">{metric.value}</p>
      <p className="mt-7 text-sm font-bold opacity-70">{metric.note}</p>
    </article>
  );
}

function buildQuickActions(role: UserRole) {
  const actions: Record<UserRole, string[]> = {
    INVESTOR: ["Invest Direct", "My Portfolio", "Goal Planner", "Risk Profile"],
    ADVISOR: ["Review Clients", "Suitability Notes", "Fund Shortlist", "Advisor Reports"],
    AMC: ["Scheme Monitor", "AUM Ranking", "Factsheet Queue", "Inflow Review"],
    RESEARCHER: ["Signal Ranking", "Category Pulse", "Draft Insight", "Research Queue"],
    ADMIN: ["Runtime Check", "User Registry", "Fund Sync", "Audit Trail"],
  };

  return actions[role];
}

function roleLabel(role: UserRole) {
  const labels: Record<UserRole, string> = {
    INVESTOR: "Investor workspace",
    ADVISOR: "Advisor workspace",
    AMC: "AMC control",
    RESEARCHER: "Research hub",
    ADMIN: "System admin",
  };

  return labels[role];
}

function buildRoleProfile(role: UserRole, stats: DashboardStats | null): RoleProfile {
  const fundsCount = stats?.fundsCount ?? 65;
  const usersCount = stats?.usersCount ?? 12;
  const totalAum = Number(stats?.totalAum ?? 1565000);
  const formattedAum = `₹${(totalAum / 100000).toFixed(2)}L`;
  const avgReturns = Number(stats?.avgEquityReturns ?? 18.42).toFixed(1);

  const baseSteps = [
    {
      id: "01",
      title: "Discovery",
      body:
        "The workspace begins with fresh fund data, goals and risk context so every action has a clear starting point.",
    },
    {
      id: "02",
      title: "Design",
      body:
        "Signals are shaped into visual panels, comparisons and alerts that make repeated decisions easier to scan.",
      red: true,
    },
    {
      id: "03",
      title: "Development",
      body:
        "The platform connects portfolio, research and execution workflows so each role can move from insight to action.",
    },
  ];

  const profiles: Record<UserRole, RoleProfile> = {
    INVESTOR: {
      eyebrow: "Investor workspace",
      title: "From capital to",
      pixel: "confident moves",
      intro:
        "A direct investing console for fund discovery, allocation, XIRR tracking and disciplined long-term decisions.",
      metrics: [
        { label: "Total worth", value: "18.45L", note: "Daily movement +1.12%", tone: "cream" },
        { label: "XIRR", value: `${avgReturns}%`, note: "Direct plan alpha +3.8%", tone: "red" },
        { label: "Goals", value: "02", note: "Retirement plan 60% reached", tone: "blue" },
      ],
      included: [
        "Direct fund screening",
        "Risk and tax diagnostics",
        "Goal planning dashboards",
        "Advisor matching",
        "Portfolio monitoring",
      ],
      steps: baseSteps,
    },
    ADVISOR: {
      eyebrow: "Advisor workspace",
      title: "From client data to",
      pixel: "better advice",
      intro:
        "Manage client portfolios, referrals, suitability notes and recurring advisory work from one visual command center.",
      metrics: [
        { label: "AUA", value: "8.45Cr", note: "12 active clients", tone: "cream" },
        { label: "Fees", value: "42.5K", note: "Monthly advisory revenue", tone: "teal" },
        { label: "Leads", value: "03", note: "Pending high-score matches", tone: "red" },
      ],
      included: ["Client console", "Lead referrals", "Commission view", "Research notes", "Portfolio reviews"],
      steps: baseSteps,
    },
    AMC: {
      eyebrow: "Fund house workspace",
      title: "From scheme data to",
      pixel: "market reach",
      intro:
        "Track listed funds, daily views, direct inflows and factsheet updates with a product-focused dashboard.",
      metrics: [
        { label: "AUM", value: formattedAum, note: `${fundsCount} listed schemes`, tone: "blue" },
        { label: "Views", value: "18.9K", note: "24 hour product views", tone: "cream" },
        { label: "Inflows", value: "4.2Cr", note: "Weekly direct movement", tone: "teal" },
      ],
      included: ["Fund manager", "AMC factsheets", "Lead pipeline", "View analytics", "Direct inflows"],
      steps: baseSteps,
    },
    RESEARCHER: {
      eyebrow: "Research workspace",
      title: "From insight to",
      pixel: "trusted signal",
      intro:
        "Publish research, track reader engagement and build credibility around fund analysis and market commentary.",
      metrics: [
        { label: "Views", value: "48.2K", note: "8 insights published", tone: "cream" },
        { label: "Revenue", value: "8.9K", note: "Paid readers active", tone: "red" },
        { label: "Score", value: "98%", note: "Peer review credibility", tone: "blue" },
      ],
      included: ["Research center", "Insight publishing", "Reader analytics", "Peer review", "Subscription revenue"],
      steps: baseSteps,
    },
    ADMIN: {
      eyebrow: "System workspace",
      title: "From platform logs to",
      pixel: "stable ops",
      intro:
        "Operate fund data, users, integrations and runtime checks from a single administrative console.",
      metrics: [
        { label: "Uptime", value: "99%", note: "Edge clusters healthy", tone: "black" },
        { label: "Funds", value: `${fundsCount}`, note: "Seeded database records", tone: "cream" },
        { label: "Users", value: `${usersCount}`, note: "Registered accounts", tone: "teal" },
      ],
      included: ["System control", "User settings", "Audit logging", "Integrations", "AMFI sync pipeline"],
      steps: baseSteps,
    },
  };

  return profiles[role];
}
