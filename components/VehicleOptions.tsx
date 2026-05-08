import Image from "next/image";
import { Luggage, ShieldCheck, Users } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const vehicles = [
  {
    name: "Mercedes Vito",
    passengers: "1-5 passengers",
    image: "/images/minibus-city-tour-sprinter.png",
    description: "Private VIP comfort for couples, families and small groups.",
    points: ["Airport-ready luggage space", "Private hotel drop-off", "Comfortable family transfers"]
  },
  {
    name: "Mercedes Sprinter",
    passengers: "6-12 passengers",
    image: "/images/mercedes-benz-sprinter-fleet.png",
    description: "Also available for 12-16 passengers. Ideal for larger groups and hotel transfers.",
    points: ["Group transfer comfort", "Flexible luggage handling", "Calm arrival experience"]
  }
];

const pointIcons = [Luggage, ShieldCheck, Users];

export function VehicleOptions({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="section section-midnight" id="fleet-preview">
      <div className="container">
        {showHeading && (
          <SectionHeading
            eyebrow="Mercedes VIP Fleet"
            title="Vehicle Options"
            text="Private Mercedes vehicles selected for airport comfort, clean interiors and reliable hotel transfers."
            tone="light"
          />
        )}
        <div className="vehicle-grid">
          {vehicles.map((vehicle) => (
            <article className="vehicle-card" key={vehicle.name}>
              <div className="vehicle-image">
                <Image src={vehicle.image} alt={vehicle.name} fill sizes="(max-width: 760px) 100vw, 50vw" />
              </div>
              <div className="vehicle-content">
                <span>{vehicle.passengers}</span>
                <h3>{vehicle.name}</h3>
                <p>{vehicle.description}</p>
                <ul>
                  {vehicle.points.map((point, index) => {
                    const Icon = pointIcons[index] ?? ShieldCheck;
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
