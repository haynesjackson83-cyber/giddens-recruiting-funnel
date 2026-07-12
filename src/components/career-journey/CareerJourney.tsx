"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./CareerJourney.module.css";

const futurePath = ["Licensed", "Trained", "Coded", "Producing", "Leadership"];

const milestones = [
  {
    step: "STEP 01",
    title: "Apply In About 2 Minutes",
    body: "Complete our quick application so we can learn more about you. No résumé is required. We look for coachability, ambition, consistency, and long-term potential.",
    badge: "FREE TO APPLY",
  },
  {
    step: "STEP 02",
    title: "Discover The Opportunity",
    body: "If there appears to be a mutual fit, you'll attend a company overview and interview process covering compensation, licensing, training, expectations, culture, and career growth.",
    badge: "NO PRESSURE",
  },
  {
    step: "STEP 03",
    title: "Get Licensed. Get Trained. Get Started.",
    body: "If selected, you'll begin the licensing process, complete structured training, and prepare to meet with clients with ongoing coaching and leadership support.",
    badge: "ONGOING SUPPORT",
  },
];

export function CareerJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          revealObserver.disconnect();
        }
      },
      { rootMargin: "0px 0px -14%", threshold: 0.16 },
    );

    revealObserver.observe(section);

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const start = viewportHeight * 0.74;
      const end = -rect.height * 0.12;
      const distance = start - end;
      const nextProgress = Math.min(1, Math.max(0, (start - rect.top) / distance));

      setProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isVisible ? styles.isVisible : ""}`}
      style={{ "--timeline-progress": progress } as React.CSSProperties}
      aria-labelledby="career-journey-heading"
    >
      <div className={styles.topGlow} aria-hidden="true" />
      <div className={styles.sideGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={`${styles.header} ${styles.revealHeader}`}>
          <p className={styles.eyebrow}>YOUR JOURNEY</p>
          <h2 id="career-journey-heading" className={styles.headline}>
            <span>Your Career</span>
            <span>
              <em>Starts Here.</em>
            </span>
          </h2>
          <p className={styles.supportingCopy}>
            Every successful agent started exactly where you are today. Here&apos;s what the first few weeks
            typically look like.
          </p>
        </div>

        <div className={styles.timeline} aria-label="Your first few weeks timeline">
          <div className={styles.timelineRail} aria-hidden="true">
            <span className={styles.timelineFill} />
          </div>

          <div className={styles.milestoneList}>
            {milestones.map((milestone, index) => (
              <article
                className={`${styles.milestone} ${styles[`milestone${index + 1}`]}`}
                key={milestone.step}
              >
                <div className={styles.marker} aria-hidden="true">
                  <span>{index + 1}</span>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardMeta}>
                    <p className={styles.stepLabel}>{milestone.step}</p>
                    <span className={styles.badge}>{milestone.badge}</span>
                  </div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={`${styles.futurePath} ${styles.revealPath}`} aria-label="Possible future path preview">
          {futurePath.map((pathStep, index) => (
            <span key={pathStep}>
              {pathStep}
              {index < futurePath.length - 1 ? <b aria-hidden="true">→</b> : null}
            </span>
          ))}
        </div>

        <div className={`${styles.successBlock} ${styles.revealSuccess}`}>
          <h3>Everyone Starts Somewhere.</h3>
          <p>
            No one begins as an expert. Strong careers are built through coaching, consistency, and the
            willingness to improve.
          </p>
          <a className={styles.primaryAction} href="#apply">
            Reserve My Spot →
          </a>
          <p className={styles.helperText}>Applications are reviewed regularly. Qualified applicants will be contacted regarding next steps.</p>
        </div>
      </div>
    </section>
  );
}
