"use client";

import Link from "next/link";
import { Mail, MapPin, MessageCircle, UserRound } from "lucide-react";
import { useI18n } from "../lib/i18n/useI18n";
import { createWhatsAppLink } from "../lib/whatsapp";

function resolveHomeHash(href: string) {
  if (href.startsWith("#")) {
    return `/${href}`;
  }

  return href;
}

export function SiteFooter() {
  const { dictionary: t } = useI18n();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark brand-mark-logo" aria-hidden="true">
              <img src="/images/emirs-travel-brand-mark.png" alt="" />
            </span>
            <span>{t.brand.name}</span>
          </Link>
          <p>{t.footer.description}</p>
        </div>
        <div>
          <h3>{t.footer.quickLinks}</h3>
          {t.navItems.map((item) => (
            <Link href={resolveHomeHash(item.href)} key={`footer-${item.href}`}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>{t.footer.services}</h3>
          {t.footer.serviceLinks.map((serviceLink, index) => (
            <Link href={index === t.footer.serviceLinks.length - 1 ? "/diger-hizmetler" : "/#booking"} key={serviceLink}>
              {serviceLink}
            </Link>
          ))}
        </div>
        <div>
          <h3>{t.footer.contact}</h3>
          <a href={`tel:${t.brand.phoneHref}`}>
            <UserRound size={16} aria-hidden="true" />
            {t.brand.phone}
          </a>
          <a href={createWhatsAppLink(t.common.whatsappInquiry)} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} aria-hidden="true" />
            {t.common.whatsapp}
          </a>
          <a href={`mailto:${t.brand.email}`}>
            <Mail size={16} aria-hidden="true" />
            {t.brand.email}
          </a>
          <span>
            <MapPin size={16} aria-hidden="true" />
            {t.footer.serviceArea}
          </span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{t.footer.copyright}</span>
        <div>
          <Link href="/#contact">{t.footer.privacy}</Link>
          <Link href="/#contact">{t.footer.terms}</Link>
        </div>
      </div>
    </footer>
  );
}
