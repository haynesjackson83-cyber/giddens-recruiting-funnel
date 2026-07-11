import styles from "./RealityCheck.module.css";

const problems = [
  "Income capped regardless of effort",
  "Promotions based on tenure instead of production",
  "Fixed schedules that limit flexibility",
  "Little ownership over long-term income",
  "Training that teaches tasks, not how to perform at a high level",
];

export function RealityCheck() {
  return (
    <section className={styles.section} aria-labelledby="reality-check-heading">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
        <p className={styles.eyebrow}>The Reality Check</p>

        <h2 id="reality-check-heading" className={styles.headline}>
          <span>Most Jobs Were</span>
          <span>
            Designed to <em>Cap You.</em>
          </span>
        </h2>

        <p className={styles.emotionalLead}>
          You can work harder than everyone around you and still get paid almost the same.
        </p>

        <p className={styles.supportingCopy}>
          Traditional jobs often reward tenure more than production. Income is capped, schedules are
          fixed, and ambitious people are forced to trade more time for only slightly more money.
        </p>

        <p className={styles.bridgeStatement}>
          If you have ever felt your ambition was worth more than your paycheck, you are exactly who
          this opportunity was built for.
        </p>

        <div className={styles.problemGrid} aria-label="Common problems with traditional jobs">
          {problems.map((problem) => (
            <div className={styles.problemCard} key={problem}>
              <span className={styles.xMark} aria-hidden="true">
                ×
              </span>
              <p>{problem}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
