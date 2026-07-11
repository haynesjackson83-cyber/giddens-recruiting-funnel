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
          Most Jobs Were Designed to <em>Cap You.</em>
        </h2>

        <div className={styles.copyWrap}>
          <p className={styles.supportingCopy}>
            Traditional jobs often pay people the same whether they produce more or not.
            Promotions can depend on tenure, income is capped, and ambitious people are forced to
            trade more time for only slightly more money.
          </p>

          <p className={styles.followUp}>
            If that feels familiar, this opportunity was built for people like you.
          </p>
        </div>

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
