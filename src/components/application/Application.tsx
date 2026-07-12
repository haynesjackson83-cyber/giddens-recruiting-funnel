"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./Application.module.css";

type YesNo = "" | "Yes" | "No";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  state: string;
  occupation: string;
  fullTime: YesNo;
  licensed: YesNo;
  salesExperience: YesNo;
  performanceComp: YesNo;
  workSetup: YesNo;
  availability: string;
  whyNow: string;
  source: string;
  referralName: string;
  acknowledgmentContractor: boolean;
  acknowledgmentLicense: boolean;
  acknowledgmentAccurate: boolean;
};

type ErrorState = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  fullName: "",
  phone: "",
  email: "",
  state: "",
  occupation: "",
  fullTime: "",
  licensed: "",
  salesExperience: "",
  performanceComp: "",
  workSetup: "",
  availability: "",
  whyNow: "",
  source: "",
  referralName: "",
  acknowledgmentContractor: false,
  acknowledgmentLicense: false,
  acknowledgmentAccurate: false,
};

const heardOptions = ["Reddit", "Facebook", "Indeed", "ZipRecruiter", "Referral", "Social Media", "Google", "Other"];
const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getPhoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

async function submitApplication(payload: Record<string, unknown>) {
  // TODO: Send this payload to the future Google Sheets or webhook endpoint.
  // Do not add private keys or secrets to client-side code.
  if (process.env.NODE_ENV === "development") {
    console.info("Application submission payload", payload);
  }

  await new Promise((resolve) => setTimeout(resolve, 650));
}

