import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";
import "./globals.css";

const title = "Join Giddens | Build a Career Worth Building";
const description =
  "Explore a performance-based life insurance career with structured training, remote flexibility, leadership development, and uncapped earning potential. No experience required. Licensing guidance provided.";
const socialDescription =
  "Explore a performance-based life insurance career with structured training, remote flexibility, leadership development, and uncapped earning potential.";
const url = "https://joingiddens.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  applicationName: "Join Giddens",
  alternates: {
    canonical: url,
  },
  appleWebApp: {
    title: "Join Giddens",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title,
    description: socialDescription,
    url,
    siteName: "Join Giddens",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Join Giddens",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: socialDescription,
    images: ["/og-image.png"],
  },
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
