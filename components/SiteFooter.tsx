import Link from "next/link";
import { serviceAreas } from "../lib/transferRoutes";
import { buildWhatsAppUrl } from "../lib/transferPricing";
import { WhatsAppBrandIcon } from "./WhatsAppBrandIcon";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/routes", label: "Routes & Prices" },
  { href: "/fleet", label: "Fleet" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-column">
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark">ET</span>
            <span className="brand-text">Emirs Transfer</span>
          </Link>
          <p>
            Private VIP airport transfers from Dalaman Airport with fixed prices, Mercedes vehicles,
            hotel drop-off and calm WhatsApp booking support.
          </p>
          <a className="button button-whatsapp footer-cta" href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            <WhatsAppBrandIcon />
            Book via WhatsApp
          </a>
        </div>

        <div>
          <h2>Quick Links</h2>
          <div className="footer-links">
            {quickLinks.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2>Service Areas</h2>
          <div className="service-area-list">
            {serviceAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </div>

        <div>
          <h2>Booking</h2>
          <p className="footer-small">
            Share your arrival date, flight number, hotel name and passenger count. We will confirm your private transfer
            clearly via WhatsApp.
          </p>
          <a className="footer-text-link" href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            Get instant price
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Emirs Transfer. All rights reserved.</span>
        <span>Luxury private Dalaman Airport transfers.</span>
      </div>
    </footer>
  );
}
