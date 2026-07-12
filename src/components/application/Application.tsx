"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./Application.module.css";

type YesNo = "" | "Yes" | "No";
type Availability = "" | "Full-Time" | "Part-Time";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  state: string;
  occupation: string;
  availability: Availability;
  licensed: YesNo;
  salesExperience: YesNo;
  interest: string;
  acknowledgmentContractor: boolean;
  acknowledgmentLicense: boolean;
  acknowledgmentAccurate: boolean;
};

type ErrorState = Partial<Record<keyof FormState, string>>;
type TouchedState = Partial<Record<keyof FormState, boolean>>;

const initialForm: FormState = {
  fullName: "",
  phone: "",
  email: "",
  state: "",
  occupation: "",
  availability: "",
  licensed: "",
  salesExperience: "",
  interest: "",
  acknowledgmentContractor: false,
  acknowledgmentLicense: false,
  acknowledgmentAccurate: false,
};

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
  const [touched, setTouched] = useState<TouchedState>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return window.location.href;
  }, []);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const markTouched = (field: keyof FormState) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const validate = (values: FormState) => {
    const nextErrors: ErrorState = {};
    const requiredText: Array<keyof FormState> = ["fullName", "phone", "email", "state", "occupation", "interest"];
    const requiredChoices: Array<keyof FormState> = ["availability", "licensed", "salesExperience"];

    requiredText.forEach((field) => {
      if (typeof values[field] === "string" && !values[field].trim()) {
        nextErrors[field] = "Please complete this field.";
      }
    });

    requiredChoices.forEach((field) => {
      if (!values[field]) {
        nextErrors[field] = "Please choose an answer.";
      }
    });

    if (values.email && !isValidEmail(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (values.phone && getPhoneDigits(values.phone).length < 10) {
      nextErrors.phone = "Enter a phone number with at least 10 digits.";
    }

    if (!values.acknowledgmentContractor) {
      nextErrors.acknowledgmentContractor = "Please confirm this acknowledgment.";
    }

    if (!values.acknowledgmentLicense) {
      nextErrors.acknowledgmentLicense = "Please confirm this acknowledgment.";
    }

    if (!values.acknowledgmentAccurate) {
      nextErrors.acknowledgmentAccurate = "Please confirm this acknowledgment.";
    }

    return nextErrors;
  };

  const errors = validate(form);
  const shouldShowError = (field: keyof FormState) => Boolean(errors[field] && (touched[field] || hasSubmitted));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setHasSubmitted(true);

    if (Object.keys(errors).length > 0) {
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
    shouldShowError(field) ? (
      <p className={styles.error} id={`${field}-error`} role="alert">
        {errors[field]}
      </p>
    ) : null;

  const describedBy = (field: keyof FormState) => (shouldShowError(field) ? `${field}-error` : undefined);
  const invalidState = (field: keyof FormState) => shouldShowError(field);

  const renderSegmentedChoice = <K extends "availability" | "licensed" | "salesExperience">(
    field: K,
    legend: string,
    options: Array<FormState[K]>,
  ) => (
    <fieldset className={styles.fieldset} aria-describedby={describedBy(field)}>
      <legend>{legend}</legend>
      <div className={styles.segmented}>
        {options.map((option) => (
          <label key={option} className={styles.segment}>
            <input
              type="radio"
              name={field}
              value={option}
              checked={form[field] === option}
              onBlur={() => markTouched(field)}
              onChange={() => updateField(field, option)}
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

        <div className={styles.timeBadge}>⏱ Estimated Time: About 2 Minutes</div>

        <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
          <div className={styles.formIntro}>
            <p className={styles.stepLabel}>Application</p>
            <p className={styles.progressText}>Step 1 of 1</p>
            <h3>Let&rsquo;s Get To Know You.</h3>
            <p>
              This short application helps us understand your background so we can determine whether
              the opportunity may be a good fit. It should take about 2 minutes.
            </p>
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
                  <input type="text" value={form.fullName} onBlur={() => markTouched("fullName")} onChange={(event) => updateField("fullName", event.target.value)} required aria-describedby={describedBy("fullName")} aria-invalid={invalidState("fullName")} />
                  {renderError("fullName")}
                </label>

                <label className={styles.field}>
                  <span>Phone Number</span>
                  <input type="tel" value={form.phone} onBlur={() => markTouched("phone")} onChange={(event) => updateField("phone", event.target.value)} required aria-describedby={describedBy("phone")} aria-invalid={invalidState("phone")} />
                  {renderError("phone")}
                </label>

                <label className={styles.field}>
                  <span>Email</span>
                  <input type="email" value={form.email} onBlur={() => markTouched("email")} onChange={(event) => updateField("email", event.target.value)} required aria-describedby={describedBy("email")} aria-invalid={invalidState("email")} />
                  {renderError("email")}
                </label>

                <label className={styles.field}>
                  <span>State</span>
                  <input type="text" value={form.state} onBlur={() => markTouched("state")} onChange={(event) => updateField("state", event.target.value)} required aria-describedby={describedBy("state")} aria-invalid={invalidState("state")} />
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
                  <input type="text" value={form.occupation} onBlur={() => markTouched("occupation")} onChange={(event) => updateField("occupation", event.target.value)} required aria-describedby={describedBy("occupation")} aria-invalid={invalidState("occupation")} />
                  {renderError("occupation")}
                </label>

                {renderSegmentedChoice("availability", "Full-Time / Part-Time Availability", ["Full-Time", "Part-Time"])}
                {renderSegmentedChoice("licensed", "Currently Licensed?", ["Yes", "No"])}
                {renderSegmentedChoice("salesExperience", "Previous Sales Experience?", ["Yes", "No"])}
              </div>
            </section>

            <section className={styles.formGroup} aria-labelledby="more-details-heading">
              <div className={styles.groupHeader}>
                <div>
                  <h3 id="more-details-heading">Just A Few More Details</h3>
                  <p>Give us a clearer picture of what caught your attention.</p>
                </div>
                <span aria-hidden="true" />
              </div>

              <label className={styles.field}>
                <span>What interests you about this opportunity?</span>
                <textarea value={form.interest} onBlur={() => markTouched("interest")} onChange={(event) => updateField("interest", event.target.value)} placeholder="Share what made you want to learn more." required rows={5} aria-describedby={describedBy("interest")} aria-invalid={invalidState("interest")} />
                {renderError("interest")}
              </label>
            </section>
          </div>

          <div className={styles.acknowledgments}>
            <div className={styles.ackHeader}>
              <h3>Before You Submit</h3>
              <p>Please review the following acknowledgements before submitting your application.</p>
            </div>

            <label className={styles.checkbox}>
              <input type="checkbox" checked={form.acknowledgmentContractor} onBlur={() => markTouched("acknowledgmentContractor")} onChange={(event) => updateField("acknowledgmentContractor", event.target.checked)} required aria-describedby={describedBy("acknowledgmentContractor")} />
              <span>I understand this is a performance-based independent contractor opportunity and earnings are not guaranteed.</span>
            </label>
            {renderError("acknowledgmentContractor")}

            <label className={styles.checkbox}>
              <input type="checkbox" checked={form.acknowledgmentLicense} onBlur={() => markTouched("acknowledgmentLicense")} onChange={(event) => updateField("acknowledgmentLicense", event.target.checked)} required aria-describedby={describedBy("acknowledgmentLicense")} />
              <span>I understand a life insurance license is required before selling insurance.</span>
            </label>
            {renderError("acknowledgmentLicense")}

            <label className={styles.checkbox}>
              <input type="checkbox" checked={form.acknowledgmentAccurate} onBlur={() => markTouched("acknowledgmentAccurate")} onChange={(event) => updateField("acknowledgmentAccurate", event.target.checked)} required aria-describedby={describedBy("acknowledgmentAccurate")} />
              <span>The information I have provided is accurate.</span>
            </label>
            {renderError("acknowledgmentAccurate")}
          </div>

          <div className={styles.nextSteps}>
            <h3>What Happens Next?</h3>
            <ul>
              <li>We&rsquo;ll review your application.</li>
              <li>Qualified applicants will be contacted to schedule a company overview.</li>
              <li>You&rsquo;ll have the opportunity to learn more before making any decision.</li>
            </ul>
          </div>

          <div className={styles.submitArea}>
            <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting…" : "Start My Application →"}
            </button>
            <p className={styles.helperText}>
              Applications are reviewed regularly.
              <br />
              Qualified applicants will be contacted regarding next steps.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
