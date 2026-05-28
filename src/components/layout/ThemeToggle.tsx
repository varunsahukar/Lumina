"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("lumina-theme");
    const nextTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
    applyTheme(nextTheme);
  }, []);

  const applyTheme = (nextTheme: Theme) => {
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("lumina-theme", nextTheme);
    setTheme(nextTheme);
  };

  const nextTheme = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      title={`Switch to ${nextTheme} mode`}
      aria-label={`Switch to ${nextTheme} mode`}
      onClick={() => applyTheme(nextTheme)}
      className={cn(
        "inline-flex h-12 items-center justify-center border-[3px] border-black bg-[#f7eee8] font-bold text-black shadow-[5px_5px_0_#4ba1a7] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 dark:border-[#f7eee8] dark:bg-[#0b0b0b] dark:text-[#f7eee8] dark:shadow-[5px_5px_0_#c95545]",
        compact ? "w-12" : "w-full gap-3 px-4 text-sm"
      )}
    >
      <Icon className="h-5 w-5" />
      {compact ? null : <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
    </button>
  );
}
