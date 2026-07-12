import styles from "./RealResults.module.css";

const testimonials = [
  {
    category: "Agent Spotlight",
    initials: "JH",
    result: "$30K",
    timeframe: "First 90 Days",
    quote:
      "I went from earning around $30,000 a year at my previous job to earning approximately $30,000 during my first three months here. The biggest difference was having a system, training, and compensation tied directly to production.",
    name: "Jackson H.",
    progression: "Former Team Leader → Supervising Agent",
    disclosure: "Individual results vary. Earnings are not guaranteed.",
  },
  {
    category: "Career Progression",
    initials: "AS",
    result: "Promoted",
    timeframe: "To Supervising Agent",
    quote:
      "Advancement was based on production, consistency, and leadership—not simply how long I had been there. The process gave me a clear standard to work toward.",
    name: "Agent Story",
    progression: "Sales Agent → Supervising Agent",
    placeholder: "Verified team story coming soon",
  },
  {
    category: "Leadership Growth",
    initials: "AS",
    result: "Built a Team",
    timeframe: "Early Leadership Stage",
    quote:
      "The opportunity gave me a path to move beyond personal production and begin developing other agents. The next level became about helping others become consistent and productive.",
    name: "Agent Story",
    progression: "Producer → Team Builder",
    placeholder: "Verified team story coming soon",
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
            <article className={styles.testimonialCard} key={testimonial.category}>
              <p className={styles.category}>{testimonial.category}</p>
              <p className={styles.result}>{testimonial.result}</p>
              <p className={styles.timeframe}>{testimonial.timeframe}</p>
              <blockquote className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <div className={styles.person}>
                <div className={styles.avatar} aria-hidden="true">
                  {testimonial.initials}
                </div>
                <div>
                  <p className={styles.name}>{testimonial.name}</p>
                  <p className={styles.progression}>{testimonial.progression}</p>
                </div>
              </div>
              {testimonial.disclosure ? (
                <p className={styles.cardDisclosure}>{testimonial.disclosure}</p>
              ) : null}
              {testimonial.placeholder ? (
                <p className={styles.placeholder}>{testimonial.placeholder}</p>
              ) : null}
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
          Examples shown are individual experiences and do not represent guaranteed or typical
          results. Earnings and advancement depend on production, licensing, persistency, effort,
          and company requirements.
        </p>
      </div>
    </section>
  );
}
