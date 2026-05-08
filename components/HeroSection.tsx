import Image from "next/image";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { buildWhatsAppUrl } from "../lib/transferPricing";
import { ButtonLink } from "./Button";
import { TrustBadges } from "./TrustBadges";

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-background" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            Dalaman Airport VIP Transfer
          </span>
          <h1>Luxury VIP Transfers from Dalaman Airport</h1>
          <p>
            Fixed prices, Mercedes VIP vehicles, hotel drop-off, and 24/7 WhatsApp support across Fethiye,
            Ölüdeniz, Göcek, Faralya, Marmaris and more.
          </p>
          <div className="hero-actions">
            <ButtonLink href={buildWhatsAppUrl()} variant="whatsapp" external>
              <MessageCircle size={18} aria-hidden="true" />
              Book via WhatsApp
            </ButtonLink>
            <ButtonLink href="#price-finder" variant="secondary">
              Check Prices
              <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
          </div>
          <TrustBadges />
        </div>

        <div className="hero-visual" aria-label="Mercedes VIP transfer vehicle">
          <div className="hero-vehicle-frame">
            <Image
              src="/images/mercedes-benz-sprinter-fleet.png"
              alt="Mercedes VIP transfer vehicle"
              fill
              priority
              sizes="(max-width: 900px) 92vw, 44vw"
            />
          </div>
          <div className="hero-floating-card hero-floating-card-top">
            <span>From</span>
            <strong>£35</strong>
            <small>Göcek fixed route</small>
          </div>
          <div className="hero-floating-card hero-floating-card-bottom">
            <span>Support</span>
            <strong>24/7</strong>
            <small>WhatsApp booking</small>
          </div>
        </div>
      </div>
    </section>
  );
}
