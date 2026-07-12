import styles from "./RealResults.module.css";

const testimonials = [
  {
    category: "Agent Spotlight",
    initials: "JH",
    result: "$30K",
    timeframe: "First 90 Days",
    quoteBefore: "I went from earning around $30,000 a year at my previous job to earning over $30,000 during my first three months here.",
    quoteHighlight: "What changed wasn't luck.",
    quoteAfter:
      "It was having a proven system, consistent training, and compensation tied directly to performance.",
    name: "Jackson H.",
    progression: "Former Team Lead → Supervising Agent",
    featured: true,
  },
  {
    category: "Work-Life Balance",
    initials: "HH",
    result: "Take Control",
    timeframe: "Of Your Schedule",
    quote:
      "I gained more control over when and where I worked while staying responsible for clients, training, and production. The flexibility gave me more ownership over how I structured my day.",
    name: "Heather H.",
    progression: "Agent → Remote Flexibility",
  },
  {
    category: "Leadership Growth",
    initials: "RH",
    result: "Build Something",
    timeframe: "That Continues to Grow",
    quote:
      "The opportunity gave me a path beyond personal production. I could recruit, mentor, and develop agents while helping new leaders learn the standards. It became about building people, growing an organization, and earning long-term renewal income under the applicable company structure.",
    name: "Ricardo H.",
    progression: "Senior Leader → Leadership Development",
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
          Real people. Real progress. Real career development. These experiences are individual
          examples, not guarantees, but they show what disciplined agents can build over time.
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
              <blockquote className={styles.quote}>
                &ldquo;{testimonial.quoteBefore ? (
                  <>
                    {testimonial.quoteBefore} <strong>{testimonial.quoteHighlight}</strong>{" "}
                    {testimonial.quoteAfter}
                  </>
                ) : (
                  testimonial.quote
                )}
                &rdquo;
              </blockquote>
              <div className={styles.person}>
                <div className={styles.avatar} aria-hidden="true">
                  {testimonial.initials}
                </div>
                <div>
                  <p className={styles.name}>{testimonial.name}</p>
                  <p className={styles.progression}>{testimonial.progression}</p>
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
          Individual results vary based on licensing, production, consistency, leadership
          development, and effort.
        </p>
      </div>
    </section>
  );
}
