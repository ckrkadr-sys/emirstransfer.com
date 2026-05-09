"use client";

import Image from "next/image";
import { Luggage, ShieldCheck, Users } from "lucide-react";
import { useI18n } from "../lib/i18n/useI18n";
import { SectionHeading } from "./SectionHeading";

const vehicleImages = ["/images/home/vehicle-vito.png", "/images/mercedes-benz-sprinter-fleet.png"];
const pointIcons = [Luggage, ShieldCheck, Users];

export function VehicleOptions({ showHeading = true }: { showHeading?: boolean }) {
  const { dictionary } = useI18n();
  const copy = dictionary.site.vehicles;

  return (
    <section className="section section-midnight" id="fleet-preview">
      <div className="container">
        {showHeading && <SectionHeading eyebrow={copy.eyebrow} title={copy.title} text={copy.text} tone="light" />}
        <div className="vehicle-grid">
          {copy.items.map((vehicle, vehicleIndex) => (
            <article className="vehicle-card" key={vehicle.name}>
              <div className="vehicle-image">
                <Image
                  src={vehicleImages[vehicleIndex] ?? vehicleImages[0]}
                  alt={vehicle.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
              </div>
              <div className="vehicle-content">
                <span>{vehicle.passengers}</span>
                <h3>{vehicle.name}</h3>
                <p>{vehicle.description}</p>
                <ul>
                  {vehicle.points.map((point, pointIndex) => {
                    const Icon = pointIcons[pointIndex] ?? ShieldCheck;
                    return (
                      <li key={point}>
                        <Icon size={16} aria-hidden="true" />
                        {point}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
