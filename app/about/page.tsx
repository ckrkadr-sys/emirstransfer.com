import type { Metadata } from "next";
import { CircleDollarSign, Handshake, MapPinned, MessageCircle, Plane, Route } from "lucide-react";
import { CtaBand } from "../../components/CtaBand";
import { PageHero } from "../../components/PageHero";
import { SectionHeading } from "../../components/SectionHeading";

export const metadata: Metadata = {
  title: "About Emirs Transfer",
  description:
    "Emirs Transfer provides private VIP airport transfers from Dalaman Airport to Fethiye, Ölüdeniz, Göcek, Marmaris and surrounding hotel regions."
};

const values = [
  {
    title: "Fixed prices",
    text: "Clear private transfer prices before you travel, with no taxi meter or surprise charges.",
    icon: CircleDollarSign
  },
  {
    title: "Private Mercedes vehicles",
    text: "Mercedes Vito and Sprinter options for couples, families and groups.",
    icon: Route
  },
  {
    title: "WhatsApp support",
    text: "Quick confirmation for arrival details, hotel names and pickup questions.",
    icon: MessageCircle
  },
  {
    title: "Hotel drop-off",
    text: "Direct transfer to hotels, villas, marinas and agreed private addresses.",
    icon: MapPinned
  },
  {
    title: "Flight tracking",
    text: "Share your flight number so pickup can be coordinated around arrival changes.",
    icon: Plane
  },
  {
    title: "Meet & greet",
    text: "A calm airport welcome and direct private transfer after landing.",
    icon: Handshake
  }
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="Local VIP transfer expertise with a warm, professional touch"
        text="Emirs Transfer provides private VIP airport transfers from Dalaman Airport to Fethiye, Ölüdeniz, Göcek, Marmaris and surrounding hotel regions."
      />

      <section className="section section-white">
        <div className="container about-layout">
          <div>
            <SectionHeading
              eyebrow="Guest-Focused Service"
              title="Premium, reliable and easy to book"
              text="We focus on the details that matter after a flight: clear pricing, comfortable private vehicles, quick communication and direct hotel drop-off."
              align="left"
            />
            <p className="about-copy">
              Whether you are arriving for a family holiday in Ölüdeniz, a marina stay in Fethiye, a quiet escape in
              Faralya or a resort transfer to Göcek, the experience is built around simple booking and a calm arrival.
            </p>
          </div>
          <div className="about-stat-panel">
            <span>Dalaman Airport</span>
            <strong>Private VIP Transfers</strong>
            <p>Fethiye · Çalış · Ölüdeniz · Ovacık · Hisarönü · Faralya · Kabak · Göcek · Marmaris · İçmeler</p>
          </div>
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container value-grid">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <article className="feature-card" key={value.title}>
                <div className="feature-icon">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h2>{value.title}</h2>
                <p>{value.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBand title="Arrive with a confirmed private transfer" buttonLabel="Ask Emirs Transfer on WhatsApp" />
    </main>
  );
}
