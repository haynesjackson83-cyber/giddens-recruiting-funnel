import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.texture} aria-hidden="true" />
      <div className={styles.topGlow} aria-hidden="true" />

      <div className={styles.container}>
        <p className={styles.eyebrow}>Now Recruiting — Select Openings Across the U.S.</p>

        <h1 id="hero-heading" className={styles.title}>
          <span className={styles.titleLine}>Build a Career</span>
          <span className={styles.titleLine}>
            That <em>Pays You</em>
          </span>
          <span className={`${styles.titleLine} ${styles.titleAccent}`}>What You’re Worth.</span>
        </h1>

        <p className={styles.supportingCopy}>
          Join a performance-driven life insurance sales organization offering warm leads,
          structured training, remote flexibility, leadership development, and uncapped commission
          potential.
        </p>

        <p className={styles.transparencyLine}>
          Independent contractor opportunity. Commission-based compensation. Life insurance
          licensing required. Earnings are not guaranteed.
        </p>

        <div className={styles.videoCard} aria-label="Company overview video placeholder">
          <span className={styles.soundLabel}>Turn Sound On</span>
          <button className={styles.playButton} type="button" aria-label="Play company overview video">
            <span aria-hidden="true" />
          </button>
          <p>Watch the Company Overview</p>
        </div>

        <a className={styles.primaryAction} href="#apply">
          Reserve My Spot — Apply Free →
        </a>

        <a className={styles.secondaryAction} href="#process">
          See How It Works ↓
        </a>

        <p className={styles.helperText}>Free to apply · No experience required · Takes about 2 minutes</p>

        <div className={styles.countdownCard} aria-label="Next company overview schedule">
          <div className={styles.countdownIntro}>
            <span>Next Company Overview</span>
            <strong>Schedule coming soon</strong>
          </div>

          <div className={styles.countdownGrid} aria-label="Countdown timer placeholder">
            <div>
              <strong>00</strong>
              <span>Days</span>
            </div>
            <div>
              <strong>00</strong>
              <span>Hrs</span>
            </div>
            <div>
              <strong>00</strong>
              <span>Min</span>
            </div>
            <div>
              <strong>00</strong>
              <span>Sec</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
