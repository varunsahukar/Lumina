import Link from "next/link";
import { cn } from "@/lib/utils";

type ServiceTone = "cream" | "red" | "blue" | "teal" | "black";
type PixelIconKind = "brand" | "web" | "desktop" | "mobile" | "chart";

const toneClasses: Record<ServiceTone, string> = {
  cream: "bg-[#f7eee8] text-[#070707]",
  red: "bg-[#cf6a5f] text-[#171717]",
  blue: "bg-[#7b9cc8] text-[#102132]",
  teal: "bg-[#4ba1a7] text-[#092d31]",
  black: "bg-[#0b0b0b] text-[#f7eee8]",
};

export function AgencyLogo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-0 text-[1.7rem] font-black leading-none">
      <span className={cn("italic", dark ? "text-[#4ba1a7]" : "text-[#2d8188]")}>lu</span>
      <span className={dark ? "text-[#f7eee8]" : "text-[#070707]"}>mina</span>
      <span className={dark ? "text-[#cf6a5f]" : "text-[#c95545]"}>v</span>
      <span className={dark ? "text-[#f7eee8]" : "text-[#070707]"}>est</span>
    </Link>
  );
}

export function AccentSquare({ className }: { className?: string }) {
  return <span className={cn("block h-3 w-3 bg-[#c95545]", className)} aria-hidden="true" />;
}

export function PixelIcon({ kind, className }: { kind: PixelIconKind; className?: string }) {
  if (kind === "brand") {
    return (
      <div className={cn("relative h-10 w-10", className)} aria-hidden="true">
        <span className="absolute left-2 top-5 h-3 w-3 bg-black" />
        <span className="absolute left-6 top-3 h-3 w-3 bg-black" />
      </div>
    );
  }

  if (kind === "web") {
    return (
      <div className={cn("grid h-10 w-10 place-items-center border-[7px] border-black", className)} aria-hidden="true">
        <span className="h-3 w-3 bg-black" />
      </div>
    );
  }

  if (kind === "desktop") {
    return (
      <div className={cn("relative h-12 w-14", className)} aria-hidden="true">
        <span className="absolute inset-x-1 top-1 h-8 border-[6px] border-black" />
        <span className="absolute bottom-1 left-1/2 h-4 w-2 -translate-x-1/2 bg-black" />
        <span className="absolute bottom-0 left-1/2 h-1.5 w-7 -translate-x-1/2 bg-black" />
      </div>
    );
  }

  if (kind === "mobile") {
    return (
      <div className={cn("relative h-12 w-8 border-[6px] border-black", className)} aria-hidden="true">
        <span className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 bg-black" />
      </div>
    );
  }

  return (
    <div className={cn("flex h-12 w-14 items-end gap-1", className)} aria-hidden="true">
      <span className="h-4 w-2 bg-black" />
      <span className="h-8 w-2 bg-black" />
      <span className="h-6 w-2 bg-black" />
      <span className="h-11 w-2 bg-black" />
    </div>
  );
}

export function AgencyServiceCard({
  title,
  tone,
  number,
  icon,
  className,
}: {
  title: string;
  tone: ServiceTone;
  number: string;
  icon: PixelIconKind;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "agency-hard-shadow relative flex aspect-[0.72] min-h-[260px] flex-col justify-between border-[3px] border-black p-5",
        toneClasses[tone],
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.18em] opacity-75">{title}</h3>
      </div>
      <div className="grid flex-1 place-items-center">
        <PixelIcon kind={icon} />
      </div>
      <div className="flex items-end justify-between text-xs font-semibold opacity-65">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-current" />
          LMNA-26
        </span>
        <span>CE</span>
      </div>
      <span className="agency-pixel pointer-events-none absolute bottom-0 right-0 text-[8rem] leading-none opacity-10">
        {number}
      </span>
    </article>
  );
}
