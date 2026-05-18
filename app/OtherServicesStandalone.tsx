"use client";

import { Map, Sailboat } from "lucide-react";
import { services } from "../data/services";
import { useI18n } from "../lib/i18n/useI18n";
import { createWhatsAppLink } from "../lib/whatsapp";

const serviceIconMap = {
  map: Map,
  sailboat: Sailboat
};

export function OtherServicesStandalone() {
  const { dictionary: t } = useI18n();

  return (
    <main className="services-page">
      <section className="services-page-hero">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">{t.otherServices.eyebrow}</span>
            <h1>{t.otherServices.title}</h1>
            <p>{t.otherServices.text}</p>
          </div>

          <div className="services-grid">
            {services.map((serviceMeta) => {
              const service = t.otherServices[serviceMeta.dictionaryKey];
              const Icon = serviceIconMap[serviceMeta.icon];

              return (
                <article className="service-card" key={service.title}>
                  <div className="service-image">
                    <img src={serviceMeta.image} alt={service.title} />
                  </div>
                  <div className="service-content">
                    <span className="service-badge">
                      <Icon size={15} aria-hidden="true" />
                      {service.subtitle}
                    </span>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                    <a href={createWhatsAppLink(service.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                      {service.cta}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
