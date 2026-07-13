import Link from "next/link";

import styles from "./thank-you.module.css";

const timelineSteps = [
  {
    number: "01",
    title: "Watch Your Phone and Email",
    copy: "We may contact you to confirm your information, answer initial questions, and discuss the next step.",
  },
  {
    number: "02",
    title: "Speak With a Recruiter",
    copy: "A recruiter will help determine whether there appears to be a mutual fit and explain what to expect from the company overview.",
  },
  {
    number: "03",
    title: "Schedule the Company Overview",
    copy: "If selected to continue, your recruiter will help you choose an available overview time Monday through Friday at 9:00 AM, 12:00 PM, or 6:00 PM Central.",
  },
  {
    number: "04",
    title: "Attend and Ask Questions",
    copy: "The overview covers the role, compensation, licensing process, training, expectations, and career path so you can make an informed decision.",
  },
];

export default function ThankYouPage() {
  return (
    <main className={styles.main}>
      <div className={styles.topGlow} aria-hidden="true" />
      <div className={styles.sideGlow} aria-hidden="true" />

      <section className={styles.container} aria-labelledby="thank-you-heading">
        <header className={styles.header}>
          <p className={styles.eyebrow}>APPLICATION RECEIVED</p>
          <h1 id="thank-you-heading" className={styles.headline}>
            <span>Your Application</span>
            <span>
              <em>Has Been Submitted.</em>
            </span>
          </h1>
          <p className={styles.body}>
            Thank you for taking the first step. Our team will review your information and contact
            qualified applicants regarding the next stage of the process.
          </p>
        </header>

        <div className={styles.completionSignal} aria-label="Application complete">
          <span className={styles.checkIcon} aria-hidden="true">✓</span>
          <span>APPLICATION COMPLETE</span>
        </div>

        <section className={styles.nextSteps} aria-labelledby="next-steps-heading">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>WHAT HAPPENS NEXT</p>
            <h2 id="next-steps-heading" className={styles.sectionHeadline}>
              <span>Your Next Steps</span>
              <span>
                <em>Are Clear.</em>
              </span>
            </h2>
          </div>

          <ol className={styles.stepsGrid}>
            {timelineSteps.map((step, index) => (
              <li key={step.title} className={styles.stepCard} style={{ "--step-index": index } as React.CSSProperties}>
                <span className={styles.stepNumber}>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside className={styles.responseStrip} aria-labelledby="response-expectation-heading">
          <p id="response-expectation-heading">RESPONSE EXPECTATION</p>
          <strong>Qualified applicants will be contacted regarding next steps as applications are reviewed.</strong>
        </aside>

        <div className={styles.actions}>
          <Link className={styles.button} href="/">
            Return to Homepage
          </Link>
          <Link className={styles.secondaryLink} href="/#top">
            Review the Opportunity
          </Link>
        </div>

        <p className={styles.closingCopy}>
          Keep an eye on your phone and email. The next step is a conversation—not a commitment.
        </p>
      </section>
    </main>
  );
}
