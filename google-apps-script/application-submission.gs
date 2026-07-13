const RECRUITER_NOTIFICATION_EMAIL = "ailgiddensorgjhpr@gmail.com";
const RECRUITER_NOTIFICATION_CACHE_SECONDS = 60 * 10;

const APPLICATION_COLUMNS = [
  "Timestamp",
  "Full Name",
  "Phone",
  "Email",
  "State",
  "Current Occupation",
  "Full Time Opportunity",
  "Licensed",
  "Sales Experience",
  "Performance Pay Comfortable",
  "Remote Setup",
  "Zoom Availability",
  "Motivation",
  "Referral Name",
  "Source",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "UTM Content",
  "UTM Term",
  "Landing Page URL",
];

const APPLICATION_FIELDS = [
  "timestamp",
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

function doPost(event) {
  try {
    const application = normalizeApplication_(event);
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = getApplicationSheet_(spreadsheet);

    ensureHeaderRow_(sheet);
    sheet.appendRow(APPLICATION_FIELDS.map((field) => application[field]));

    sendRecruiterNotificationOnce_(application, spreadsheet);

    return createJsonResponse_({ success: true });
  } catch (error) {
    console.error("Application submission failed", error);

    return createJsonResponse_({ success: false, error: "Application submission failed." });
  }
}

function normalizeApplication_(event) {
  const parameters = event && event.parameter ? event.parameter : {};

  return {
    timestamp: new Date().toISOString(),
    fullName: getParameter_(parameters, "fullName"),
    phone: getParameter_(parameters, "phone"),
    email: getParameter_(parameters, "email"),
    state: getParameter_(parameters, "state"),
    currentOccupation: getParameter_(parameters, "currentOccupation"),
    fullTimeOpportunity: getParameter_(parameters, "fullTimeOpportunity"),
    licensed: getParameter_(parameters, "licensed"),
    salesExperience: getParameter_(parameters, "salesExperience"),
    performancePayComfortable: getParameter_(parameters, "performancePayComfortable"),
    remoteSetup: getParameter_(parameters, "remoteSetup"),
    zoomAvailability: getParameter_(parameters, "zoomAvailability"),
    motivation: getParameter_(parameters, "motivation"),
    referralName: getParameter_(parameters, "referralName"),
    source: getParameter_(parameters, "source"),
    utm_source: getParameter_(parameters, "utm_source"),
    utm_medium: getParameter_(parameters, "utm_medium"),
    utm_campaign: getParameter_(parameters, "utm_campaign"),
    utm_content: getParameter_(parameters, "utm_content"),
    utm_term: getParameter_(parameters, "utm_term"),
    landingPageUrl: getParameter_(parameters, "landingPageUrl"),
  };
}

function getParameter_(parameters, key) {
  const value = parameters[key];
  return typeof value === "string" ? value.trim() : "";
}

function getApplicationSheet_(spreadsheet) {
  const sheets = spreadsheet.getSheets();
  return spreadsheet.getSheetByName("Applications") || sheets[0] || spreadsheet.insertSheet("Applications");
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(APPLICATION_COLUMNS);
  }
}

function sendRecruiterNotificationOnce_(application, spreadsheet) {
  const lock = LockService.getScriptLock();
  let lockAcquired = false;

  try {
    lock.waitLock(5000);
    lockAcquired = true;
    const duplicateKey = createNotificationDuplicateKey_(application);
    const cache = CacheService.getScriptCache();

    if (cache.get(duplicateKey)) {
      console.info("Skipped duplicate recruiter notification", duplicateKey);
      return;
    }

    sendRecruiterNotification_(application, spreadsheet.getUrl());
    cache.put(duplicateKey, "sent", RECRUITER_NOTIFICATION_CACHE_SECONDS);
  } catch (error) {
    console.error("Recruiter notification email failed", error);
  } finally {
    if (lockAcquired) {
      lock.releaseLock();
    }
  }
}

function sendRecruiterNotification_(application, spreadsheetUrl) {
  MailApp.sendEmail({
    to: RECRUITER_NOTIFICATION_EMAIL,
    subject: `🚨 New Join Giddens Application - ${application.fullName || "Unknown Applicant"}`,
    body: createRecruiterNotificationBody_(application, spreadsheetUrl),
  });
}

function createRecruiterNotificationBody_(application, spreadsheetUrl) {
  return [
    "New recruiting application received.",
    "",
    "Name:",
    application.fullName,
    "",
    "Phone:",
    application.phone,
    "",
    "Email:",
    application.email,
    "",
    "State:",
    application.state,
    "",
    "Current Occupation:",
    application.currentOccupation,
    "",
    "Source:",
    application.source,
    "",
    "Submitted:",
    application.timestamp,
    "",
    "Google Sheet:",
    spreadsheetUrl,
    "",
    "Call this applicant as soon as possible.",
  ].join("\n");
}

function createNotificationDuplicateKey_(application) {
  const fingerprint = [
    application.fullName,
    application.phone,
    application.email,
    application.state,
    application.currentOccupation,
    application.source,
  ]
    .join("|")
    .toLowerCase();

  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, fingerprint)
    .map((byte) => (byte + 256).toString(16).slice(-2))
    .join("");

  return `recruiter-notification:${digest}`;
}

function createJsonResponse_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
