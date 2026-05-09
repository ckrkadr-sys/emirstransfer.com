"use client";

import { ChevronDown } from "lucide-react";
import { useI18n } from "../lib/i18n/useI18n";
import { SectionHeading } from "./SectionHeading";

export function FaqSection() {
  const { dictionary } = useI18n();
  const copy = dictionary.site.faq;

  return (
    <section className="section section-ivory">
      <div className="container faq-layout">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} text={copy.text} align="left" />
        <div className="faq-list">
          {copy.items.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
