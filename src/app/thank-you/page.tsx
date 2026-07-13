import Link from "next/link";

import styles from "./thank-you.module.css";

const timelineSteps = [
  {
    number: "01",
    status: "complete",
    statusLabel: "✓ Complete",
    title: "Application Received",
    copy: "Your application has been submitted successfully. Thank you for taking the first step.",
  },
  {
    number: "02",
    status: "current",
    statusLabel: "Current Step",
    title: "Application Review",
    copy: "Our recruiting team is reviewing your application to determine whether there appears to be a strong mutual fit. Qualified applicants will be contacted regarding the next stage.",
  },
  {
    number: "03",
    status: "next",
    statusLabel: "Coming Next",
    title: "Company Overview",
    copy: "If selected to continue, we’ll help you reserve a spot in one of our live company overview sessions where you’ll learn about the opportunity, licensing process, compensation, training, and expectations.",
  },
  {
    number: "04",
    status: "final",
    statusLabel: "Final Stage",
    title: "Interview & Next Steps",
    copy: "After the overview, you’ll have the opportunity to ask questions, meet with leadership, and decide whether this opportunity aligns with your goals.",
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

          <ol className={styles.timeline}>
            {timelineSteps.map((step, index) => (
              <li
                key={step.title}
                className={styles.timelineStage}
                style={{ "--step-index": index } as React.CSSProperties}
              >
                <div className={styles.stageMarker}>
                  <span className={styles.stepNumber}>{step.number}</span>
                </div>
                <div className={styles.stageContent}>
                  <span className={`${styles.statusBadge} ${styles[step.status]}`}>{step.statusLabel}</span>
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
