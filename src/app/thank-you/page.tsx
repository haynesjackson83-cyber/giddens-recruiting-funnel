import Link from "next/link";

import styles from "./thank-you.module.css";

const timelineSteps = [
  {
    label: "Step 1",
    title: "Application Received",
    copy: "We’ve received your application.",
  },
  {
    label: "Step 2",
    title: "Application Reviewed",
    copy: "Our recruiting team reviews every application.",
  },
  {
    label: "Step 3",
    title: "Company Overview",
    copy: "Qualified applicants are invited to a live overview to learn more and ask questions.",
  },
  {
    label: "Step 4",
    title: "Interview & Next Steps",
    copy: "If it’s a good mutual fit, we’ll discuss the next stage together.",
  },
];

export default function ThankYouPage() {
  return (
    <main className={styles.main}>
      <div className={styles.topGlow} aria-hidden="true" />
      <div className={styles.sideGlow} aria-hidden="true" />
      <section className={styles.container} aria-labelledby="thank-you-heading">
        <p className={styles.eyebrow}>APPLICATION RECEIVED</p>
        <h1 id="thank-you-heading" className={styles.headline}>
          <span>Application</span>
          <span>
            <em>Received.</em>
          </span>
        </h1>
        <p className={styles.body}>
          Thank you for taking the first step.
          <br />
          <br />
          Our recruiting team will review your application, and qualified applicants will be
          contacted to schedule a company overview where you&rsquo;ll learn more before making any
          decision.
        </p>

        <div className={styles.timelineCard}>
          <h2>What Happens Next</h2>
          <ol className={styles.timeline}>
            {timelineSteps.map((step) => (
              <li key={step.title}>
                <span className={styles.timelineDot} aria-hidden="true" />
                <div>
                  <p className={styles.stepLabel}>{step.label}</p>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className={styles.responseCard} aria-labelledby="response-time-heading">
          <h2 id="response-time-heading">Typical Response Time</h2>
          <p>Most qualified applicants hear from our team within 1–2 business days.</p>
        </aside>

        <Link className={styles.button} href="/">
          Return Home
        </Link>
      </section>
    </main>
  );
}
