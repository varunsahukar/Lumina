import type { Metadata } from "next";
import { Fira_Sans, Merriweather, Volkhov } from "next/font/google";
import "./globals.css";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
});

const volkhov = Volkhov({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-subheading",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "LuminaVest - Mutual Fund Investment Marketplace",
  description: "Invest in mutual funds with LuminaVest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${firaSans.variable} ${volkhov.variable} ${merriweather.variable} bg-[#f7eee8] text-[#070707] min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
