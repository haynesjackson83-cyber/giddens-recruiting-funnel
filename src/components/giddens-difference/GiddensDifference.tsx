import styles from "./GiddensDifference.module.css";

const benefits = [
  {
    number: "01",
    title: "Structured Training",
    description:
      "Learn the presentation, products, systems, and daily activities through a repeatable training process.",
  },
  {
    number: "02",
    title: "Qualified Lead Support",
    description:
      "Work with prospective clients who have requested information about available benefits and coverage options.",
  },
  {
    number: "03",
    title: "Remote Flexibility",
    description:
      "Meet with clients virtually and complete much of the role remotely, subject to company requirements and scheduled training.",
  },
  {
    number: "04",
    title: "Performance-Based Advancement",
    description:
      "Advancement is based on production, consistency, leadership development, and meeting company requirements—not simply time in the role.",
  },
  {
    number: "05",
    title: "Renewal Income Opportunity",
    description:
      "Eligible policies may generate renewal income under the applicable agent contract, vesting rules, and policy persistency requirements.",
  },
  {
    number: "06",
    title: "Leadership and Team Development",
    description:
      "Agents who demonstrate production and leadership ability may earn the opportunity to train, recruit, and develop a team.",
  },
];

export function GiddensDifference() {
  return (
    <section className={styles.section} aria-labelledby="giddens-difference-heading">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
        <p className={styles.eyebrow}>THE GIDDENS DIFFERENCE</p>

        <h2 id="giddens-difference-heading" className={styles.headline}>
          <span>A System Built</span>
          <span>
            <em>To Help You Grow.</em>
          </span>
        </h2>

        <p className={styles.introduction}>
          We provide the structure, training, tools, and leadership development. Your responsibility
          is to bring consistency, coachability, and the willingness to work.
        </p>

        <div className={styles.benefitGrid} aria-label="Giddens Difference benefits">
          {benefits.map((benefit) => (
            <article className={styles.benefitCard} key={benefit.number}>
              <span className={styles.backgroundNumber} aria-hidden="true">
                {benefit.number}
              </span>
              <p className={styles.number}>{benefit.number}</p>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>

        <a className={styles.cta} href="#fit">
          Learn How the Opportunity Works →
        </a>
      </div>
    </section>
  );
}
