"use client";

import { useEffect, useMemo, useState } from "react";
import { getNextOverview, getTimeRemaining } from "@/lib/getNextOverview";
import styles from "./Hero.module.css";

const formatNumber = (value: number) => value.toString().padStart(2, "0");

export function OverviewCountdown() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateNow = () => setNow(new Date());
    const ready = window.setTimeout(updateNow, 0);
    const timer = window.setInterval(updateNow, 1000);

    return () => {
      window.clearTimeout(ready);
      window.clearInterval(timer);
    };
  }, []);

  const nextOverview = useMemo(() => (now ? getNextOverview(now) : null), [now]);
  const timeRemaining = nextOverview && now ? getTimeRemaining(nextOverview.startsAt, now) : null;

  if (!now || !nextOverview || !timeRemaining) {
    return <div className={styles.countdownCard} aria-label="Next company overview schedule"><div className={styles.countdownIntro}><span>Next Company Overview</span><strong>Schedule being updated</strong></div></div>;
  }

  const displayLabel = `${nextOverview.label.replace(" at ", " · ")} CT`;
  const cells = [[formatNumber(timeRemaining.days), "Days"], [formatNumber(timeRemaining.hours), "Hrs"], [formatNumber(timeRemaining.minutes), "Min"], [formatNumber(timeRemaining.seconds), "Sec"]];

  return (
    <div className={styles.countdownCard} aria-label="Next company overview schedule">
      <div className={styles.countdownIntro}>
        <span>Next Company Overview</span>
        <strong>{displayLabel}</strong>
        <p className={styles.countdownSummary}>The next company overview is scheduled for {nextOverview.label} Central Time.</p>
      </div>
      <div className={styles.countdownGrid} aria-hidden="true">
        {cells.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </div>
    </div>
  );
}
