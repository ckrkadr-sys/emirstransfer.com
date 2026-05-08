import type { Metadata } from "next";
import { BadgeCheck, Luggage, ShieldCheck, Sparkles, Users } from "lucide-react";
import { CtaBand } from "../../components/CtaBand";
import { PageHero } from "../../components/PageHero";
import { VehicleOptions } from "../../components/VehicleOptions";

export const metadata: Metadata = {
  title: "Mercedes VIP Transfer Fleet",
  description:
    "Mercedes Vito and Mercedes Sprinter VIP airport transfer vehicles for couples, families and groups travelling from Dalaman Airport."
};

const fleetNotes = [
  {
    title: "Private VIP comfort",
    text: "A quiet, private transfer experience for airport arrivals, hotel departures and family holidays.",
    icon: Sparkles
  },
  {
    title: "Luggage flexibility",
    text: "Vehicles are selected for airport travel with space for suitcases, strollers and group luggage.",
    icon: Luggage
  },
  {
    title: "Guest-focused service",
    text: "Meet & greet, flight tracking and clear WhatsApp communication before pickup.",
    icon: BadgeCheck
  },
  {
    title: "Families and groups",
    text: "Mercedes Vito for 1-5 passengers and Sprinter options for larger groups up to 16 passengers.",
    icon: Users
  }
];

export default function FleetPage() {
  return (
    <main>
      <PageHero
        eyebrow="Fleet"
        title="Mercedes VIP airport transfer vehicles"
        text="Travel from Dalaman Airport in private Mercedes Vito and Mercedes Sprinter vehicles prepared for comfort, luggage and reliable hotel transfers."
      />
      <VehicleOptions />
      <section className="section section-white">
        <div className="container fleet-note-grid">
          {fleetNotes.map((note) => {
            const Icon = note.icon;
            return (
              <article className="feature-card" key={note.title}>
                <div className="feature-icon">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h2>{note.title}</h2>
                <p>{note.text}</p>
              </article>
            );
          })}
          <article className="feature-card feature-card-dark">
            <div className="feature-icon">
              <ShieldCheck size={22} aria-hidden="true" />
            </div>
            <h2>Airport transfer suitability</h2>
            <p>Clean interiors, professional pickup planning and direct hotel drop-off across the main Dalaman transfer regions.</p>
          </article>
        </div>
      </section>
      <CtaBand title="Choose your Mercedes VIP transfer vehicle" buttonLabel="Confirm Fleet on WhatsApp" />
    </main>
  );
}
