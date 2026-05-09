"use client";

import { ContactBookingForm } from "../../components/ContactBookingForm";
import { CtaBand } from "../../components/CtaBand";
import { PageHero } from "../../components/PageHero";
import { SectionHeading } from "../../components/SectionHeading";
import { WhatsAppBrandIcon } from "../../components/WhatsAppBrandIcon";
import { useI18n } from "../../lib/i18n/useI18n";
import { buildWhatsAppUrl } from "../../lib/transferPricing";
import { serviceAreas } from "../../lib/transferRoutes";

export function ContactPageContent() {
  const { dictionary } = useI18n();
  const copy = dictionary.site.contactPage;

  return (
    <main>
      <PageHero eyebrow={copy.hero.eyebrow} title={copy.hero.title} text={copy.hero.text} />

      <section className="section section-white">
        <div className="container contact-layout">
          <div className="contact-panel">
            <SectionHeading
              eyebrow={copy.guidance.eyebrow}
              title={copy.guidance.title}
              text={copy.guidance.text}
              align="left"
            />
            <a className="button button-whatsapp button-large" href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppBrandIcon />
              {copy.guidance.button}
            </a>
            <p className="contact-reassurance">{copy.guidance.reassurance}</p>
          </div>
          <ContactBookingForm />
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container">
          <SectionHeading
            eyebrow={copy.serviceAreas.eyebrow}
            title={copy.serviceAreas.title}
            text={copy.serviceAreas.text}
          />
          <div className="service-chip-grid">
            {serviceAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={copy.ctaTitle} buttonLabel={copy.ctaButton} />
    </main>
  );
}
