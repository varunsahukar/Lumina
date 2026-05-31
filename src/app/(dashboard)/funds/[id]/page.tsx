import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import FundCard from "@/components/fund/FundCard";
import FundDetail from "@/components/fund/FundDetail";
import PerformanceChart from "@/components/fund/PerformanceChart";
import { Button } from "@/components/ui/button";
import {
  backendFetch,
  describeBackendError,
  normalizeFund,
  toNumber,
  unwrapApiData,
} from "@/lib/backend-api";
import { getLocalFund, getLocalFundHistory } from "@/lib/local-funds";

export default async function FundDetailPage({ params }: { params: { id: string } }) {
  const [fundResult, historyResult] = await Promise.allSettled([
    loadFund(params.id),
    loadFundHistory(params.id),
  ]);

  const fund =
    fundResult.status === "fulfilled" && fundResult.value
      ? normalizeFund(fundResult.value)
      : null;
  const history =
    historyResult.status === "fulfilled"
      ? historyResult.value.map((point) => ({
          ...point,
          nav: toNumber(point.nav) ?? 0,
        }))
      : [];

  return (
    <div className="space-y-6 text-[#070707] dark:text-[#f7eee8]">
      <div className="flex flex-col gap-4 border-b-[3px] border-black pb-6 dark:border-[#f7eee8]/25 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-4">
          <Button
            asChild
            variant="outline"
            className="rounded-none border-[3px] border-black bg-[#f7eee8] font-bold text-black shadow-[5px_5px_0_#000] hover:bg-[#4ba1a7] dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b] dark:text-[#f7eee8] dark:shadow-[5px_5px_0_#c95545]"
          >
            <Link href="/screener">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to funds
            </Link>
          </Button>

          <div>
            <p className="agency-label mb-3">Fund Detail</p>
            <h1 className="max-w-5xl text-4xl font-black leading-tight sm:text-5xl">
              {fund?.schemeName || `Fund Details: ${params.id}`}
            </h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {fund && (
            <Button
              asChild
              className="rounded-none border-[3px] border-black bg-[#c95545] px-6 font-bold text-[#f7eee8] shadow-[5px_5px_0_#000] hover:bg-[#4ba1a7] hover:text-black dark:border-[#f7eee8]/25"
            >
              <Link href={`/dashboard?invest=1&fundId=${encodeURIComponent(fund.id)}`}>
                Invest now
              </Link>
            </Button>
          )}

          <Button
            asChild
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-none border-[3px] border-black bg-[#f7eee8] text-black shadow-[5px_5px_0_#000] hover:bg-[#c95545] hover:text-[#f7eee8] dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b] dark:text-[#f7eee8] dark:shadow-[5px_5px_0_#4ba1a7]"
          >
            <Link href="/screener" aria-label="Close fund details and return to funds">
              <X className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {!fund && (
        <div className="border-[3px] border-[#c95545] bg-[#c95545]/10 p-4 text-sm font-bold text-[#c95545]">
          Fund not found. Check the API or try another fund.
        </div>
      )}

      <FundCard fund={fund || undefined} />
      <PerformanceChart history={history} />
      <FundDetail fund={fund || undefined} />
    </div>
  );
}

async function loadFund(id: string) {
  try {
    const payload = await backendFetch<any>(`/funds/${encodeURIComponent(id)}`);
    const fund = unwrapApiData(payload);
    return fund || (await getLocalFund(id));
  } catch (error) {
    console.warn(
      "Backend fund detail unavailable, falling back to local database:",
      describeBackendError(error)
    );
    return getLocalFund(id);
  }
}

async function loadFundHistory(id: string) {
  try {
    const payload = await backendFetch<any[] | { data?: any[] }>(
      `/funds/${encodeURIComponent(id)}/history?days=180`
    );
    return unwrapApiData<any[]>(payload);
  } catch (error) {
    console.warn(
      "Backend fund history unavailable, falling back to local database:",
      describeBackendError(error)
    );
    return getLocalFundHistory(id, { days: 180 });
  }
}
