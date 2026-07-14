import type { NextConfig } from "next";

const trackingRedirects = [
  {
    source: "/reddit",
    utmSource: "reddit",
    utmMedium: "direct_outreach",
    utmCampaign: "recruiting_v1",
    utmContent: "job_seeker_dm",
  },
  {
    source: "/fb",
    utmSource: "facebook",
    utmMedium: "direct_outreach",
    utmCampaign: "recruiting_v1",
    utmContent: "job_seeker_dm",
  },
  {
    source: "/ig",
    utmSource: "instagram",
    utmMedium: "direct_outreach",
    utmCampaign: "recruiting_v1",
    utmContent: "candidate_dm",
  },
  {
    source: "/li",
    utmSource: "linkedin",
    utmMedium: "direct_outreach",
    utmCampaign: "recruiting_v1",
    utmContent: "candidate_dm",
  },
  {
    source: "/referral",
    utmSource: "referral",
    utmMedium: "personal_referral",
    utmCampaign: "recruiting_v1",
    utmContent: "general",
  },
  {
    source: "/indeed",
    utmSource: "indeed",
    utmMedium: "job_board",
    utmCampaign: "recruiting_v1",
    utmContent: "job_listing",
  },
] as const;

const nextConfig: NextConfig = {
  async redirects() {
    return trackingRedirects.map(
      ({ source, utmSource, utmMedium, utmCampaign, utmContent }) => ({
        source,
        destination: `/?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}&utm_content=${utmContent}`,
        permanent: false,
      }),
    );
  },
};

export default nextConfig;
