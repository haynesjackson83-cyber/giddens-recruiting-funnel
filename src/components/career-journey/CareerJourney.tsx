"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./CareerJourney.module.css";

const milestones = [
  {
    step: "STEP 01",
    title: "Apply In About 2 Minutes",
    body: "Complete our short application so we can learn more about you. No resume is required. We're looking for coachability, ambition, and long-term potential—not years of experience.",
    badge: "FREE TO APPLY",
  },
  {
    step: "STEP 02",
    title: "Meet The Team",
    body: "If it looks like there's a mutual fit, we'll invite you to a Zoom conversation where you'll learn about the compensation, training, licensing process, culture, and long-term career path. You'll have the opportunity to ask every question you have before making a decision.",
    badge: "NO PRESSURE",
  },
  {
    step: "STEP 03",
    title: "Launch Your Career",
    body: "Once licensed, you'll plug into structured training, begin meeting with clients, and receive ongoing coaching from experienced leaders. As your confidence grows, so does your opportunity to earn, mentor others, and build something that lasts.",
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

        <div className={`${styles.successBlock} ${styles.revealSuccess}`}>
          <h3>Everyone Starts Somewhere.</h3>
          <p>
            No one begins as an expert. The difference is showing up, staying coachable, and
            consistently improving. That&apos;s how careers are built here.
          </p>
          <a className={styles.primaryAction} href="#apply">
            Reserve My Spot →
          </a>
          <p className={styles.helperText}>Applications reviewed within 24 hours.</p>
        </div>
      </div>
    </section>
  );
}
