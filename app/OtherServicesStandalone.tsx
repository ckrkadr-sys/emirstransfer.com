"use client";

import { Map, Sailboat } from "lucide-react";
import { WhatsAppBrandIcon } from "../components/WhatsAppBrandIcon";
import { services } from "../data/services";
import { otherServicesExperience } from "../lib/i18n/dictionaries";
import { useI18n } from "../lib/i18n/useI18n";
import { createWhatsAppLink } from "../lib/whatsapp";

const serviceIconMap = {
  map: Map,
  sailboat: Sailboat
};

export function OtherServicesStandalone() {
  const { dictionary: t, locale } = useI18n();
  const fallbackExperience = locale === "tr" ? otherServicesExperience.tr : otherServicesExperience.en;

  return (
    <main className="services-page">
      <section className="services-page-hero">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">{t.otherServices.eyebrow}</span>
            <h1>{t.otherServices.title}</h1>
            <p>{t.otherServices.text}</p>
          </div>

          <div className="services-grid services-grid-rich">
            {services.map((serviceMeta) => {
              const service = t.otherServices[serviceMeta.dictionaryKey];
              const experience = {
                ...fallbackExperience[serviceMeta.dictionaryKey],
                ...service
              };
              const Icon = serviceIconMap[serviceMeta.icon];

              return (
                <article
                  className={`service-showcase service-showcase-${serviceMeta.id}`}
                  key={service.title}
                >
                  <div className="service-showcase-media">
                    <img src={serviceMeta.image} alt={experience.heroImageAlt} />
                  </div>

                  <div className="service-showcase-body">
                    <div className="service-showcase-intro">
                      <span className="service-badge">
                        <Icon size={15} aria-hidden="true" />
                        {service.subtitle}
                      </span>
                      <h2>{service.title}</h2>
                      <p>{service.description}</p>
                    </div>

                    <div className="service-experience" aria-labelledby={`${serviceMeta.id}-experience-title`}>
                      <div className="service-experience-heading">
                        <h3 id={`${serviceMeta.id}-experience-title`}>{experience.experienceTitle}</h3>
                        <p>{experience.experienceDescription}</p>
                      </div>
                      <div className="destination-grid">
                        {experience.destinations.map((destination) => (
                          <article className="destination-card" key={destination.title}>
                            <div className="destination-image">
                              <img src={destination.image} alt={destination.imageAlt} loading="lazy" />
                              <span className="destination-duration">{destination.duration}</span>
                            </div>
                            <div className="destination-content">
                              <h4>{destination.title}</h4>
                              <p>{destination.description}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>

                    <a
                      className="button button-whatsapp service-showcase-cta"
                      href={createWhatsAppLink(service.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
    </main>
  );
}
