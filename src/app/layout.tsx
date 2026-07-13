import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";
import "./globals.css";

export const metadata: Metadata = {
  title: "Giddens Recruiting Funnel",
  description: "A predictable recruiting funnel for hard-to-fill roles.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        {/* Load Clarity once for the full App Router experience. */}
        <MicrosoftClarity />
        {children}
      </body>
    </html>
  );
}
