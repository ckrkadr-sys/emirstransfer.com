"use client";

import Link from "next/link";
import { useI18n } from "../lib/i18n/useI18n";
import { serviceAreas } from "../lib/transferRoutes";
import { buildWhatsAppUrl } from "../lib/transferPricing";
import { WhatsAppBrandIcon } from "./WhatsAppBrandIcon";

export function SiteFooter() {
  const { dictionary, t } = useI18n();
  const copy = dictionary.site.footer;

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-column">
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark">{dictionary.brand.mark}</span>
            <span className="brand-text">{dictionary.brand.name}</span>
          </Link>
          <p>{copy.description}</p>
          <a className="button button-whatsapp footer-cta" href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            <WhatsAppBrandIcon />
            {dictionary.site.common.bookViaWhatsApp}
          </a>
        </div>

        <div>
          <h2>{copy.quickLinks}</h2>
          <div className="footer-links">
            {dictionary.navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2>{copy.serviceAreas}</h2>
          <div className="service-area-list">
            {serviceAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </div>

        <div>
          <h2>{copy.bookingTitle}</h2>
          <p className="footer-small">{copy.bookingText}</p>
          <a className="footer-text-link" href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            {copy.textLink}
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>{t("site.footer.copyright", { year: new Date().getFullYear() })}</span>
        <span>{copy.tagline}</span>
      </div>
    </footer>
  );
}
