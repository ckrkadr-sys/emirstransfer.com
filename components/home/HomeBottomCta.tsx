"use client";

import { useI18n } from "../../lib/i18n/useI18n";
import { buildWhatsAppUrl } from "../../lib/transferPricing";
import { WhatsAppBrandIcon } from "../WhatsAppBrandIcon";

export function HomeBottomCta() {
  const { dictionary } = useI18n();
  const copy = dictionary.site.cta;

  return (
    <section className="home-bottom-section">
      <div className="container">
        <div className="home-bottom-cta">
          <div className="home-cta-crest" aria-hidden="true">
            <span>{dictionary.brand.mark}</span>
          </div>
          <h2>{copy.title}</h2>
          <a className="home-btn home-btn-gold home-bottom-button" href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            <WhatsAppBrandIcon />
            {copy.button}
          </a>
        </div>
      </div>
    </section>
  );
}
