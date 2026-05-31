"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CheckCircle2, IndianRupee, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecentTransaction {
  id: string;
  schemeName: string;
  amount: number;
  units: number;
  status: string;
  type: string;
  date: string;
}

export default function PaymentPage() {
  const [params, setParams] = useState({
    transactionId: "",
    fund: "Selected fund",
    amount: 0,
    units: 0,
    type: "BUY",
  });
  const [transaction, setTransaction] = useState<RecentTransaction | null>(null);
  const { transactionId, fund, amount, units, type } = params;
  const [isLoading, setIsLoading] = useState(Boolean(transactionId));

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const nextParams = {
      transactionId: searchParams.get("transactionId") || "",
      fund: searchParams.get("fund") || "Selected fund",
      amount: Number(searchParams.get("amount") || 0),
      units: Number(searchParams.get("units") || 0),
      type: searchParams.get("type") || "BUY",
    };
    setParams(nextParams);
    setIsLoading(Boolean(nextParams.transactionId));
  }, []);

  useEffect(() => {
    if (!transactionId) {
      setIsLoading(false);
      return;
    }

    const loadTransaction = async () => {
      try {
        const response = await fetch("/api/investments", { cache: "no-store" });
        const json = await response.json();
        const match = (json.data?.recentTransactions || []).find(
          (item: RecentTransaction) => item.id === transactionId
        );
        setTransaction(match || null);
      } catch (error) {
        console.error("Unable to load payment transaction", error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadTransaction();
  }, [transactionId]);

  const fallback = useMemo(
    () => ({
      schemeName: fund,
      amount,
      units,
      type,
      status: transactionId ? "COMPLETED" : "READY",
      date: new Date().toISOString(),
    }),
    [amount, fund, type, units, transactionId]
  );

  const payment = transaction || fallback;

  return (
    <div className="mx-auto max-w-6xl space-y-8 text-[#070707] dark:text-[#f7eee8]">
      <section className="agency-hard-shadow border-[3px] border-black bg-[#f7eee8] dark:border-[#f7eee8]/25 dark:bg-[#0b0b0b]">
        <div className="grid gap-8 border-b-[3px] border-black p-7 dark:border-[#f7eee8]/20 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="agency-label mb-4">Payment</p>
            <h1 className="text-5xl font-black leading-none sm:text-7xl">
              Investment confirmation
            </h1>
          </div>
          <div className="grid h-20 w-20 place-items-center border-[3px] border-black bg-[#4ba1a7] shadow-[6px_6px_0_#000] dark:border-[#f7eee8]/25">
            {isLoading ? (
              <Loader2 className="h-8 w-8 animate-spin text-black" />
            ) : (
              <CheckCircle2 className="h-9 w-9 text-black" />
            )}
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b-[3px] border-black p-7 dark:border-[#f7eee8]/20 lg:border-b-0 lg:border-r-[3px]">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#5b5652] dark:text-[#bdb5ae]">
              Amount
            </p>
            <p className="agency-pixel flex items-center text-[4rem] leading-none text-[#c95545] dark:text-[#4ba1a7]">
              <IndianRupee className="mr-1 h-10 w-10" />
              {payment.amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <PaymentStat label="Units" value={payment.units ? payment.units.toFixed(4) : "--"} />
              <PaymentStat label="Type" value={payment.type} />
            </div>
          </div>

          <div className="p-7">
            <div className="border-[3px] border-black bg-white p-6 shadow-[6px_6px_0_#000] dark:border-[#f7eee8]/25 dark:bg-[#141414] dark:shadow-[6px_6px_0_#c95545]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5b5652] dark:text-[#bdb5ae]">
                Scheme
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-black dark:text-[#f7eee8]">
                {payment.schemeName}
              </h2>
              <div className="mt-6 grid gap-3 text-sm font-bold">
                <PaymentRow label="Status" value={payment.status} />
                <PaymentRow
                  label="Transaction"
                  value={transactionId || "After investment"}
                />
                <PaymentRow
                  label="Date"
                  value={new Date(payment.date).toLocaleString("en-IN")}
                />
              </div>
            </div>

            <div className="mt-7 flex items-center gap-3 border-[3px] border-black bg-[#dff5f1] p-4 text-sm font-bold text-[#082f33] dark:border-[#f7eee8]/25 dark:bg-[#123f45] dark:text-[#bcece6]">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              This comes from the investment record.
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-4">
        <Button
          asChild
          className="h-12 rounded-none border-[3px] border-black bg-[#4ba1a7] px-6 font-bold text-black shadow-[5px_5px_0_#000] hover:bg-[#5fb8be]"
        >
          <Link href="/portfolio">
            View portfolio
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-12 rounded-none border-[3px] border-black bg-white px-6 font-bold text-black dark:border-[#f7eee8]/25 dark:bg-[#141414] dark:text-[#f7eee8]"
        >
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}

function PaymentStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-[3px] border-black bg-white p-4 dark:border-[#f7eee8]/25 dark:bg-[#141414]">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5b5652] dark:text-[#bdb5ae]">
        {label}
      </p>
      <p className="mt-3 truncate text-xl font-black text-black dark:text-[#f7eee8]">{value}</p>
    </div>
  );
}

function PaymentRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#d8cec7] pb-3 last:border-b-0 dark:border-[#f7eee8]/15">
      <span className="uppercase tracking-[0.12em] text-[#5b5652] dark:text-[#bdb5ae]">
        {label}
      </span>
      <span className="min-w-0 truncate text-right text-black dark:text-[#f7eee8]">
        {value}
      </span>
    </div>
  );
}
