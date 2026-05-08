"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { buildWhatsAppUrl } from "../lib/transferPricing";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/routes", label: "Routes & Prices" },
  { href: "/fleet", label: "Fleet" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <header className="site-header">
      <div className="container header-shell">
        <Link className="brand" href="/" aria-label="Emirs Transfer home" onClick={() => setIsOpen(false)}>
          <span className="brand-mark">ET</span>
          <span className="brand-text">Emirs Transfer</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={isActive(pathname, item.href) ? "nav-link nav-link-active" : "nav-link"}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a className="button button-whatsapp header-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} aria-hidden="true" />
            Book via WhatsApp
          </a>
          <button
            type="button"
            className="mobile-menu-button"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          <nav aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={isActive(pathname, item.href) ? "mobile-nav-link mobile-nav-link-active" : "mobile-nav-link"}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            className="button button-whatsapp mobile-whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
          >
            <MessageCircle size={18} aria-hidden="true" />
            Book via WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
