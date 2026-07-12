import styles from "./RealResults.module.css";

const testimonials = [
  {
    initials: "JM",
    earnings: "$90K",
    timeframe: "In a Single Month",
    quote:
      "I was a broke college student working bar shifts. Eight months after joining I made $90,000 in one month. The system is real. The training is real.",
    name: "Jason M.",
    progression: "College Student → Top Producer",
  },
  {
    initials: "AR",
    earnings: "$170K",
    timeframe: "First 6 Months",
    quote:
      "I went from making about $4,000 a month to over $170,000 during my first six months. The location freedom completely changed my life.",
    name: "Alyssa R.",
    progression: "Recruiter → Team Leader",
  },
  {
    initials: "MT",
    earnings: "$100K",
    timeframe: "Last Month",
    quote:
      "I finally had complete control over my income. The harder I worked, the more I earned. That's exactly what I was looking for.",
    name: "Marcus T.",
    progression: "9-to-5 Employee → Senior Agent",
  },
];

const trustItems = [
  "A+ BBB Rated",
  "4.6 Google Rating",
  "Trusted by Major Labor Organizations",
  "100% Remote Across the U.S.",
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
          Real agents. Real production. Real career progression. These aren&apos;t promises—they&apos;re
          examples of what can happen when people commit to the system and consistently execute.
        </p>

        <div className={styles.testimonialGrid} aria-label="Agent results testimonials">
          {testimonials.map((testimonial) => (
            <article className={styles.testimonialCard} key={testimonial.name}>
              <p className={styles.stars} aria-label="Five star testimonial">
                ★★★★★
              </p>
              <p className={styles.earnings}>{testimonial.earnings}</p>
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
            </article>
          ))}
        </div>

        <div className={styles.trustBar} aria-label="Opportunity trust indicators">
          {trustItems.map((item) => (
            <div className={styles.trustItem} key={item}>
              <span className={styles.checkIcon} aria-hidden="true">
                ✓
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
