import { Mail, MapPin, MessageCircle, UserRound } from "lucide-react";
import { Logo } from "../brand/Logo";
import { type PageDictionary } from "../../lib/i18n/dictionaries";
import { createWhatsAppLink } from "../../lib/whatsapp";

export function SiteFooter({ t }: { t: PageDictionary }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo className="brand footer-brand" href="#home" variant="footer" brandName={t.brand.name} />
          <p>{t.footer.description}</p>
        </div>
        <div>
          <h3>{t.footer.quickLinks}</h3>
          {t.navItems.map((item) => (
            <a href={item.href} key={`footer-${item.href}`}>
              {item.label}
            </a>
          ))}
        </div>
        <div>
          <h3>{t.footer.services}</h3>
          {t.footer.serviceLinks.map((serviceLink, index) => (
            <a href={index === t.footer.serviceLinks.length - 1 ? "/diger-hizmetler" : "#booking"} key={serviceLink}>
              {serviceLink}
            </a>
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
          <a href="#contact">{t.footer.privacy}</a>
          <a href="#contact">{t.footer.terms}</a>
        </div>
      </div>
    </footer>
  );
}
