import Link from "next/link";

import styles from "./thank-you.module.css";

const timelineSteps = [
  {
    label: "Step 1",
    title: "Watch Your Phone and Email",
    copy: "We may contact you to confirm your information, answer initial questions, and discuss the next step.",
  },
  {
    label: "Step 2",
    title: "Speak With a Recruiter",
    copy: "A recruiter will help determine whether there appears to be a mutual fit and will explain what to expect from the company overview.",
  },
  {
    label: "Step 3",
    title: "Schedule the Company Overview",
    copy: "If selected to continue, your recruiter will help you choose an available overview time Monday through Friday at 9:00 AM, 12:00 PM, or 6:00 PM Central.",
  },
  {
    label: "Step 4",
    title: "Attend and Ask Questions",
    copy: "The overview explains the role, compensation, licensing process, training, expectations, and career path so you can make an informed decision.",
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
          <span>Your Application</span>
          <span><em>Has Been Submitted.</em></span>
        </h1>
        <p className={styles.body}>
          Thank you for taking the first step. Our team will review your application and contact qualified applicants regarding the next stage of the process.
        </p>

        <div className={styles.timelineCard}>
          <h2>NEXT STEPS</h2>
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
          <p>Qualified applicants will be contacted regarding next steps as applications are reviewed.</p>
        </aside>

        <div className={styles.actions}>
          <Link className={styles.button} href="/">Return to Homepage</Link>
          <Link className={styles.secondaryLink} href="/#top">Review the Opportunity</Link>
        </div>
      </section>
    </main>
  );
}
