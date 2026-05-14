"use client";

import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  ArrowLeftRight,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Globe2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Plane,
  Plus,
  Search,
  ShieldCheck,
  UserRound,
  Users,
  X
} from "lucide-react";
import { languageOptions, type Locale } from "../lib/i18n/config";
import {
  findHotelTransferRouteMatch,
  hotelTransferRoutes,
  normalizeHotelSearchValue,
  searchHotelTransferRoutes,
  type HotelTransferRoute,
  type HotelTransferRouteMatch
} from "../lib/hotelTransferRoutes";
import { type PageDictionary } from "../lib/i18n/dictionaries";
import { useI18n } from "../lib/i18n/useI18n";
import { calculateFixedRouteQuote, calculateTransferRouteQuote, getPriceTierForPassengers } from "../lib/pricing/pricing.service";
import { findFixedRoutePrice, listFixedRoutePrices } from "../lib/pricing/static-pricing.repository";
import { getLocationById, listLocations } from "../lib/routes/static-route.repository";
import { type Currency, type FixedRoutePrice, type TripType } from "../lib/pricing/pricing.types";
import { createWhatsAppLink } from "../lib/whatsapp";

type IconType = typeof Plane;
type BookingField =
  | "from"
  | "to"
  | "departureDate"
  | "departureTime"
  | "returnDate"
  | "returnTime"
  | "passengers";
type BookingErrors = Partial<Record<BookingField, string>>;
type RouteSearchResult = {
  status: "available" | "unavailable";
  tripType: TripType;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  passengers: number;
  route?: FixedRoutePrice;
  totalPrice?: number;
  reservationFee?: number;
  remainingBalance?: number;
};

const destinations = listLocations().map((location) => location.name);
const defaultFromDestination = getLocationById("dalaman-airport")?.name ?? destinations[0] ?? "";
const defaultToDestination = getLocationById("calis")?.name ?? destinations[1] ?? defaultFromDestination;
const routePrices = listFixedRoutePrices();

const MAX_PASSENGERS = 20;

const whyChooseIcons: IconType[] = [CircleDollarSign, Clock3, Plane, Car, CheckCircle2, CreditCard];

function getDestinationLabel(t: PageDictionary, destination: string) {
  return t.destinations[destination as keyof PageDictionary["destinations"]] ?? destination;
}

function toInputDate(date: Date) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function getDateWithOffset(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return toInputDate(date);
}

