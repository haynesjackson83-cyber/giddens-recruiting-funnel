import styles from "./RealResults.module.css";

const testimonials = [
  {
    category: "Agent Spotlight",
    initials: "JH",
    result: "$30K",
    timeframe: "First 90 Days",
    quote:
      "I went from earning around $30,000 a year at my previous job to earning over $30,000 during my first three months here. What changed wasn't luck—it was having a proven system, consistent training, and getting paid based on performance.",
    name: "Jackson H.",
    progression: "Former Team Leader → Supervising Agent",
    featured: true,
  },
  {
    category: "Freedom",
    initials: "RF",
    result: "Take Control",
    timeframe: "Of Your Schedule",
    quote:
      "As long as I took care of my clients and stayed productive, I had far more control over when and where I worked. I stopped asking permission to live my life.",
    label: "Remote Flexibility",
  },
  {
    category: "Leadership",
    initials: "LI",
    result: "Build Something",
    timeframe: "That Continues to Grow",
    quote:
      "Top performers aren't limited to personal production. They have the opportunity to recruit, mentor, and develop other agents while building long-term renewal income as their organization grows.",
    label: "Leadership & Renewal Income",
  },
];

const trustItems = [
  "Structured Training",
  "Licensing Guidance",
  "Remote Opportunities",
  "Leadership Development",
];

export function RealResults() {
  return (
    <section className={styles.section} aria-labelledby="real-results-heading">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
        <p className={styles.eyebrow}>REAL RESULTS</p>

        <h2 id="real-results-heading" className={styles.headline}>
          <span>Don&apos;t Take Our Word.</span>
          <span>
            Meet Your <em>Future Teammates.</em>
          </span>
        </h2>

        <p className={styles.supportingCopy}>
          Real agents. Real progress. Real career development. These stories are not guarantees,
          but examples of what can happen when people follow the system and consistently execute.
        </p>

        <div className={styles.testimonialGrid} aria-label="Agent results testimonials">
          {testimonials.map((testimonial) => (
            <article
              className={
                testimonial.featured
                  ? `${styles.testimonialCard} ${styles.featuredCard}`
                  : styles.testimonialCard
              }
              key={testimonial.category}
            >
              <p className={styles.category}>{testimonial.category}</p>
              <p className={styles.result}>{testimonial.result}</p>
              <p className={styles.timeframe}>{testimonial.timeframe}</p>
              <blockquote className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <div className={styles.person}>
                <div className={styles.avatar} aria-hidden="true">
                  {testimonial.initials}
                </div>
                <div>
                  <p className={styles.name}>{testimonial.name ?? testimonial.label}</p>
                  {testimonial.progression ? (
                    <p className={styles.progression}>{testimonial.progression}</p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.trustBar} aria-label="Opportunity process signals">
          {trustItems.map((item) => (
            <div className={styles.trustItem} key={item}>
              <span className={styles.checkIcon} aria-hidden="true">
                ✓
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <p className={styles.disclaimer}>
          Individual results vary. Income, promotions, and leadership opportunities depend on
          licensing, production, effort, persistency, and meeting company requirements.
        </p>
      </div>
    </section>
  );
}
