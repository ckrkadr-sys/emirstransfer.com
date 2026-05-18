import Link from "next/link";
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
        <Link className="brand" href="/" aria-label={t.a11y.home}>
          <span className="brand-mark brand-mark-logo" aria-hidden="true">
            <img src="/images/emirs-travel-brand-mark.png" alt="" />
          </span>
          <span>{t.brand.name}</span>
        </Link>

        <nav className="desktop-nav main-nav-group" aria-label={t.a11y.primaryNavigation}>
          {t.navItems.map((item) => (
            <Link key={item.label} className="nav-pill" href={resolveNavHref(item.href)}>
              {item.label}
            </Link>
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
          <Link className="button button-primary header-book" href="/#booking">
            {t.common.bookNow}
          </Link>
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
          <p>{t.footer.description}</p>
        </div>
        <div>
          <h3>{t.footer.quickLinks}</h3>
          {t.navItems.map((item) => (
            <Link href={resolveNavHref(item.href)} key={`routes-footer-${item.href}`}>
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