function formatDisplayDate(value: string) {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

function formatPrice(amount: number, currency: Currency = "GBP") {
  if (currency === "GBP") {
    return `£${amount}`;
  }

  return `${currency} ${amount}`;
}

function getHotelBookingUrl({
  hotelName,
  route,
  passengers,
  departureDate,
  departureTime,
  returnDate,
  returnTime,
  tripType,
  locale
}: {
  hotelName: string;
  route: HotelTransferRoute;
  passengers: number;
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  tripType: TripType;
  locale: Locale;
}) {
  const params = new URLSearchParams({
    from: route.origin,
    to: hotelName || route.destination,
    date: departureDate,
    departure: departureDate,
    time: departureTime,
    passengers: String(passengers),
    tripType,
    locale,
    currency: "GBP"
  });

  if (tripType === "round-trip") {
    params.set("returnDate", returnDate);
    params.set("return", returnDate);
    params.set("returnTime", returnTime);
  }

  return `/book?${params.toString()}`;
}

function getBookingUrl(result: RouteSearchResult, locale: Locale) {
  const params = new URLSearchParams({
    from: result.from,
    to: result.to,
    date: result.departureDate,
    departure: result.departureDate,
    time: result.departureTime,
    passengers: String(result.passengers),
    tripType: result.tripType,
    locale
  });

  if (result.route) {
    params.set("currency", result.route.currency);
  }

  if (result.tripType === "round-trip") {
    params.set("returnDate", result.returnDate);
    params.set("return", result.returnDate);
    params.set("returnTime", result.returnTime);
  }

  return `/book?${params.toString()}`;
}

function getWhatsappUrl(result: RouteSearchResult, t: PageDictionary) {
  const lines = [
    t.booking.whatsappIntro,
    `${t.booking.from}: ${getDestinationLabel(t, result.from)}`,
    `${t.booking.to}: ${getDestinationLabel(t, result.to)}`,
    `${t.booking.departureDate}: ${formatDisplayDate(result.departureDate)}`,
    `${t.booking.departureTime}: ${result.departureTime}`,
    result.tripType === "round-trip" ? `${t.booking.returnDate}: ${formatDisplayDate(result.returnDate)}` : "",
    result.tripType === "round-trip" ? `${t.booking.returnTime}: ${result.returnTime}` : "",
    `${t.booking.passengers}: ${t.booking.passengerLabel(result.passengers)}`,
    `${t.booking.vehicleLabel}: ${t.common.vehicle}`
  ].filter(Boolean);

  return createWhatsAppLink(lines.join("\n"));
}

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

function Header({
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
        <a className="brand" href="#home" aria-label={t.a11y.home}>
          <img className="brand-logo" src="/images/emirs-transfer-logo.png" alt="EMİRSTRANSFER.COM logosu" />
        </a>

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

function TripTypeTabs({
  tripType,
  onChange,
  t
}: {
  tripType: TripType;
  onChange: (tripType: TripType) => void;
  t: PageDictionary;
}) {
  return (
    <div className="trip-tabs" aria-label={t.booking.tripType}>
      <button
        type="button"
        className={tripType === "one-way" ? "active" : ""}
        onClick={() => onChange("one-way")}
      >
        {t.booking.oneWay}
      </button>
      <button
        type="button"
        className={tripType === "round-trip" ? "active" : ""}
        onClick={() => onChange("round-trip")}
      >
        {t.booking.roundTrip}
      </button>
    </div>
  );
}

function LocationSelect({
  label,
  value,
  onChange,
  icon: Icon,
  error,
  className,
  t,
  searchable = false,
  hotelMatches = [],
  onHotelMatchSelect
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: IconType;
  error?: string;
  className?: string;
  t: PageDictionary;
  searchable?: boolean;
  hotelMatches?: HotelTransferRouteMatch[];
  onHotelMatchSelect?: (match: HotelTransferRouteMatch) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const errorId = useId();
  const listboxId = useId();
  const filteredDestinations = useMemo(() => {
    if (!searchable) {
      return destinations;
    }

    const normalizedValue = normalizeHotelSearchValue(value);

    if (!normalizedValue) {
      return destinations;
    }

    return destinations.filter((destination) => {
      const destinationSearchText = normalizeHotelSearchValue(`${destination} ${getDestinationLabel(t, destination)}`);
      return destinationSearchText.includes(normalizedValue);
    });
  }, [searchable, t, value]);
  const shouldShowMenu = isOpen && (filteredDestinations.length > 0 || hotelMatches.length > 0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={`field field-location location-select ${className ?? ""}`} ref={wrapperRef}>
      <span id={labelId}>{label}</span>
      {searchable ? (
        <div className={`field-control location-input-shell ${error ? "field-control-error" : ""}`}>
          <Icon size={18} aria-hidden="true" />
          <input
            className="location-search-input"
            value={value}
            aria-labelledby={labelId}
            aria-describedby={error ? errorId : undefined}
            aria-autocomplete="list"
            aria-controls={shouldShowMenu ? listboxId : undefined}
            aria-expanded={isOpen}
            role="combobox"
            onChange={(event) => {
              onChange(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setIsOpen(true);
              }
            }}
          />
          <button
            type="button"
            className="location-input-toggle"
            aria-label={label}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            <ChevronDown size={16} aria-hidden="true" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={`field-control location-trigger ${error ? "field-control-error" : ""}`}
          aria-labelledby={labelId}
          aria-describedby={error ? errorId : undefined}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setIsOpen(true);
            }
          }}
        >
          <Icon size={18} aria-hidden="true" />
          <span className="selected-location">{getDestinationLabel(t, value)}</span>
          <ChevronDown size={16} aria-hidden="true" />
        </button>
      )}
      {shouldShowMenu && (
        <div className="location-menu" id={listboxId} role="listbox" aria-labelledby={labelId}>
          {hotelMatches.map((match) => (
            <button
              type="button"
              role="option"
              aria-selected="false"
              className="location-option location-option-hotel"
              key={`${match.route.id}-${match.hotelName ?? match.route.slug}`}
              onClick={() => {
                onHotelMatchSelect?.(match);
                setIsOpen(false);
              }}
            >
              <span className="hotel-match-badge">{match.matchType === "hotel" ? "Hotel match" : "Route match"}</span>
              <span className="hotel-match-title">{match.hotelName ?? match.route.destination}</span>
              <span className="hotel-match-route">{match.route.title}</span>
            </button>
          ))}

          {filteredDestinations.map((destination) => (
            <button
              type="button"
              role="option"
              aria-selected={value === destination}
              className={`location-option ${value === destination ? "selected" : ""}`}
              key={destination}
              onClick={() => {
                onChange(destination);
                setIsOpen(false);
              }}
            >
              {getDestinationLabel(t, destination)}
            </button>
          ))}
        </div>
      )}
      {error && (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}

function DateInput({
  label,
  value,
  min,
  placeholder,
  onChange,
  error,
  className
}: {
  label: string;
  value: string;
  min: string;
  placeholder: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}) {
  const errorId = useId();

  return (
    <label className={`field ${className ?? ""}`}>
      <span>{label}</span>
      <div className={`field-control ${error ? "field-control-error" : ""}`}>
        <CalendarDays size={18} aria-hidden="true" />
        <div className="date-input-shell">
          <span className="formatted-input-value">{formatDisplayDate(value) || placeholder}</span>
          <input
            className="native-overlay-input"
            type="date"
            min={min}
            value={value}
            aria-label={label}
            aria-describedby={error ? errorId : undefined}
            onChange={(event) => onChange(event.target.value)}
          />
        </div>
      </div>
      {error && (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      )}
    </label>
  );
}

function TimeInput({
  label,
  value,
  onChange,
  error,
  className
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}) {
  const errorId = useId();

  return (
    <label className={`field ${className ?? ""}`}>
      <span>{label}</span>
      <div className={`field-control ${error ? "field-control-error" : ""}`}>
        <Clock3 size={18} aria-hidden="true" />
        <input
          type="time"
          value={value}
          aria-label={label}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      {error && (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      )}
    </label>
  );
}

function PassengerSelector({
  passengers,
  onChange,
  error,
  className,
  t
}: {
  passengers: number;
  onChange: (passengers: number) => void;
  error?: string;
  className?: string;
  t: PageDictionary;
}) {
  const errorId = useId();

  return (
    <div className={`field ${className ?? ""}`}>
      <span>{t.booking.passengers}</span>
      <div className={`field-control passenger-stepper ${error ? "field-control-error" : ""}`}>
        <Users size={18} aria-hidden="true" />
        <button
          type="button"
          aria-label={t.booking.decreasePassengers}
          disabled={passengers <= 1}
          onClick={() => onChange(Math.max(1, passengers - 1))}
        >
          <Minus size={15} aria-hidden="true" />
        </button>
        <span className="passenger-value" aria-live="polite" aria-describedby={error ? errorId : undefined}>
          {t.booking.passengerLabel(passengers)}
        </span>
        <button
          type="button"
          aria-label={t.booking.increasePassengers}
          disabled={passengers >= MAX_PASSENGERS}
          onClick={() => onChange(Math.min(MAX_PASSENGERS, passengers + 1))}
        >
          <Plus size={15} aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}

function RouteResultCard({ result, t, locale }: { result: RouteSearchResult; t: PageDictionary; locale: Locale }) {
  const route = result.route;
  const isAvailable = result.status === "available" && Boolean(route);
  const currency = route?.currency ?? "GBP";
  const routeLabel = `${getDestinationLabel(t, result.from)} ${t.common.to} ${getDestinationLabel(t, result.to)}`;
  const whatsappUrl = getWhatsappUrl(result, t);

  return (
    <div className={`route-result-card ${isAvailable ? "" : "route-result-card-unavailable"}`} aria-live="polite">
      <div className="result-card-head">
        <div className="result-icon">
          {isAvailable ? <CheckCircle2 size={22} aria-hidden="true" /> : <MessageCircle size={22} aria-hidden="true" />}
        </div>
        <div>
          <h3>{isAvailable ? t.booking.resultAvailableTitle : t.booking.resultUnavailableTitle}</h3>
          <p>{isAvailable ? t.booking.resultAvailableText : t.booking.resultUnavailableText}</p>
        </div>
      </div>

      <div className="result-summary-grid">
        <span>{t.booking.routeLabel}</span>
        <strong>{routeLabel}</strong>
        <span>{t.booking.tripLabel}</span>
        <strong>{result.tripType === "round-trip" ? t.booking.roundTrip : t.booking.oneWay}</strong>
        <span>{t.booking.dateLabel}</span>
        <strong>
          {formatDisplayDate(result.departureDate)} · {result.departureTime}
        </strong>
        {result.tripType === "round-trip" && (
          <>
            <span>{t.booking.returnLabel}</span>
            <strong>
              {formatDisplayDate(result.returnDate)} · {result.returnTime}
            </strong>
          </>
        )}
        <span>{t.booking.passengers}</span>
        <strong>{t.booking.passengerLabel(result.passengers)}</strong>
        <span>{t.booking.vehicleLabel}</span>
        <strong>{t.common.vehicle}</strong>
      </div>

      {isAvailable && (
        <>
          <div className="result-price-grid">
            <div>
              <span>{t.booking.totalPriceLabel}</span>
              <strong>{formatPrice(result.totalPrice ?? 0, currency)}</strong>
            </div>
            <div>
              <span>{t.booking.reservationFeeLabel}</span>
              <strong>{formatPrice(result.reservationFee ?? 0, currency)}</strong>
            </div>
            <div>
              <span>{t.booking.remainingBalanceLabel}</span>
              <strong>{formatPrice(result.remainingBalance ?? 0, currency)}</strong>
            </div>
          </div>
          <div className="result-actions">
            <a className="button button-primary" href={getBookingUrl(result, locale)}>
              {t.booking.continueReservation}
            </a>
            <a className="button button-outline-dark" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={17} aria-hidden="true" />
              {t.common.contactWhatsapp}
            </a>
          </div>
        </>
      )}

      {!isAvailable && (
        <div className="result-actions">
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={17} aria-hidden="true" />
            {t.common.contactWhatsapp}
          </a>
        </div>
      )}
    </div>
  );
}

function BookingWidget({ t, locale }: { t: PageDictionary; locale: Locale }) {
  const today = useMemo(() => getDateWithOffset(0), []);
  const [tripType, setTripType] = useState<TripType>("one-way");
  const [from, setFrom] = useState(defaultFromDestination);
  const [to, setTo] = useState(defaultToDestination);
  const [departureDate, setDepartureDate] = useState(() => getDateWithOffset(1));
  const [departureTime, setDepartureTime] = useState("14:30");
  const [returnDate, setReturnDate] = useState(() => getDateWithOffset(8));
  const [returnTime, setReturnTime] = useState("14:30");
  const [passengers, setPassengers] = useState(2);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [searchResult, setSearchResult] = useState<RouteSearchResult | null>(null);
  const [selectedHotelName, setSelectedHotelName] = useState("");
  const [selectedHotelRoute, setSelectedHotelRoute] = useState<HotelTransferRoute | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const selectedRoute = useMemo(() => findFixedRoutePrice(from, to), [from, to]);
  const selectedHotelPriceTier = useMemo(
    () => (selectedHotelRoute ? getPriceTierForPassengers(selectedHotelRoute.prices, passengers) : null),
    [passengers, selectedHotelRoute]
  );
  const hotelRouteMatches = useMemo(
    () => (to.trim().length >= 2 ? searchHotelTransferRoutes(to, Math.min(6, hotelTransferRoutes.length)) : []),
    [to]
  );
  function clearSelectedHotelResult() {
    setSelectedHotelName("");
    setSelectedHotelRoute(null);
  }

  function resetFeedback({ clearHotel = false }: { clearHotel?: boolean } = {}) {
    setErrors({});
    setSearchResult(null);

    if (clearHotel) {
      clearSelectedHotelResult();
    }
  }

  function selectHotelMatch(match: HotelTransferRouteMatch) {
    setSelectedHotelName(match.hotelName ?? match.route.destination);
    setSelectedHotelRoute(match.route);
    setSearchResult(null);
    setErrors({});
  }

  function swapLocations() {
    setFrom(to);
    setTo(from);
    resetFeedback({ clearHotel: true });
  }

  function validate() {
    const nextErrors: BookingErrors = {};

    if (!from) {
      nextErrors.from = t.booking.errors.fromRequired;
    }

    if (!to) {
      nextErrors.to = t.booking.errors.toRequired;
    }

    if (from && to && from === to) {
      nextErrors.to = t.booking.errors.sameLocations;
    }

    if (!departureDate) {
      nextErrors.departureDate = t.booking.errors.dateRequired;
    } else if (departureDate < today) {
      nextErrors.departureDate = t.booking.errors.pastDate;
    }

    if (!departureTime) {
      nextErrors.departureTime = t.booking.errors.timeRequired;
    }

    if (tripType === "round-trip") {
      if (!returnDate) {
        nextErrors.returnDate = t.booking.errors.returnDateRequired;
      } else if (returnDate < today) {
        nextErrors.returnDate = t.booking.errors.pastDate;
      } else if (departureDate && returnDate < departureDate) {
        nextErrors.returnDate = t.booking.errors.returnBeforeDeparture;
      }

      if (!returnTime) {
        nextErrors.returnTime = t.booking.errors.returnTimeRequired;
      }
    }

    if (!Number.isFinite(passengers) || passengers < 1 || passengers > MAX_PASSENGERS) {
      nextErrors.passengers = t.booking.errors.passengersRequired;
    }

    return nextErrors;
  }

  function goToHotelBooking(route: HotelTransferRoute, hotelName: string) {
    window.location.assign(
      getHotelBookingUrl({
        hotelName,
        route,
        passengers,
        departureDate,
        departureTime,
        returnDate,
        returnTime,
        tripType,
        locale
      })
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    setSearchResult(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (selectedHotelRoute && selectedHotelName) {
      goToHotelBooking(selectedHotelRoute, selectedHotelName);
      setIsSearching(false);
      return;
    }

    const route = findFixedRoutePrice(from, to);
    const baseResult = {
      tripType,
      from,
      to,
      departureDate,
      departureTime,
      returnDate,
      returnTime,
      passengers
    };

    if (!route) {
      const hotelRouteMatch = hotelRouteMatches[0] ?? findHotelTransferRouteMatch(to);

      if (hotelRouteMatch) {
        goToHotelBooking(hotelRouteMatch.route, hotelRouteMatch.hotelName ?? hotelRouteMatch.route.destination);
        setIsSearching(false);
        return;
      }

      setSearchResult({ ...baseResult, status: "unavailable" });
      setIsSearching(false);
      return;
    }

    const quote = calculateFixedRouteQuote({ fixedRoutePrice: route, tripType });

    const nextResult: RouteSearchResult = {
      ...baseResult,
      status: "available",
      route,
      totalPrice: quote.totalPrice,
      reservationFee: quote.reservationFee,
      remainingBalance: quote.remainingBalance
    };

    window.location.assign(getBookingUrl(nextResult, locale));
    setIsSearching(false);
  }

  const bookingMessage =
    selectedHotelRoute && selectedHotelPriceTier
      ? `Selected hotel transfer: ${selectedHotelName} · ${selectedHotelRoute.origin} to ${
          selectedHotelRoute.destination
        } from ${formatPrice(selectedHotelPriceTier.gbp, "GBP")}.`
      : selectedRoute && from !== to
      ? t.booking.fixedPreview(
          selectedRoute.price,
          getDestinationLabel(t, selectedRoute.from),
          getDestinationLabel(t, selectedRoute.to)
        )
      : t.booking.paymentNote;

  return (
    <form className={`booking-widget booking-widget-${tripType}`} id="booking" onSubmit={handleSubmit} noValidate>
      <div className="booking-grid">
        <LocationSelect
          className="from-field"
          label={t.booking.from}
          value={from}
          onChange={(value) => {
            setFrom(value);
            resetFeedback({ clearHotel: true });
          }}
          icon={Plane}
          error={errors.from}
          t={t}
        />

        <button
          className="swap-button"
          type="button"
          onClick={swapLocations}
          aria-label={t.booking.swap}
        >
          <ArrowLeftRight size={20} aria-hidden="true" />
        </button>

        <LocationSelect
          className="to-field"
          label={t.booking.to}
          value={to}
          onChange={(value) => {
            setTo(value);
            resetFeedback({ clearHotel: true });
          }}
          icon={MapPin}
          error={errors.to}
          t={t}
          searchable
          hotelMatches={hotelRouteMatches}
          onHotelMatchSelect={(match) => {
            setTo(match.hotelName ?? match.route.destination);
            selectHotelMatch(match);
          }}
        />

        <div className="field trip-type-field">
          <span>{t.booking.tripType}</span>
          <TripTypeTabs
            tripType={tripType}
            t={t}
            onChange={(nextTripType) => {
              setTripType(nextTripType);
              resetFeedback();
            }}
          />
        </div>

        <DateInput
          className="departure-date-field"
          label={t.booking.departureDate}
          value={departureDate}
          min={today}
          placeholder={t.booking.datePlaceholder}
          error={errors.departureDate}
          onChange={(value) => {
            setDepartureDate(value);
            resetFeedback();
          }}
        />

        <TimeInput
          className="departure-time-field"
          label={t.booking.departureTime}
          value={departureTime}
          error={errors.departureTime}
          onChange={(value) => {
            setDepartureTime(value);
            resetFeedback();
          }}
        />

        {tripType === "round-trip" && (
          <>
            <DateInput
              className="return-date-field"
              label={t.booking.returnDate}
              value={returnDate}
              min={departureDate || today}
              placeholder={t.booking.datePlaceholder}
              error={errors.returnDate}
              onChange={(value) => {
                setReturnDate(value);
                resetFeedback();
              }}
            />
            <TimeInput
              className="return-time-field"
              label={t.booking.returnTime}
              value={returnTime}
              error={errors.returnTime}
              onChange={(value) => {
                setReturnTime(value);
                resetFeedback();
              }}
            />
          </>
        )}

        <PassengerSelector
          className="passenger-field"
          passengers={passengers}
          error={errors.passengers}
          t={t}
          onChange={(value) => {
            setPassengers(value);
            resetFeedback();
          }}
        />

        <button className="button button-primary search-button" type="submit" disabled={isSearching}>
          {isSearching ? (
            <Clock3 className="spin" size={18} aria-hidden="true" />
          ) : (
            <Search size={18} aria-hidden="true" />
          )}
          {isSearching ? t.booking.loading : t.booking.search}
        </button>
      </div>

      <div className="booking-note" aria-live="polite">
        <CreditCard size={18} aria-hidden="true" />
        <span>{bookingMessage}</span>
      </div>

      {searchResult && <RouteResultCard result={searchResult} t={t} locale={locale} />}
    </form>
  );
}

export default function Home() {
  const { locale, dictionary: t } = useI18n();

  return (
    <>
      <main>
        <section className="hero" id="home">
          <div className="hero-bg" />
          <div className="container hero-content">
            <div className="hero-copy">
              <h1>
                <span className="title-desktop">{t.hero.title}</span>
                <span className="title-mobile">
                  {t.hero.mobileTitle.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < t.hero.mobileTitle.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </h1>
              <p>{t.hero.text}</p>
            </div>
            <div className="hero-booking">
              <BookingWidget t={t} locale={locale} />
            </div>
            <div className="hero-trust" aria-label={t.a11y.transferHighlights}>
              <span>
                <ShieldCheck size={16} aria-hidden="true" />
                {t.hero.trust[0]}
              </span>
              <span>
                <CircleDollarSign size={16} aria-hidden="true" />
                {t.hero.trust[1]}
              </span>
              <span>
                <Clock3 size={16} aria-hidden="true" />
                {t.hero.trust[2]}
              </span>
            </div>
          </div>
        </section>

        <section className="section" id="popular-destinations">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">{t.routes.eyebrow}</span>
              <h2>{t.routes.title}</h2>
            </div>
            <div className="route-grid">
              {routePrices.map((route) => (
                <article className="route-card" key={`${route.from}-${route.to}`}>
                  <div>
                    <span className="route-label">{t.common.fixedPrice}</span>
                    <h3>
                      {getDestinationLabel(t, route.from)} <span>{t.common.to}</span> {getDestinationLabel(t, route.to)}
                    </h3>
                  </div>
                  <div className="route-meta">
                    <span>
                      <Clock3 size={16} aria-hidden="true" />
                      {t.durationLabel(route.duration)}
                    </span>
                    <span>
                      <Car size={16} aria-hidden="true" />
                      {t.common.vehicle}
                    </span>
                  </div>
                  <div className="route-footer">
                    <strong>{formatPrice(route.price, route.currency)}</strong>
                    <a href="#booking">{t.common.bookNow}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="why-band" id="hakkimizda">
          <div className="container">
            <div className="section-heading light">
              <span className="eyebrow">{t.why.eyebrow}</span>
              <h2>{t.why.title}</h2>
              <p>{t.why.text}</p>
            </div>
            <div className="why-grid">
              {t.why.cards.map((item, index) => {
                const Icon = whyChooseIcons[index];
                return (
                  <article className="why-item" key={`${locale}-${item.title}`}>
                    <div className="why-icon">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

