import styles from "./Hero.module.css";

const proofPoints = [
  "Role-ready shortlist in 10 business days",
  "Scorecards built around your hiring bar",
  "Candidate nurture from first touch to final round",
];

const metrics = [
  { value: "3.7x", label: "more qualified conversations" },
  { value: "42%", label: "lower sourcing drag" },
  { value: "10d", label: "to calibrated shortlist" },
];

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Giddens Recruiting Funnel</p>
          <h1 id="hero-heading" className={styles.title}>
            Build a predictable pipeline of high-fit candidates before the role goes cold.
          </h1>
          <p className={styles.subtitle}>
            We turn your hiring criteria into a focused recruiting funnel: targeted sourcing,
            personalized outreach, candidate qualification, and interview-ready handoffs for
            hard-to-fill roles.
          </p>

          <div className={styles.actions} aria-label="Hero calls to action">
            <a className={styles.primaryAction} href="mailto:hello@giddensrecruiting.com">
              Start the funnel
            </a>
            <a className={styles.secondaryAction} href="#process">
              See the process
            </a>
          </div>

          <ul className={styles.proofList} aria-label="Recruiting funnel benefits">
            {proofPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <aside className={styles.panel} aria-label="Recruiting funnel snapshot">
          <div className={styles.panelHeader}>
            <span>Live funnel</span>
            <strong>Senior GTM Search</strong>
          </div>
          <div className={styles.pipeline}>
            <div>
              <span>Sourced</span>
              <strong>186</strong>
            </div>
            <div>
              <span>Engaged</span>
              <strong>54</strong>
            </div>
            <div>
              <span>Qualified</span>
              <strong>17</strong>
            </div>
            <div>
              <span>Interview-ready</span>
              <strong>6</strong>
            </div>
          </div>
          <div className={styles.candidateCard}>
            <p>Top candidate signal</p>
            <strong>Quota-carrying leader · Series B-C · Healthcare SaaS</strong>
            <span>Warm, calibrated, and ready for founder screen.</span>
          </div>
          <div className={styles.metrics}>
            {metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
