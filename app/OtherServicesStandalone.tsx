"use client";

import Image from "next/image";
import { Map, Sailboat } from "lucide-react";
import { CtaBand } from "../components/CtaBand";
import { PageHero } from "../components/PageHero";
import { WhatsAppBrandIcon } from "../components/WhatsAppBrandIcon";
import { useI18n } from "../lib/i18n/useI18n";
import { createWhatsAppLink } from "../lib/whatsapp";

const serviceCards: Array<{ key: "minibusTour" | "boatRental"; image: string; icon: typeof Map }> = [
  { key: "minibusTour", image: "/images/minibus-city-tour-sprinter.png", icon: Map },
  { key: "boatRental", image: "/images/private-tour-boat.png", icon: Sailboat }
];

export function OtherServicesStandalone() {
  const { dictionary: t } = useI18n();

  return (
    <main className="services-page">
      <PageHero eyebrow={t.otherServices.eyebrow} title={t.otherServices.title} text={t.otherServices.text} />

      <section className="section section-white">
        <div className="container">
          <div className="vehicle-grid">
            {serviceCards.map((serviceMeta) => {
              const service = t.otherServices[serviceMeta.key];
              const Icon = serviceMeta.icon;

              return (
                <article className="vehicle-card" key={service.title}>
                  <div className="vehicle-image">
                    <Image src={serviceMeta.image} alt={service.title} fill sizes="(max-width: 760px) 100vw, 50vw" />
                  </div>
                  <div className="vehicle-content">
                    <span>
                      <Icon size={15} aria-hidden="true" />
                      {service.subtitle}
                    </span>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                    <a className="button button-primary" href={createWhatsAppLink(service.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                      <WhatsAppBrandIcon />
                      {service.cta}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
