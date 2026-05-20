"use client";

import { BadgeCheck, Luggage, ShieldCheck, Sparkles, Users } from "lucide-react";
import { VehicleOptions } from "../../components/VehicleOptions";
import { useI18n } from "../../lib/i18n/useI18n";

const noteIcons = [Sparkles, Luggage, BadgeCheck, Users];

export function FleetPageContent() {
  const { dictionary } = useI18n();
  const copy = dictionary.site.fleetPage;

  return (
    <main>
      <VehicleOptions />
      <section className="section section-white">
        <div className="container fleet-note-grid">
          {copy.notes.map((note, index) => {
            const Icon = noteIcons[index] ?? BadgeCheck;
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
            <h2>{copy.suitability.title}</h2>
            <p>{copy.suitability.text}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
