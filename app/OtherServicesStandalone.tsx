import { Map, MessageCircle, Sailboat } from "lucide-react";
import { type Locale } from "../lib/i18n/config";
import { dictionaries, type PageDictionary } from "../lib/i18n/dictionaries";
import { createWhatsAppLink } from "../lib/whatsapp";

const serviceCards: Array<{ key: "minibusTour" | "boatRental"; image: string; icon: typeof Map }> = [
  { key: "minibusTour", image: "/images/minibus-city-tour-sprinter.png", icon: Map },
  { key: "boatRental", image: "/images/private-tour-boat.png", icon: Sailboat }
];

function getDictionary(locale: Locale): PageDictionary {
  return dictionaries[locale] as PageDictionary;
}

function resolveNavHref(href: string) {
  if (href === "/" || href.startsWith("/")) {
    return href;
  }

  return `/${href}`;
}

export function OtherServicesStandalone({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <main className="services-page">
      <header className="services-page-header">
        <div className="container header-inner">
          <a className="brand" href="/" aria-label={t.a11y.home}>
            <span className="brand-mark">{t.brand.mark}</span>
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

      <section className="services-page-hero">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">{t.otherServices.eyebrow}</span>
            <h1>{t.otherServices.title}</h1>
            <p>{t.otherServices.text}</p>
          </div>

          <div className="services-grid">
            {serviceCards.map((serviceMeta) => {
              const service = t.otherServices[serviceMeta.key];
              const Icon = serviceMeta.icon;

              return (
                <article className="service-card" key={service.title}>
                  <div className="service-image">
                    <img src={serviceMeta.image} alt={service.title} />
                  </div>
                  <div className="service-content">
                    <span className="service-badge">
                      <Icon size={15} aria-hidden="true" />
                      {service.subtitle}
                    </span>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                    <a href={createWhatsAppLink(service.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                      {service.cta}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="footer services-page-footer">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="/">
              <span className="brand-mark">{t.brand.mark}</span>
              <span>{t.brand.name}</span>
            </a>
            <p>{t.footer.description}</p>
          </div>
          <div>
            <h3>{t.footer.quickLinks}</h3>
            {t.navItems.map((item) => (
              <a href={resolveNavHref(item.href)} key={`footer-${item.href}`}>
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <h3>{t.footer.contact}</h3>
            <a href={`tel:${t.brand.phoneHref}`}>{t.brand.phone}</a>
            <a href={createWhatsAppLink(t.common.whatsappInquiry)} target="_blank" rel="noopener noreferrer">
              {t.common.whatsapp}
            </a>
            <a href={`mailto:${t.brand.email}`}>{t.brand.email}</a>
            <span>{t.footer.serviceArea}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
