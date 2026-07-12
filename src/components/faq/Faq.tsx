"use client";

import type { KeyboardEvent } from "react";
import { useRef, useState } from "react";

import styles from "./Faq.module.css";

const faqs = [
  {
    question: "How does compensation work?",
    answer:
      "Our agents are paid based on performance rather than an hourly wage. During the company overview, we’ll explain how commissions, bonuses, renewals, and advancement work so you can decide whether the opportunity fits your goals. Earnings depend on production and individual results.",
  },
  {
    question: "Will I need a life insurance license?",
    answer:
      "Yes. A life insurance license is required before you can sell insurance. If you’re selected to move forward, we’ll explain the licensing process step by step and show you what needs to be completed before training begins. Many successful agents started without a license.",
  },
  {
    question: "Do I need sales or insurance experience?",
    answer:
      "No. Previous experience can help, but it is not required. We place more value on coachability, communication, consistency, and willingness to learn.",
  },
  {
    question: "Is the position remote?",
    answer:
      "Much of the role can be completed remotely, including virtual client appointments, team meetings, and training. Exact expectations will be explained during the overview based on your location and the role.",
  },
  {
    question: "How do the leads work?",
    answer:
      "Agents have opportunities to work with prospective clients who have requested information about available benefits and coverage options. During the company overview, we’ll explain how the lead system works so you know what to expect before moving forward.",
  },
  {
    question: "Are there licensing costs?",
    answer:
      "We’ll explain every licensing requirement before you commit to the process so there are no surprises. Depending on your state, exam, background-check, fingerprinting, or application fees may apply.",
  },
  {
    question: "What happens after I apply?",
    answer:
      "If your application appears to be a potential fit, the next step is a company overview followed by the interview process. You’ll learn about the role, compensation, licensing, training, expectations, and career path before any final decision is made.",
  },
  {
    question: "What is the company overview?",
    answer:
      "The overview is a clear introduction to the organization and opportunity. It covers what agents do, how compensation works, the licensing process, training, expectations, and advancement so you can make an informed decision.",
  },
  {
    question: "Is recruiting required right away?",
    answer:
      "No. New agents should first focus on licensing, training, serving clients, and developing consistent personal production. Recruiting and leadership become part of the opportunity as you grow.",
  },
  {
    question: "How flexible is the schedule?",
    answer:
      "The role offers more control over your schedule than many traditional jobs, but flexibility still comes with responsibility. Successful agents consistently attend training, follow up with clients, and complete the activity required to produce results.",
  },
  {
    question: "How quickly can I start?",
    answer:
      "Timing depends on the interview process, licensing, contracting, training, and your availability. We’ll explain the next steps clearly so you know what has to happen before you begin working with clients.",
  },
  {
    question: "Are income and promotions guaranteed?",
    answer:
      "No. This is a performance-based career. Earnings and advancement depend on licensing, production, consistency, persistency, leadership development, and meeting company requirements.",
  },
  {
    question: "Is this opportunity right for everyone?",
    answer:
      "No, and that’s intentional. It tends to fit people who are coachable, comfortable with performance-based compensation, willing to become licensed, and serious about building a long-term career.",
  },
  {
    question: "Can I do this part-time?",
    answer:
      "Part-time availability may be considered depending on the role and team needs, but candidates should be realistic about the time required for licensing, training, client appointments, and consistent activity.",
  },
  {
    question: "What support will I receive?",
    answer:
      "Agents receive structured training, coaching, systems guidance, and leadership support as they learn the role. The goal is to help you understand the process, build confidence, and develop consistent habits.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusButton = (index: number) => {
    buttonRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusButton((index + 1) % faqs.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusButton((index - 1 + faqs.length) % faqs.length);
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusButton(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      focusButton(faqs.length - 1);
    }
  };

  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.topGlow} aria-hidden="true" />
      <div className={styles.sideGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>WHAT TO EXPECT</p>
          <h2 id="faq-heading" className={styles.headline}>
            <span>Questions You Should Ask</span>
            <span>
              <em>Before You Apply.</em>
            </span>
          </h2>
          <p className={styles.supportingCopy}>
            We want you to understand the opportunity clearly before moving forward. Here are
            straightforward answers to the questions most candidates ask.
          </p>
        </div>

        <div className={styles.accordion}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div className={`${styles.item} ${isOpen ? styles.activeItem : ""}`} key={faq.question}>
                <h3 className={styles.questionHeading}>
                  <button
                    ref={(element) => {
                      buttonRefs.current[index] = element;
                    }}
                    id={buttonId}
                    className={styles.questionButton}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                  >
                    <span>{faq.question}</span>
                    <span className={styles.icon} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  className={styles.answerWrap}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                >
                  <div className={styles.answerInner}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.reassurance}>
          <h3>Still Have Questions?</h3>
          <p>
            The company overview is designed to give you a complete picture of the opportunity before
            you decide whether to move forward.
          </p>
          <a href="#apply">Continue to the Application ↓</a>
        </div>
      </div>
    </section>
  );
}
