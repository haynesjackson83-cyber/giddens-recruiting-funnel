import { NextResponse } from "next/server";

export const runtime = "nodejs";

type AppsScriptResponse = {
  body: unknown;
  contentType: string;
  status: number;
};

type ApplicationPayload = Record<string, unknown> & {
  utm?: Record<string, unknown>;
};

type NormalizedApplication = {
  fullName: string;
  phone: string;
  email: string;
  state: string;
  currentOccupation: string;
  fullTimeOpportunity: string;
  licensed: string;
  salesExperience: string;
  performancePayComfortable: string;
  remoteSetup: string;
  zoomAvailability: string;
  motivation: string;
  referralName: string;
  source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  landingPageUrl: string;
};

const forwardedKeys: Array<keyof NormalizedApplication> = [
  "fullName",
  "phone",
  "email",
  "state",
  "currentOccupation",
  "fullTimeOpportunity",
  "licensed",
  "salesExperience",
  "performancePayComfortable",
  "remoteSetup",
  "zoomAvailability",
  "motivation",
  "referralName",
  "source",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "landingPageUrl",
];

function logAppsScriptSubmission(metadata: {
  appsScriptUrlExists: boolean;
  responseStatus?: number;
  responseContentType?: string;
  appsScriptSuccess?: unknown;
  appsScriptError?: string;
}) {
  console.info("[application-api] Apps Script submission", metadata);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function getString(payload: ApplicationPayload, key: string) {
  return asString(payload[key]);
}

function getUtmString(payload: ApplicationPayload, key: string) {
  return asString(payload.utm?.[key]) || getString(payload, key);
}

function normalizePayload(payload: ApplicationPayload): NormalizedApplication {
  return {
    fullName: getString(payload, "fullName"),
    phone: getString(payload, "phone"),
    email: getString(payload, "email"),
    state: getString(payload, "state"),
    currentOccupation: getString(payload, "currentOccupation") || getString(payload, "occupation"),
    fullTimeOpportunity: getString(payload, "fullTimeOpportunity") || getString(payload, "availability"),
    licensed: getString(payload, "licensed"),
    salesExperience: getString(payload, "salesExperience"),
    performancePayComfortable: getString(payload, "performancePayComfortable"),
    remoteSetup: getString(payload, "remoteSetup"),
    zoomAvailability: getString(payload, "zoomAvailability"),
    motivation: getString(payload, "motivation") || getString(payload, "interest"),
    referralName: getString(payload, "referralName"),
    source: getString(payload, "source"),
    utm_source: getUtmString(payload, "utm_source"),
    utm_medium: getUtmString(payload, "utm_medium"),
    utm_campaign: getUtmString(payload, "utm_campaign"),
    utm_content: getUtmString(payload, "utm_content"),
    utm_term: getUtmString(payload, "utm_term"),
    landingPageUrl: getString(payload, "landingPageUrl") || getString(payload, "pageUrl"),
  };
}

function createFormBody(normalized: NormalizedApplication) {
  const formBody = new URLSearchParams();

  forwardedKeys.forEach((key) => {
    formBody.set(key, normalized[key]);
  });

  return formBody;
}

function createJsonResponse(body: unknown, status: number) {
  return NextResponse.json(body, { status });
}

async function readAppsScriptResponse(response: Response): Promise<AppsScriptResponse> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return {
      body: await response.json(),
      contentType,
      status: response.status,
    };
  }

  const text = await response.text();

  try {
    return {
      body: JSON.parse(text),
      contentType,
      status: response.status,
    };
  } catch {
    return {
      body: { message: text || response.statusText },
      contentType,
      status: response.status,
    };
  }
}

function getAppsScriptSuccess(body: unknown) {
  return isRecord(body) ? body.success : undefined;
}

function getAppsScriptError(body: unknown) {
  if (!isRecord(body)) {
    return undefined;
  }

  const message = asString(body.error) || asString(body.message);
  return message ? message.slice(0, 160) : undefined;
}

export async function POST(request: Request) {
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!appsScriptUrl) {
    logAppsScriptSubmission({ appsScriptUrlExists: false });

    return createJsonResponse(
      { error: "Application submissions are temporarily unavailable. Please try again later." },
      500,
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return createJsonResponse({ error: "Invalid JSON request body." }, 400);
  }

  if (!isRecord(payload)) {
    return createJsonResponse({ error: "Invalid application request body." }, 400);
  }

  const normalized = normalizePayload(payload);
  const formBody = createFormBody(normalized);

  try {
    const response = await fetch(appsScriptUrl.trim(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody.toString(),
      redirect: "follow",
      cache: "no-store",
    });

    const appsScriptResponse = await readAppsScriptResponse(response);
    const appsScriptSuccess = getAppsScriptSuccess(appsScriptResponse.body);
    const appsScriptError = getAppsScriptError(appsScriptResponse.body);

    logAppsScriptSubmission({
      appsScriptUrlExists: true,
      responseStatus: appsScriptResponse.status,
      responseContentType: appsScriptResponse.contentType,
      appsScriptSuccess,
      appsScriptError,
    });

    if (!response.ok) {
      return createJsonResponse(
        { error: "Application submission failed. Please try again." },
        502,
      );
    }

    if (appsScriptSuccess === false) {
      return createJsonResponse(
        { error: "We could not submit your application right now. Please try again in a moment." },
        502,
      );
    }

    return createJsonResponse(appsScriptResponse.body, response.status);
  } catch (error) {
    logAppsScriptSubmission({
      appsScriptUrlExists: true,
      appsScriptError: error instanceof Error ? error.message.slice(0, 160) : "Request failed",
    });

    return createJsonResponse(
      { error: "We could not submit your application right now. Please try again in a moment." },
      502,
    );
  }
}
