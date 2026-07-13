import { NextResponse } from "next/server";

export const runtime = "nodejs";

type AppsScriptResponse = {
  body: unknown;
  status: number;
};

function logDevelopment(message: string, metadata?: unknown) {
  if (process.env.NODE_ENV === "development") {
    console.info(`[application-api] ${message}`, metadata ?? "");
  }
}

function createJsonResponse(body: unknown, status: number) {
  return NextResponse.json(body, { status });
}

async function readAppsScriptResponse(response: Response): Promise<AppsScriptResponse> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return {
      body: await response.json(),
      status: response.status,
    };
  }

  const text = await response.text();

  try {
    return {
      body: JSON.parse(text),
      status: response.status,
    };
  } catch {
    return {
      body: { message: text || response.statusText },
      status: response.status,
    };
  }
}

export async function POST(request: Request) {
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!appsScriptUrl) {
    logDevelopment("GOOGLE_APPS_SCRIPT_URL is not configured");

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

  logDevelopment("Forwarding application submission", payload);

  try {
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const appsScriptResponse = await readAppsScriptResponse(response);

    logDevelopment("Received Apps Script response", {
      status: appsScriptResponse.status,
      body: appsScriptResponse.body,
    });

    if (!response.ok) {
      return createJsonResponse(
        {
          error: "Application submission failed. Please try again.",
          details: appsScriptResponse.body,
        },
        response.status,
      );
    }

    return createJsonResponse(appsScriptResponse.body, response.status);
  } catch (error) {
    logDevelopment("Apps Script request failed", error);

    return createJsonResponse(
      { error: "We could not submit your application right now. Please try again in a moment." },
      502,
    );
  }
}
