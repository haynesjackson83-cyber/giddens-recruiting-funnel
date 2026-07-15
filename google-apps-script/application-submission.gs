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

function createJsonResponse_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
