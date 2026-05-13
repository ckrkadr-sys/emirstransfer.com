"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe2, Menu, X } from "lucide-react";
import { Logo } from "../brand/Logo";
import { languageOptions, type Locale } from "../../lib/i18n/config";
import { type PageDictionary } from "../../lib/i18n/dictionaries";
import { createWhatsAppLink } from "../../lib/whatsapp";

function WhatsAppBrandIcon() {
  return (
    <svg className="whatsapp-brand-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        fill="#25D366"
        d="M16 3.2C8.93 3.2 3.2 8.93 3.2 16c0 2.26.59 4.46 1.72 6.4L3.34 29l6.75-1.54A12.75 12.75 0 0 0 16 28.8c7.07 0 12.8-5.73 12.8-12.8S23.07 3.2 16 3.2Z"
      />
      <path
        fill="#ffffff"
        d="M23.3 19.36c-.36-.18-2.13-1.05-2.46-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.9-1.79-1.07-.96-1.8-2.14-2.01-2.5-.21-.36-.02-.56.16-.74.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.61-.81-.62l-.69-.01c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.54 3.88 6.15 5.44.86.37 1.53.59 2.05.76.86.27 1.64.23 2.26.14.69-.1 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42Z"
      />
    </svg>
  );
}

export function SiteHeader({
  selectedLocale,
  onLocaleSelect,
  t
}: {
  selectedLocale: Locale;
  onLocaleSelect: (locale: Locale) => void;
  t: PageDictionary;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const selectedLanguage = languageOptions.find((language) => language.locale === selectedLocale) ?? languageOptions[0];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isLangOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!languageRef.current?.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isLangOpen]);

  function selectLanguage(locale: Locale) {
    onLocaleSelect(locale);
    setIsLangOpen(false);
  }

  return (
    <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
      <div className="container header-inner">
        <Logo href="#home" ariaLabel={t.a11y.home} />

        <div className="header-navigation-area">
          <nav className="desktop-nav main-nav-group" aria-label={t.a11y.primaryNavigation}>
            {t.navItems.map((item) => (
              <a key={item.label} className="nav-pill" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions action-group">
            <div className="language" ref={languageRef}>
              <button
                type="button"
                className={`language-trigger ${isLangOpen ? "language-trigger-open" : ""}`}
                aria-haspopup="listbox"
                aria-expanded={isLangOpen}
                onClick={() => setIsLangOpen((open) => !open)}
              >
                <Globe2 size={16} aria-hidden="true" />
                <span>{selectedLanguage.code}</span>
                <ChevronDown className="language-chevron" size={14} aria-hidden="true" />
              </button>
              {isLangOpen && (
                <div className="language-menu" role="listbox" aria-label={t.common.selectLanguage}>
                  {languageOptions.map((language) => (
                    <button
                      type="button"
                      role="option"
                      aria-selected={selectedLocale === language.locale}
                      className={`language-option ${selectedLocale === language.locale ? "selected" : ""}`}
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
            <a
              className="whatsapp-link"
              href={createWhatsAppLink(t.common.whatsappInquiry)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.a11y.contactWhatsapp}
            >
              <WhatsAppBrandIcon />
            </a>
            <a className="button button-primary header-book" href="#booking">
              {t.common.bookNow}
            </a>
            <button
              type="button"
              className="mobile-menu-button"
              aria-expanded={isMenuOpen}
              aria-label={t.a11y.openMobileMenu}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <nav aria-label={t.a11y.mobileNavigation}>
            {t.navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mobile-language" aria-label={t.a11y.languageSelector}>
            {languageOptions.map((language) => (
              <button
                type="button"
                className={selectedLocale === language.locale ? "selected" : ""}
                key={language.code}
                onClick={() => {
                  selectLanguage(language.locale);
                  setIsMenuOpen(false);
                }}
              >
                <span>{language.code}</span>
                <small>{t.language[language.locale]}</small>
              </button>
            ))}
          </div>
          <div className="mobile-menu-ctas">
            <a
              className="button button-outline-dark"
              href={createWhatsAppLink(t.common.whatsappInquiry)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.common.contactWhatsapp}
            </a>
            <a className="button button-primary" href="#booking" onClick={() => setIsMenuOpen(false)}>
              {t.common.bookNow}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
