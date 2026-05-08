import { ChevronDown } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const faqs = [
  {
    question: "Are your transfer prices fixed?",
    answer: "Yes. Your route price is confirmed before travel, with no taxi meter and no surprise charges."
  },
  {
    question: "Do you offer private transfers only?",
    answer: "Yes. Transfers are private for your party, from Dalaman Airport directly to your hotel or destination."
  },
  {
    question: "Do you track delayed flights?",
    answer: "Yes. Share your flight number and we will follow arrival changes for a smoother pickup."
  },
  {
    question: "Can I book via WhatsApp?",
    answer: "Yes. WhatsApp is the fastest way to confirm availability, hotel details and pickup information."
  },
  {
    question: "Which areas do you serve from Dalaman Airport?",
    answer: "We serve Fethiye, Çalış, Ölüdeniz, Ovacık, Hisarönü, Faralya, Kabak, Göcek, Marmaris, İçmeler and nearby hotel areas."
  },
  {
    question: "Which vehicle is used for 1-5 passengers?",
    answer: "The 1-5 passenger tier uses a Mercedes Vito for private VIP airport transfers."
  },
  {
    question: "Which vehicle is used for larger groups?",
    answer: "Groups of 6-12 and 12-16 passengers are served with Mercedes Sprinter vehicles."
  },
  {
    question: "Is hotel drop-off included?",
    answer: "Yes. Hotel, villa, marina or agreed private address drop-off is included in the fixed transfer."
  }
];

export function FaqSection() {
  return (
    <section className="section section-ivory">
      <div className="container faq-layout">
        <SectionHeading
          eyebrow="FAQ"
          title="Clear answers before you travel"
          text="Short, practical details for booking a private Dalaman Airport transfer with confidence."
          align="left"
        />
        <div className="faq-list">
          {faqs.map((faq) => (
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
