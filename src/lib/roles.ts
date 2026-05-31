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
    description: "Screen, invest and track goals",
    badge: "Personal wealth workspace",
    dashboardLabel: "Investor workspace",
    heroTitle: "From capital to",
    heroPixel: "confident moves",
    intro:
      "Find funds, invest and track your portfolio.",
    guardrail:
      "Investors only see their own portfolios, orders and reports.",
    primaryAction: "Invest Direct",
    nav: [
      { name: "Fund Screener", href: "/screener", icon: "compass", code: "01" },
      { name: "My Portfolio", href: "/portfolio", icon: "pie", code: "02" },
      { name: "Goal Planner", href: "/dashboard", icon: "target", code: "03" },
      { name: "Tax Center", href: "/reports", icon: "file", code: "04" },
    ],
    capabilities: [
      {
        label: "Compare funds",
        description: "Shortlist by NAV, return, risk and AUM.",
      },
      {
        label: "Invest directly",
        description: "Create one-time or SIP orders.",
      },
      {
        label: "Track portfolio",
        description: "See holdings, gains, goals and transactions.",
      },
    ],
    permissions: [
      {
        label: "Own data only",
        description: "Access personal portfolios and goals.",
      },
      {
        label: "Order creation",
        description: "Place orders after NAV and amount checks.",
      },
      {
        label: "Personal reports",
        description: "Export personal tax and performance reports.",
      },
    ],
    reports: [
      {
        label: "Capital gains statement",
        description: "Gains by fund and holding period.",
      },
      {
        label: "Goal progress summary",
        description: "Progress against live goals.",
      },
      {
        label: "Transaction ledger",
        description: "Buy, sell and SIP rows.",
      },
    ],
    quickActions: ["Invest Direct", "My Portfolio", "Goal Planner", "Risk Profile"],
  },
  ADVISOR: {
    label: "Advisor Workspace",
    shortLabel: "Advisor",
    description: "Review clients and suitability",
    badge: "Client advisory desk",
    dashboardLabel: "Advisor workspace",
    heroTitle: "From client data to",
    heroPixel: "better advice",
    intro:
      "Review client portfolios and prepare advice.",
    guardrail:
      "Advisors draft recommendations. Investors approve execution.",
    primaryAction: "Review Clients",
    nav: [
      { name: "Client Book", href: "/dashboard", icon: "users", code: "01" },
      { name: "Suitability", href: "/dashboard", icon: "target", code: "02" },
      { name: "Shortlists", href: "/screener", icon: "compass", code: "03" },
      { name: "Review Reports", href: "/reports", icon: "file", code: "04" },
    ],
    capabilities: [
      {
        label: "Review portfolios",
        description: "See holdings, gaps and risk context.",
      },
      {
        label: "Write suitability notes",
        description: "Turn signals into clear advice.",
      },
      {
        label: "Build shortlists",
        description: "Stage funds for client approval.",
      },
    ],
    permissions: [
      {
        label: "Assigned clients only",
        description: "Access only mapped clients.",
      },
      {
        label: "Recommendation drafting",
        description: "Create notes and reports, not orders.",
      },
      {
        label: "Read-only fund universe",
        description: "View schemes without editing master data.",
      },
    ],
    reports: [
      {
        label: "Client review pack",
        description: "Health, risk fit and next actions.",
      },
      {
        label: "Suitability exceptions",
        description: "Clients outside their risk profile.",
      },
      {
        label: "Advisor activity log",
        description: "Notes, shortlists and review events.",
      },
    ],
    quickActions: ["Review Clients", "Suitability Notes", "Fund Shortlist", "Advisor Reports"],
  },
  AMC: {
    label: "AMC Control",
    shortLabel: "AMC",
    description: "Manage schemes and factsheets",
    badge: "Fund house control room",
    dashboardLabel: "AMC control",
    heroTitle: "From scheme data to",
    heroPixel: "market reach",
    intro:
      "Track schemes, AUM and factsheet readiness.",
    guardrail:
      "AMC users see product data, not investor PII.",
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
        description: "Track NAV sync and stale rows.",
      },
      {
        label: "Prepare factsheets",
        description: "Review stats, AUM and scheme data.",
      },
      {
        label: "Read aggregate demand",
        description: "See category, view and inflow signals.",
      },
    ],
    permissions: [
      {
        label: "Product data stewardship",
        description: "Manage metadata and factsheet queues.",
      },
      {
        label: "Aggregate-only investor insight",
        description: "See demand without personal portfolios.",
      },
      {
        label: "No platform administration",
        description: "No access to roles or infrastructure.",
      },
    ],
    reports: [
      {
        label: "Scheme freshness report",
        description: "NAV coverage and stale data.",
      },
      {
        label: "Category pulse",
        description: "AUM and count by category.",
      },
      {
        label: "Product reach summary",
        description: "Views, shortlists and inflows.",
      },
    ],
    quickActions: ["Scheme Monitor", "AUM Ranking", "Factsheet Queue", "Inflow Review"],
  },
  RESEARCHER: {
    label: "Research Hub",
    shortLabel: "Research",
    description: "Publish fund insights",
    badge: "Editorial and signal desk",
    dashboardLabel: "Research hub",
    heroTitle: "From insight to",
    heroPixel: "trusted signal",
    intro:
      "Rank funds, draft insights and track readership.",
    guardrail:
      "Researchers publish insights, not trades or fund edits.",
    primaryAction: "Signal Ranking",
    nav: [
      { name: "Signal Lab", href: "/dashboard", icon: "compass", code: "01" },
      { name: "Draft Insights", href: "/dashboard", icon: "file", code: "02" },
      { name: "Research Library", href: "/reports", icon: "layers", code: "03" },
      { name: "Readership", href: "/dashboard", icon: "pie", code: "04" },
    ],
    capabilities: [
      {
        label: "Rank signals",
        description: "Turn returns and categories into signals.",
      },
      {
        label: "Draft commentary",
        description: "Write notes on outliers and categories.",
      },
      {
        label: "Track credibility",
        description: "Review readership and coverage gaps.",
      },
    ],
    permissions: [
      {
        label: "Research publishing",
        description: "Publish commentary and summaries.",
      },
      {
        label: "Read-only financial data",
        description: "Read data without changing orders.",
      },
      {
        label: "No execution authority",
        description: "No investments, KYC or access control.",
      },
    ],
    reports: [
      {
        label: "Signal ranking",
        description: "Top and bottom schemes.",
      },
      {
        label: "Research coverage map",
        description: "Coverage by category.",
      },
      {
        label: "Insight queue",
        description: "Drafts and review status.",
      },
    ],
    quickActions: ["Signal Ranking", "Category Pulse", "Draft Insight", "Research Queue"],
  },
  ADMIN: {
    label: "System Admin",
    shortLabel: "Admin",
    description: "Manage access and health",
    badge: "Platform operations",
    dashboardLabel: "System admin",
    heroTitle: "From platform logs to",
    heroPixel: "stable ops",
    intro:
      "Monitor users, sync, transactions and backend health.",
    guardrail:
      "Admins manage the platform, not investment decisions.",
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
        description: "Audit users, roles and KYC state.",
      },
      {
        label: "Monitor data pipelines",
        description: "Check sync, Redis and API freshness.",
      },
      {
        label: "Operate audit controls",
        description: "Review counts, records and exceptions.",
      },
    ],
    permissions: [
      {
        label: "Role and access management",
        description: "Manage roles and access policy.",
      },
      {
        label: "Integration operations",
        description: "Monitor providers, sync and cache health.",
      },
      {
        label: "Audit visibility",
        description: "View logs and exceptions.",
      },
    ],
    reports: [
      {
        label: "Access audit",
        description: "Users, roles and permissions.",
      },
      {
        label: "Fund sync health",
        description: "Source, scheme count and cache state.",
      },
      {
        label: "Order operations",
        description: "Portfolio and order volumes.",
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
