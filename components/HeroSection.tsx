"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useI18n } from "../lib/i18n/useI18n";
import { buildWhatsAppUrl } from "../lib/transferPricing";
import { ButtonLink } from "./Button";
import { TrustBadges } from "./TrustBadges";
import { WhatsAppBrandIcon } from "./WhatsAppBrandIcon";

export function HeroSection() {
  const { dictionary } = useI18n();
  const copy = dictionary.site.home.hero;

  return (
    <section className="hero">
      <div className="hero-background" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            {copy.eyebrow}
          </span>
          <h1>{copy.title}</h1>
          <p>{copy.text}</p>
          <div className="hero-actions">
            <ButtonLink href={buildWhatsAppUrl()} variant="whatsapp" external>
              <WhatsAppBrandIcon />
              {copy.bookButton}
            </ButtonLink>
            <ButtonLink href="#price-finder" variant="secondary">
              {copy.checkPricesButton}
              <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
          </div>
          <TrustBadges />
        </div>

        <div className="hero-visual" aria-label={copy.vehicleAlt}>
          <div className="hero-vehicle-frame">
            <Image
              src="/images/mercedes-benz-sprinter-fleet.png"
              alt={copy.vehicleAlt}
              fill
              priority
              sizes="(max-width: 900px) 92vw, 44vw"
            />
          </div>
          <div className="hero-floating-card hero-floating-card-top">
            <span>{copy.priceCardLabel}</span>
            <strong>{copy.priceCardValue}</strong>
            <small>{copy.priceCardText}</small>
          </div>
          <div className="hero-floating-card hero-floating-card-bottom">
            <span>{copy.supportCardLabel}</span>
            <strong>{copy.supportCardValue}</strong>
            <small>{copy.supportCardText}</small>
          </div>
        </div>
      </div>
    </section>
  );
}
