"use client";

import { Crown, Hotel, Map, MessageCircle, Plane, Route, Users } from "lucide-react";
import { useI18n } from "../../lib/i18n/useI18n";
import { buildWhatsAppUrl } from "../../lib/transferPricing";
import { WhatsAppBrandIcon } from "../WhatsAppBrandIcon";

const serviceKeys = [
  "airportTransfers",
  "hotelTransfers",
  "vipTransfers",
  "groupTransfers",
  "intercityTransfers",
  "customRoutes"
] as const;

const serviceIcons = [Plane, Hotel, Crown, Users, Route, Map];

export function HomeOtherServices() {
  const { dictionary } = useI18n();
  const copy = dictionary.site.homeOtherServices;

  return (
    <section className="home-other-services" id="other-services">
      <div className="container">
        <div className="home-section-title home-section-title-stacked">
          <span aria-hidden="true" />
          <div>
            <h2>{copy.title}</h2>
            <p>{copy.subtitle}</p>
          </div>
          <span aria-hidden="true" />
        </div>

        <div className="home-service-grid">
          {serviceKeys.map((key, index) => {
            const service = copy.items[key];
            const Icon = serviceIcons[index] ?? MessageCircle;

            return (
              <article className="home-service-card" key={key}>
                <div className="home-service-icon">
                  <Icon size={23} aria-hidden="true" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppBrandIcon />
                  {copy.cta}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
