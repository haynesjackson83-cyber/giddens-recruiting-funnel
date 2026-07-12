import Link from "next/link";

import styles from "./thank-you.module.css";

const nextSteps = [
  {
    title: "Watch your phone and email",
    copy: "We may contact you regarding scheduling and next steps.",
  },
  {
    title: "Be ready for the company overview",
    copy: "You’ll learn about the role, compensation, licensing, training, expectations, and career path.",
  },
  {
    title: "Bring your questions",
    copy: "The process is designed to help both sides determine whether there is a mutual fit.",
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
          <span>
            <em>Has Been Submitted.</em>
          </span>
        </h1>
        <p className={styles.body}>
          Thank you for taking the first step. Our team will review your information and contact
          qualified applicants regarding the company overview and interview process.
        </p>

        <div className={styles.card}>
          <ol className={styles.steps}>
            {nextSteps.map((step) => (
              <li key={step.title}>
                <span className={styles.stepNumber} aria-hidden="true" />
                <div>
                  <h2>{step.title}</h2>
                  <p>{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Link className={styles.button} href="/">
          Return to Homepage
        </Link>
      </section>
    </main>
  );
}
