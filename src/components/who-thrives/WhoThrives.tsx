import styles from "./WhoThrives.module.css";

const notForYouItems = [
  "You want guaranteed hourly pay regardless of performance",
  "You prefer being told exactly what to do every day",
  "You aren't interested in getting licensed",
  "You avoid feedback or coaching",
  "You're looking for overnight success instead of building a career",
];

const thriveItems = [
  "You're coachable and willing to improve",
  "You want your income tied to your effort",
  "You value flexibility and personal responsibility",
  "You're excited about eventually leading and mentoring others",
  "You're willing to bet on yourself and stay consistent",
];

export function WhoThrives() {
  return (
    <section className={styles.section} aria-labelledby="who-thrives-heading">
      <div className={styles.topGlow} aria-hidden="true" />
      <div className={styles.sideGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>WHO THRIVES HERE</p>

          <h2 id="who-thrives-heading" className={styles.headline}>
            <span>This Opportunity</span>
            <span>
              <em>Isn&apos;t For Everyone.</em>
            </span>
          </h2>

          <p className={styles.supportingCopy}>
            The best careers aren&apos;t built by trying to appeal to everyone. We look for people who
            are coachable, disciplined, and willing to grow. If that sounds like you, you&apos;ll likely
            feel at home here.
          </p>
        </div>

        <div className={styles.cardGrid}>
          <article className={`${styles.fitCard} ${styles.redCard}`}>
            <div className={styles.cardAccent} aria-hidden="true" />
            <h3>This Probably Isn&apos;t For You</h3>
            <p>
              There&apos;s nothing wrong with wanting these things—this opportunity simply isn&apos;t
              designed around them.
            </p>
            <ul className={styles.checkList}>
              {notForYouItems.map((item) => (
                <li key={item}>
                  <span className={styles.statusIcon} aria-hidden="true">
                    ✕
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${styles.fitCard} ${styles.blueCard}`}>
            <div className={styles.cardAccent} aria-hidden="true" />
            <h3>You&apos;ll Probably Thrive Here</h3>
            <p>The people who succeed here tend to share these characteristics.</p>
            <ul className={styles.checkList}>
              {thriveItems.map((item) => (
                <li key={item}>
                  <span className={styles.statusIcon} aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <blockquote className={styles.quoteBlock}>
          <p>
            &ldquo;We&apos;re not looking for everyone.
            <br />
            <br />
            We&apos;re looking for the people who are ready to build something meaningful—for
            themselves, their families, and the teammates they&apos;ll eventually lead.&rdquo;
          </p>
        </blockquote>

        <div className={styles.ctaWrap}>
          <a className={styles.primaryAction} href="#apply">
            This Sounds Like Me →
          </a>
          <p className={styles.helperText}>
            No experience required.
            <br />
            Licensing guidance provided.
            <br />
            Apply in about 2 minutes.
          </p>
          <p className={styles.reassuranceText}>
            If you&apos;re unsure which list describes you today, that&apos;s okay. Coachability matters more
            than experience.
          </p>
        </div>
      </div>
    </section>
  );
}
