"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useI18n } from "../../lib/i18n/useI18n";
import { buildWhatsAppUrl } from "../../lib/transferPricing";
import { WhatsAppBrandIcon } from "../WhatsAppBrandIcon";
import { HomeTrustBadges } from "./HomeTrustBadges";

export function HomeHeroSection() {
  const { dictionary } = useI18n();
  const copy = dictionary.site.home.hero;

  return (
    <section className="home-hero">
      <div className="home-hero-glow" aria-hidden="true" />
      <div className="container home-hero-inner">
        <div className="home-hero-copy">
          <span className="home-eyebrow">{copy.eyebrow}</span>
          <h1>
            <span>{copy.titleMain ?? copy.title}</span>
            {copy.titleAccent && <em>{copy.titleAccent}</em>}
          </h1>
          <p>{copy.text}</p>
          <div className="home-hero-actions">
            <a className="home-btn home-btn-gold" href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppBrandIcon />
              {copy.bookButton}
            </a>
            <a className="home-btn home-btn-ghost" href="#price-finder">
              <ArrowRight size={17} aria-hidden="true" />
              {copy.checkPricesButton}
            </a>
          </div>
          <HomeTrustBadges />
        </div>

        <div className="home-hero-vehicle" aria-label={copy.vehicleAlt}>
          <Image
            src="/images/mercedes-benz-sprinter-fleet.png"
            alt={copy.vehicleAlt}
            fill
            priority
            sizes="(max-width: 980px) 92vw, 54vw"
          />
        </div>
      </div>
    </section>
  );
}
