import { Suspense } from "react";
import Script from "next/script";
import { GoogleAnalyticsPageView } from "./GoogleAnalyticsPageView";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const shouldLoadGoogleAnalytics = Boolean(measurementId) && process.env.NODE_ENV === "production";

export function GoogleAnalytics() {
  if (!shouldLoadGoogleAnalytics || !measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(measurementId)}, {
            send_page_view: true
          });
        `}
      </Script>
      {/* Suspense keeps useSearchParams isolated while tracking App Router navigations. */}
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView measurementId={measurementId} />
      </Suspense>
    </>
  );
}
