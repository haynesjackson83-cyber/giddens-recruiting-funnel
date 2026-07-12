"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./FinalCta.module.css";

export function FinalCta() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -16%", threshold: 0.18 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isVisible ? styles.isVisible : ""}`}
      aria-labelledby="final-cta-heading"
    >
      <div className={styles.topGlow} aria-hidden="true" />
      <div className={styles.sideGlow} aria-hidden="true" />

      <div className={styles.container}>
        <p className={styles.eyebrow}>YOUR NEXT CHAPTER</p>

        <h2 id="final-cta-heading" className={`${styles.headline} ${styles.revealHeadline}`}>
          <span>Your Future Won&rsquo;t Change</span>
          <span>
            <em>Until You Do.</em>
          </span>
        </h2>

        <p className={styles.supportingCopy}>
          Every successful agent had a first day. Every leader started with one decision. You do not
          need to have every answer today—you only need enough curiosity to take the next step.
        </p>

        <figure className={`${styles.leadershipMessage} ${styles.revealMessage}`}>
          <figcaption>A MESSAGE FROM OUR LEADERSHIP</figcaption>
          <blockquote>
            “You are not committing to a career by applying. You are simply giving yourself the
            opportunity to learn, ask questions, and decide whether this path fits your goals.”
          </blockquote>
        </figure>

        <div className={`${styles.ctaWrap} ${styles.revealCta}`}>
          <a className={styles.primaryCta} href="#apply">
            Start My Application →
          </a>
          <p className={styles.reassuranceDetails}>
            No résumé required · Apply in about 2 minutes · No obligation
          </p>
          <p className={styles.finalReassurance}>
            If the opportunity is not the right fit, that is completely okay. The goal is clarity—not
            pressure.
          </p>
        </div>
      </div>
    </section>
  );
}
