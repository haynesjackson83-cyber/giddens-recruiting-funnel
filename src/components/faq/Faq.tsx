"use client";

import type { KeyboardEvent } from "react";
import { useRef, useState } from "react";

import styles from "./Faq.module.css";

const faqs = [
  {
    question: "Is this a salaried or hourly position?",
    answer:
      "No. This is an independent contractor opportunity with commission-based compensation. There is no guaranteed salary or hourly wage. Earnings depend on production, persistency, contract terms, and individual performance.",
  },
  {
    question: "Do I need a life insurance license?",
    answer:
      "Yes. A valid life insurance license is required before you can sell insurance. Applicants who are not currently licensed may receive guidance on the licensing process if selected to move forward.",
  },
  {
    question: "Do I need previous sales or insurance experience?",
    answer:
      "No previous insurance experience is required. Sales experience can help, but coachability, communication, consistency, and willingness to learn are more important.",
  },
  {
    question: "Is the position remote?",
    answer:
      "Much of the role may be completed remotely, including virtual meetings, training, and client appointments. Exact expectations may depend on location, licensing, company requirements, and scheduled team activities.",
  },
  {
    question: "Are leads provided?",
    answer:
      "Agents may have access to prospective clients who have requested information about available benefits or coverage. Lead availability, distribution, cost, and exclusivity may vary based on company systems and agent contract terms.",
  },
  {
    question: "How does compensation work?",
    answer:
      "Agents are compensated through commissions and may become eligible for bonuses, renewals, and leadership compensation based on production, persistency, contract level, and company requirements. No income is guaranteed.",
  },
  {
    question: "Are there licensing or startup costs?",
    answer:
      "Applicants may be responsible for licensing-related expenses, background requirements, exam fees, or other onboarding costs. Exact costs and requirements will be explained before a candidate commits to moving forward.",
  },
  {
    question: "What happens after I apply?",
    answer:
      "Qualified applicants may be invited to attend a company overview, complete an interview process, and learn about licensing, training, compensation, expectations, and career advancement before a final decision is made.",
  },
  {
    question: "Is recruiting required immediately?",
    answer:
      "No. New agents should first focus on licensing, training, client service, and developing consistent personal production. Recruiting and leadership opportunities may become available as an agent develops.",
  },
  {
    question: "How quickly can I start?",
    answer:
      "Timing varies based on the interview process, licensing, background requirements, contracting, training, and individual availability. No specific start date should be assumed until all required steps are completed.",
  },
  {
    question: "Are earnings or promotions guaranteed?",
    answer:
      "No. Earnings, bonuses, renewals, promotions, and leadership opportunities depend on individual performance, production, persistency, licensing, company standards, and contract requirements.",
  },
  {
    question: "Is this opportunity right for everyone?",
    answer:
      "No. This opportunity is best suited for people who are comfortable with performance-based compensation, willing to obtain a license, coachable, disciplined, and able to work consistently without guaranteed hourly pay.",
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
          <p className={styles.eyebrow}>COMMON QUESTIONS</p>
          <h2 id="faq-heading" className={styles.headline}>
            <span>Everything You Should Know</span>
            <span>
              <em>Before You Apply.</em>
            </span>
          </h2>
          <p className={styles.supportingCopy}>
            We believe candidates should understand the opportunity clearly before moving forward.
            Here are direct answers to the questions we hear most often.
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
            The company overview and interview process are designed to give you a clear understanding
            of the role before you make a decision.
          </p>
          <a href="#apply">Continue to the Application ↓</a>
        </div>
      </div>
    </section>
  );
}
