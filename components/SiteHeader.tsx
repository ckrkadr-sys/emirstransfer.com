"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe2, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { languageOptions, type Locale } from "../lib/i18n/config";
import { useI18n } from "../lib/i18n/useI18n";
import { createWhatsAppLink } from "../lib/whatsapp";
import { WhatsAppBrandIcon } from "./WhatsAppBrandIcon";

function isActive(pathname: string, href: string) {
  const path = href.split("#")[0] || "/";

  if (path === "/") {
    return pathname === "/";
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}

function resolveHomeHash(href: string) {
  if (href.startsWith("#")) {
    return `/${href}`;
  }

  return href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale, dictionary: t } = useI18n();
  const selectedLanguage = languageOptions.find((language) => language.locale === locale) ?? languageOptions[0];
  const whatsappUrl = createWhatsAppLink(t.common.whatsappInquiry);

  useEffect(() => {
    if (!isLanguageOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!languageRef.current?.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isLanguageOpen]);

  function selectLanguage(nextLocale: Locale) {
    setLocale(nextLocale);
    setIsLanguageOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container header-shell">
        <Link className="brand" href="/" aria-label={t.a11y.home} onClick={() => setIsOpen(false)}>
          <span className="brand-mark">{t.brand.mark}</span>
          <span className="brand-text">{t.brand.name}</span>
        </Link>

        <nav className="desktop-nav" aria-label={t.a11y.primaryNavigation}>
          {t.navItems.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              className={isActive(pathname, item.href) ? "nav-link nav-link-active" : "nav-link"}
              href={resolveHomeHash(item.href)}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language" ref={languageRef}>
            <button
              type="button"
              className={`language-trigger ${isLanguageOpen ? "language-trigger-open" : ""}`}
              aria-haspopup="listbox"
              aria-expanded={isLanguageOpen}
              aria-label={t.a11y.languageSelector}
              onClick={() => setIsLanguageOpen((open) => !open)}
            >
              <Globe2 size={16} aria-hidden="true" />
              <span>{selectedLanguage.code}</span>
              <ChevronDown className="language-chevron" size={14} aria-hidden="true" />
            </button>

            {isLanguageOpen && (
              <div className="language-menu" role="listbox" aria-label={t.common.selectLanguage}>
                {languageOptions.map((language) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={locale === language.locale}
                    className={`language-option ${locale === language.locale ? "selected" : ""}`}
                    key={language.code}
                    onClick={() => selectLanguage(language.locale)}
                  >
                    <span className="language-code">{language.code}</span>
                    <span>{t.language[language.locale]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a className="whatsapp-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={t.a11y.contactWhatsapp}>
            <WhatsAppBrandIcon />
          </a>

          <Link className="button button-primary header-book" href="/#price-finder">
            {t.common.bookNow}
          </Link>

          <button
            type="button"
            className="mobile-menu-button"
            aria-label={isOpen ? t.a11y.mobileNavigation : t.a11y.openMobileMenu}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          <nav aria-label={t.a11y.mobileNavigation}>
            {t.navItems.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                className={isActive(pathname, item.href) ? "mobile-nav-link mobile-nav-link-active" : "mobile-nav-link"}
                href={resolveHomeHash(item.href)}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mobile-language" aria-label={t.a11y.languageSelector}>
            {languageOptions.map((language) => (
              <button
                type="button"
                className={locale === language.locale ? "selected" : ""}
                key={language.code}
                onClick={() => {
                  selectLanguage(language.locale);
                  setIsOpen(false);
                }}
              >
                <span>{language.code}</span>
                <small>{t.language[language.locale]}</small>
              </button>
            ))}
          </div>

          <div className="mobile-menu-ctas">
            <a
              className="button button-whatsapp mobile-whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
            >
              <WhatsAppBrandIcon />
              {t.common.contactWhatsapp}
            </a>
            <Link className="button button-primary" href="/#price-finder" onClick={() => setIsOpen(false)}>
              {t.common.bookNow}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