export function Application() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<ErrorState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return window.location.href;
  }, []);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const nextErrors: ErrorState = {};
    const requiredText: Array<keyof FormState> = [
      "fullName",
      "phone",
      "email",
      "state",
      "occupation",
      "availability",
      "whyNow",
      "source",
    ];
    const requiredChoices: Array<keyof FormState> = [
      "fullTime",
      "licensed",
      "salesExperience",
      "performanceComp",
      "workSetup",
    ];

    requiredText.forEach((field) => {
      if (typeof form[field] === "string" && !form[field].trim()) {
        nextErrors[field] = "Please complete this field.";
      }
    });

    requiredChoices.forEach((field) => {
      if (!form[field]) {
        nextErrors[field] = "Please choose an answer.";
      }
    });

    if (form.email && !isValidEmail(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (form.phone && getPhoneDigits(form.phone).length < 10) {
      nextErrors.phone = "Enter a phone number with at least 10 digits.";
    }

    if (!form.acknowledgmentContractor) {
      nextErrors.acknowledgmentContractor = "Please confirm this acknowledgment.";
    }

    if (!form.acknowledgmentLicense) {
      nextErrors.acknowledgmentLicense = "Please confirm this acknowledgment.";
    }

    if (!form.acknowledgmentAccurate) {
      nextErrors.acknowledgmentAccurate = "Please confirm this acknowledgment.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(utmKeys.map((key) => [key, params.get(key) ?? ""]));
    const payload = {
      ...form,
      timestamp: new Date().toISOString(),
      pageUrl: currentUrl || window.location.href,
      utm,
    };

    try {
      await submitApplication(payload);
      router.push("/thank-you");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (field: keyof FormState) =>
    errors[field] ? (
      <p className={styles.error} id={`${field}-error`} role="alert">
        {errors[field]}
      </p>
    ) : null;

  const describedBy = (field: keyof FormState) => (errors[field] ? `${field}-error` : undefined);

  const renderSegmentedChoice = (field: keyof FormState, legend: string) => (
    <fieldset className={`${styles.fieldset} ${styles.fullWidth}`} aria-describedby={describedBy(field)}>
      <legend>{legend}</legend>
      <div className={styles.segmented}>
        {(["Yes", "No"] as const).map((option) => (
          <label key={option} className={styles.segment}>
            <input
              type="radio"
              name={field}
              value={option}
              checked={form[field] === option}
              onChange={() => updateField(field, option as FormState[typeof field])}
              required
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {renderError(field)}
    </fieldset>
  );

  return (
    <section id="apply" className={styles.section} aria-labelledby="application-heading">
      <div className={styles.topGlow} aria-hidden="true" />
      <div className={styles.sideGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>QUICK APPLICATION</p>
          <h2 id="application-heading" className={styles.headline}>
            <span>Take the First Step</span>
            <span>
              Toward <em>Your Next Chapter.</em>
            </span>
          </h2>
          <p className={styles.supportingCopy}>
            This application takes about two minutes. We&rsquo;re looking for coachability,
            communication, consistency, and long-term potential—not a perfect résumé.
          </p>
        </div>

        <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
          <div className={styles.formIntro}>
            <p className={styles.stepLabel}>STEP 1 OF 1</p>
            <h3>Quick Application</h3>
            <p>
              This takes about two minutes. We&rsquo;re simply looking to learn a little about you before
              deciding whether the next conversation makes sense.
            </p>
            <ul className={styles.reassuranceList} aria-label="Application reassurances">
              <li>No résumé required</li>
              <li>No insurance experience required</li>
              <li>About 2 minutes</li>
            </ul>
          </div>

          <div className={styles.formGroups}>
            <section className={styles.formGroup} aria-labelledby="basic-information-heading">
              <div className={styles.groupHeader}>
                <div>
                  <h3 id="basic-information-heading">Basic Information</h3>
                  <p>Tell us how to reach you.</p>
                </div>
                <span aria-hidden="true" />
              </div>

              <div className={styles.twoColumnGrid}>
                <label className={styles.field}>
                  <span>Full Name</span>
                  <input type="text" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} required aria-describedby={describedBy("fullName")} aria-invalid={Boolean(errors.fullName)} />
                  {renderError("fullName")}
                </label>

                <label className={styles.field}>
                  <span>Phone Number</span>
                  <input type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} required aria-describedby={describedBy("phone")} aria-invalid={Boolean(errors.phone)} />
                  {renderError("phone")}
                </label>

                <label className={styles.field}>
                  <span>Email Address</span>
                  <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required aria-describedby={describedBy("email")} aria-invalid={Boolean(errors.email)} />
                  {renderError("email")}
                </label>

                <label className={styles.field}>
                  <span>State</span>
                  <input type="text" value={form.state} onChange={(event) => updateField("state", event.target.value)} required aria-describedby={describedBy("state")} aria-invalid={Boolean(errors.state)} />
                  {renderError("state")}
                </label>
              </div>
            </section>

            <section className={styles.formGroup} aria-labelledby="about-you-heading">
              <div className={styles.groupHeader}>
                <div>
                  <h3 id="about-you-heading">About You</h3>
                  <p>Help us understand your current situation and readiness.</p>
                </div>
                <span aria-hidden="true" />
              </div>

              <div className={styles.singleColumnGrid}>
                <label className={styles.field}>
                  <span>Current Occupation</span>
                  <input type="text" value={form.occupation} onChange={(event) => updateField("occupation", event.target.value)} required aria-describedby={describedBy("occupation")} aria-invalid={Boolean(errors.occupation)} />
                  {renderError("occupation")}
                </label>

                {renderSegmentedChoice("fullTime", "Are you currently looking for a full-time opportunity?")}
                {renderSegmentedChoice("licensed", "Are you currently licensed to sell life insurance?")}
                {renderSegmentedChoice("salesExperience", "Have you worked in sales before?")}
                {renderSegmentedChoice("performanceComp", "Are you comfortable earning based on performance rather than hourly pay?")}
                {renderSegmentedChoice("workSetup", "Do you have access to a computer, reliable internet, and a quiet place to work?")}
              </div>
            </section>

            <section className={styles.formGroup} aria-labelledby="final-questions-heading">
              <div className={styles.groupHeader}>
                <div>
                  <h3 id="final-questions-heading">Final Questions</h3>
                  <p>Give us a clearer picture of your timing and goals.</p>
                </div>
                <span aria-hidden="true" />
              </div>

              <div className={styles.singleColumnGrid}>
                <label className={styles.field}>
                  <span>How soon would you be available for a Zoom interview?</span>
                  <input type="text" value={form.availability} onChange={(event) => updateField("availability", event.target.value)} placeholder="Example: Within 48 hours, this week, or next week" required aria-describedby={describedBy("availability")} aria-invalid={Boolean(errors.availability)} />
                  {renderError("availability")}
                </label>

                <label className={styles.field}>
                  <span>What is motivating you to explore a new opportunity right now?</span>
                  <textarea value={form.whyNow} onChange={(event) => updateField("whyNow", event.target.value)} placeholder="What are you hoping to change, improve, or accomplish?" required rows={6} aria-describedby={describedBy("whyNow")} aria-invalid={Boolean(errors.whyNow)} />
                  {renderError("whyNow")}
                </label>

                <div className={styles.sourceGrid}>
                  <label className={styles.field}>
                    <span>How did you hear about us?</span>
                    <select value={form.source} onChange={(event) => updateField("source", event.target.value)} required aria-describedby={describedBy("source")} aria-invalid={Boolean(errors.source)}>
                      <option value="">Select one</option>
                      {heardOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                    {renderError("source")}
                  </label>

                  {form.source === "Referral" ? (
                    <label className={styles.field}>
                      <span>Referral Name</span>
                      <input type="text" value={form.referralName} onChange={(event) => updateField("referralName", event.target.value)} />
                    </label>
                  ) : null}
                </div>
              </div>
            </section>
          </div>

          <div className={styles.acknowledgments}>
            <label className={styles.checkbox}>
              <input type="checkbox" checked={form.acknowledgmentContractor} onChange={(event) => updateField("acknowledgmentContractor", event.target.checked)} required aria-describedby={describedBy("acknowledgmentContractor")} />
              <span>I understand this is a performance-based independent contractor opportunity and earnings are not guaranteed.</span>
            </label>
            {renderError("acknowledgmentContractor")}

            <label className={styles.checkbox}>
              <input type="checkbox" checked={form.acknowledgmentLicense} onChange={(event) => updateField("acknowledgmentLicense", event.target.checked)} required aria-describedby={describedBy("acknowledgmentLicense")} />
              <span>I understand a life insurance license is required before selling insurance.</span>
            </label>
            {renderError("acknowledgmentLicense")}

            <label className={styles.checkbox}>
              <input type="checkbox" checked={form.acknowledgmentAccurate} onChange={(event) => updateField("acknowledgmentAccurate", event.target.checked)} required aria-describedby={describedBy("acknowledgmentAccurate")} />
              <span>The information I have provided is accurate.</span>
            </label>
            {renderError("acknowledgmentAccurate")}
          </div>

          <div className={styles.submitArea}>
            <p className={styles.submitLead}>We&rsquo;ll review your application and contact qualified applicants regarding next steps.</p>
            <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting…" : "Apply Now →"}
            </button>
            <p className={styles.helperText}>Submitting an application does not guarantee selection.</p>
          </div>
        </form>
      </div>
    </section>
  );
}
