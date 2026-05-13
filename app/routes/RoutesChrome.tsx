import { Mail, MapPin, MessageCircle, UserRound } from "lucide-react";
import { defaultLocale, fallbackLocale } from "../../lib/i18n/config";
import { dictionaries, type PageDictionary } from "../../lib/i18n/dictionaries";
import { createWhatsAppLink } from "../../lib/whatsapp";

const dictionary = (dictionaries[defaultLocale] ?? dictionaries[fallbackLocale]) as PageDictionary;

function resolveNavHref(href: string) {
  if (href === "/" || href.startsWith("/")) {
    return href;
  }

  return `/${href}`;
}

export function RoutesHeader() {
  const t = dictionary;

  return (
    <header className="services-page-header">
      <div className="container header-inner">
        <a className="brand" href="/" aria-label={t.a11y.home}>
          <span className="brand-mark brand-mark-logo" aria-hidden="true">
            <img src="/images/emirs-travel-brand-mark.png" alt="" />
          </span>
          <span>{t.brand.name}</span>
        </a>

        <nav className="desktop-nav main-nav-group" aria-label={t.a11y.primaryNavigation}>
          {t.navItems.map((item) => (
            <a key={item.label} className="nav-pill" href={resolveNavHref(item.href)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions action-group">
          <a
            className="whatsapp-link"
            href={createWhatsAppLink(t.common.whatsappInquiry)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.a11y.contactWhatsapp}
          >
            <MessageCircle size={20} aria-hidden="true" />
          </a>
          <a className="button button-primary header-book" href="/#booking">
            {t.common.bookNow}
          </a>
        </div>
      </div>
    </header>
  );
}

export function RoutesFooter() {
  const t = dictionary;

  return (
    <footer className="footer services-page-footer">
      <div className="container footer-grid">
        <div>
          <a className="brand footer-brand" href="/">
            <span className="brand-mark brand-mark-logo" aria-hidden="true">
              <img src="/images/emirs-travel-brand-mark.png" alt="" />
            </span>
            <span>{t.brand.name}</span>
          </a>
          <p>{t.footer.description}</p>
        </div>
        <div>
          <h3>{t.footer.quickLinks}</h3>
          {t.navItems.map((item) => (
            <a href={resolveNavHref(item.href)} key={`routes-footer-${item.href}`}>
              {item.label}
            </a>
          ))}
        </div>
        <div>
          <h3>{t.footer.services}</h3>
          {t.footer.serviceLinks.map((serviceLink, index) => (
            <a href={index === t.footer.serviceLinks.length - 1 ? "/diger-hizmetler" : "/#booking"} key={serviceLink}>
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
          <a href="/#contact">{t.footer.privacy}</a>
          <a href="/#contact">{t.footer.terms}</a>
        </div>
      </div>
    </footer>
  );
}
