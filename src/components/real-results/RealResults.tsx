import styles from "./RealResults.module.css";

const testimonials = [
  {
    category: "Agent Spotlight",
    initials: "JH",
    result: "$30K",
    timeframe: "First 90 Days",
    quoteBefore: "I was earning around $30,000 a year before this. In my first three months here, I earned over $30,000.",
    quoteHighlight: "What changed wasn't luck.",
    quoteAfter:
      "I finally had a system to follow, consistent training, and compensation tied directly to performance.",
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
      "I still had responsibilities—clients, training, and production—but I had more control over when and where I worked. That flexibility helped me take ownership of my day instead of feeling boxed in by a schedule.",
    name: "Heather H.",
    progression: "Agent → Remote Flexibility",
  },
  {
    category: "Leadership Growth",
    initials: "RH",
    result: "Build Something",
    timeframe: "That Continues to Grow",
    quote:
      "At first, it was about my own production. Over time, I started recruiting, mentoring, and helping other agents develop. Building a team gave the work a bigger purpose and created a path to long-term renewal income under the company structure.",
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
          development, and individual effort.
        </p>
      </div>
    </section>
  );
}
