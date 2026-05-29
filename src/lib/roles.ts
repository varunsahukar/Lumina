export type UserRole = "INVESTOR" | "ADVISOR" | "AMC" | "RESEARCHER" | "ADMIN";

export interface RoleCapability {
  label: string;
  description: string;
}

export interface RoleDefinition {
  label: string;
  shortLabel: string;
  description: string;
  badge: string;
  dashboardLabel: string;
  heroTitle: string;
  heroPixel: string;
  intro: string;
  guardrail: string;
  primaryAction: string;
  nav: Array<{
    name: string;
    href: string;
    icon: "compass" | "file" | "layers" | "pie" | "settings" | "shield" | "target" | "users";
    code: string;
  }>;
  capabilities: RoleCapability[];
  permissions: RoleCapability[];
  reports: RoleCapability[];
  quickActions: string[];
}

export const roleOrder: UserRole[] = ["INVESTOR", "ADVISOR", "AMC", "RESEARCHER", "ADMIN"];

export const roleDefinitions: Record<UserRole, RoleDefinition> = {
  INVESTOR: {
    label: "Investor Console",
    shortLabel: "Investor",
    description: "Screen funds, invest directly, track goals",
    badge: "Personal wealth workspace",
    dashboardLabel: "Investor workspace",
    heroTitle: "From capital to",
    heroPixel: "confident moves",
    intro:
      "A personal investment console for fund discovery, direct allocations, portfolio health, goals and payment review.",
    guardrail:
      "Investors can act only on their own portfolios, orders, risk profile and reports.",
    primaryAction: "Invest Direct",
    nav: [
      { name: "Fund Screener", href: "/screener", icon: "compass", code: "01" },
      { name: "My Portfolio", href: "/portfolio", icon: "pie", code: "02" },
      { name: "Goal Planner", href: "/dashboard", icon: "target", code: "03" },
      { name: "Tax Center", href: "/reports", icon: "file", code: "04" },
    ],
    capabilities: [
      {
        label: "Discover and compare funds",
        description: "Use NAV, return, category, risk and AUM signals to shortlist schemes.",
      },
      {
        label: "Invest directly",
        description: "Create one-time or SIP allocations and continue into payment confirmation.",
      },
      {
        label: "Track portfolio outcomes",
        description: "Monitor holdings, gain, goal progress and recent transactions from live data.",
      },
    ],
    permissions: [
      {
        label: "Own portfolio access",
        description: "View and manage only personal portfolios, holdings and goal plans.",
      },
      {
        label: "Order creation",
        description: "Create investment orders after server-side NAV and amount validation.",
      },
      {
        label: "Personal reports",
        description: "Generate tax, transaction and performance reports for the signed-in investor.",
      },
    ],
    reports: [
      {
        label: "Capital gains statement",
        description: "Realized and unrealized gains grouped by fund and holding period.",
      },
      {
        label: "Goal progress summary",
        description: "Portfolio value mapped against live goal targets and contribution gaps.",
      },
      {
        label: "Transaction ledger",
        description: "Buy, sell and SIP rows prepared for payment and tax review.",
      },
    ],
    quickActions: ["Invest Direct", "My Portfolio", "Goal Planner", "Risk Profile"],
  },
  ADVISOR: {
    label: "Advisor Workspace",
    shortLabel: "Advisor",
    description: "Manage assigned clients and suitability reviews",
    badge: "Client advisory desk",
    dashboardLabel: "Advisor workspace",
    heroTitle: "From client data to",
    heroPixel: "better advice",
    intro:
      "A client-book workspace for suitability review, portfolio diagnostics, fund shortlists and advisory reporting.",
    guardrail:
      "Advisors review assigned client data and recommendations; execution requires investor approval.",
    primaryAction: "Review Clients",
    nav: [
      { name: "Client Book", href: "/dashboard", icon: "users", code: "01" },
      { name: "Suitability", href: "/dashboard", icon: "target", code: "02" },
      { name: "Shortlists", href: "/screener", icon: "compass", code: "03" },
      { name: "Review Reports", href: "/reports", icon: "file", code: "04" },
    ],
    capabilities: [
      {
        label: "Review client portfolios",
        description: "See client holdings, transactions, allocation gaps and risk-context snapshots.",
      },
      {
        label: "Prepare suitability notes",
        description: "Convert portfolio signals into review-ready advice and rationale.",
      },
      {
        label: "Build approved shortlists",
        description: "Compare funds and stage recommended schemes for client approval.",
      },
    ],
    permissions: [
      {
        label: "Assigned clients only",
        description: "Access is scoped to mapped clients and their advisory records.",
      },
      {
        label: "Recommendation drafting",
        description: "Create notes, shortlists and review reports without placing orders directly.",
      },
      {
        label: "Read-only fund universe",
        description: "Inspect and compare schemes, but fund master data remains AMC/admin controlled.",
      },
    ],
    reports: [
      {
        label: "Client review pack",
        description: "Portfolio health, risk fit, allocation drift and recommended next actions.",
      },
      {
        label: "Suitability exceptions",
        description: "Clients whose portfolio mix diverges from their declared risk profile.",
      },
      {
        label: "Advisor activity log",
        description: "Notes, shortlists and review events prepared for compliance audit.",
      },
    ],
    quickActions: ["Review Clients", "Suitability Notes", "Fund Shortlist", "Advisor Reports"],
  },
  AMC: {
    label: "AMC Control",
    shortLabel: "AMC",
    description: "Operate schemes, factsheets and product analytics",
    badge: "Fund house control room",
    dashboardLabel: "AMC control",
    heroTitle: "From scheme data to",
    heroPixel: "market reach",
    intro:
      "A fund-house control surface for scheme freshness, AUM movement, category reach and factsheet readiness.",
    guardrail:
      "AMC users manage product-level data and aggregated insights, not individual investor PII.",
    primaryAction: "Scheme Monitor",
    nav: [
      { name: "Scheme Registry", href: "/dashboard", icon: "layers", code: "01" },
      { name: "Factsheets", href: "/reports", icon: "file", code: "02" },
      { name: "Product Analytics", href: "/dashboard", icon: "pie", code: "03" },
      { name: "Inflow Monitor", href: "/dashboard", icon: "target", code: "04" },
    ],
    capabilities: [
      {
        label: "Monitor scheme freshness",
        description: "Track NAV sync coverage, category distribution and stale product rows.",
      },
      {
        label: "Publish factsheet inputs",
        description: "Prepare product statistics, AUM context and scheme data for factsheets.",
      },
      {
        label: "Read aggregate demand",
        description: "Use category, view and inflow signals without exposing investor-level data.",
      },
    ],
    permissions: [
      {
        label: "Product data stewardship",
        description: "Manage fund metadata, categories, factsheet queues and product analytics.",
      },
      {
        label: "Aggregate-only investor insight",
        description: "See demand and inflow patterns without accessing personal portfolios.",
      },
      {
        label: "No platform administration",
        description: "Cannot assign user roles, change auth policy or operate infrastructure settings.",
      },
    ],
    reports: [
      {
        label: "Scheme freshness report",
        description: "NAV coverage, missing factsheet fields and stale data flags.",
      },
      {
        label: "Category pulse",
        description: "AUM, scheme count and return spread by category.",
      },
      {
        label: "Product reach summary",
        description: "Aggregated views, shortlist signals and direct inflow checks.",
      },
    ],
    quickActions: ["Scheme Monitor", "AUM Ranking", "Factsheet Queue", "Inflow Review"],
  },
  RESEARCHER: {
    label: "Research Hub",
    shortLabel: "Research",
    description: "Convert fund signals into published insights",
    badge: "Editorial and signal desk",
    dashboardLabel: "Research hub",
    heroTitle: "From insight to",
    heroPixel: "trusted signal",
    intro:
      "A research workspace for ranking funds, detecting category movement, drafting insights and reviewing readership signals.",
    guardrail:
      "Researchers can publish analysis and signals, but cannot place trades or change fund master data.",
    primaryAction: "Signal Ranking",
    nav: [
      { name: "Signal Lab", href: "/dashboard", icon: "compass", code: "01" },
      { name: "Draft Insights", href: "/dashboard", icon: "file", code: "02" },
      { name: "Research Library", href: "/reports", icon: "layers", code: "03" },
      { name: "Readership", href: "/dashboard", icon: "pie", code: "04" },
    ],
    capabilities: [
      {
        label: "Rank research signals",
        description: "Turn returns, categories and market-data coverage into publishable signals.",
      },
      {
        label: "Draft fund commentary",
        description: "Create insight queues for outliers, category changes and benchmark context.",
      },
      {
        label: "Track credibility",
        description: "Review readership, peer-review status and research coverage gaps.",
      },
    ],
    permissions: [
      {
        label: "Research publishing",
        description: "Create, update and publish commentary and signal summaries.",
      },
      {
        label: "Read-only financial data",
        description: "Inspect fund and aggregate market data without changing orders or portfolios.",
      },
      {
        label: "No execution authority",
        description: "Cannot create investments, approve KYC or manage platform access.",
      },
    ],
    reports: [
      {
        label: "Signal ranking",
        description: "Top and bottom schemes by return, category and data freshness.",
      },
      {
        label: "Research coverage map",
        description: "Categories with strong, weak or missing insight coverage.",
      },
      {
        label: "Insight queue",
        description: "Drafts, review status and publish-ready research packs.",
      },
    ],
    quickActions: ["Signal Ranking", "Category Pulse", "Draft Insight", "Research Queue"],
  },
  ADMIN: {
    label: "System Admin",
    shortLabel: "Admin",
    description: "Operate access, integrations and platform health",
    badge: "Platform operations",
    dashboardLabel: "System admin",
    heroTitle: "From platform logs to",
    heroPixel: "stable ops",
    intro:
      "A runtime operations console for users, roles, data sync status, portfolio records, transactions and backend availability.",
    guardrail:
      "Admins manage platform controls and access policy; investment decisions stay with investors and advisors.",
    primaryAction: "Runtime Check",
    nav: [
      { name: "Runtime Control", href: "/dashboard", icon: "shield", code: "01" },
      { name: "User Access", href: "/dashboard", icon: "users", code: "02" },
      { name: "Sync Operations", href: "/dashboard", icon: "settings", code: "03" },
      { name: "Audit & Settings", href: "/reports", icon: "file", code: "04" },
    ],
    capabilities: [
      {
        label: "Control user access",
        description: "Audit accounts, role assignments, KYC state and access boundaries.",
      },
      {
        label: "Monitor data pipelines",
        description: "Inspect fund sync, backend availability, Redis status and API freshness.",
      },
      {
        label: "Operate audit controls",
        description: "Review transaction counts, portfolio records and operational exceptions.",
      },
    ],
    permissions: [
      {
        label: "Role and access management",
        description: "Manage roles, accounts, access boundaries and operational policy.",
      },
      {
        label: "Integration operations",
        description: "Monitor providers, sync jobs, cache health and backend data availability.",
      },
      {
        label: "Audit visibility",
        description: "View platform-wide logs, counts and exceptions without impersonating advice.",
      },
    ],
    reports: [
      {
        label: "Access audit",
        description: "Users, roles, KYC state and permission boundaries for review.",
      },
      {
        label: "Fund sync health",
        description: "Backend source mode, scheme count, cache freshness and pipeline status.",
      },
      {
        label: "Order operations",
        description: "Portfolio and transaction volumes with exception monitoring.",
      },
    ],
    quickActions: ["Runtime Check", "User Registry", "Fund Sync", "Audit Trail"],
  },
};

export function getRoleDefinition(role: UserRole) {
  return roleDefinitions[role];
}

export function parseUserRole(role: string | null | undefined): UserRole {
  return role && role in roleDefinitions ? (role as UserRole) : "INVESTOR";
}
