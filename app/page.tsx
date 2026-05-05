"use client";

import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  ArrowLeftRight,
  BadgeCheck,
  CalendarCheck,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Globe2,
  Mail,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Plane,
  Plus,
  Route,
  Sailboat,
  Search,
  ShieldCheck,
  Star,
  UserRound,
  Users,
  X
} from "lucide-react";
import { languageOptions, type Locale } from "../lib/i18n/config";
import { type PageDictionary } from "../lib/i18n/dictionaries";
import { useI18n } from "../lib/i18n/useI18n";

type RoutePrice = {
  from: string;
  to: string;
  duration: string;
  price: number;
  currency: "GBP";
};

type IconType = typeof Plane;
type TripType = "one-way" | "round-trip";
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
  route?: RoutePrice;
  totalPrice?: number;
  reservationFee?: number;
  remainingBalance?: number;
};

const destinations = [
  "Dalaman Airport",
  "Fethiye",
  "Calis",
  "Oludeniz",
  "Hisaronu",
  "Ovacik",
  "Gocek",
  "Kalkan",
  "Kas"
];

const routePrices: RoutePrice[] = [
  { from: "Dalaman Airport", to: "Fethiye", duration: "45 min", price: 40, currency: "GBP" },
  { from: "Dalaman Airport", to: "Calis", duration: "45 min", price: 40, currency: "GBP" },
  { from: "Dalaman Airport", to: "Oludeniz", duration: "60 min", price: 50, currency: "GBP" },
  { from: "Dalaman Airport", to: "Gocek", duration: "30 min", price: 35, currency: "GBP" },
  { from: "Dalaman Airport", to: "Kalkan", duration: "90 min", price: 75, currency: "GBP" },
  { from: "Dalaman Airport", to: "Kas", duration: "120 min", price: 90, currency: "GBP" }
];

const experienceCardIcons: IconType[] = [Car, BadgeCheck, Clock3, CircleDollarSign, Route, CalendarCheck];

const otherServiceCards: Array<{ key: "minibusTour" | "boatRental"; image: string; icon: IconType }> = [
  { key: "minibusTour", image: "/images/minibus-city-tour-sprinter.png", icon: Map },
  { key: "boatRental", image: "/images/private-tour-boat.png", icon: Sailboat }
];

const fleetVehicleImages = [
  "https://images.pexels.com/photos/17455633/pexels-photo-17455633.jpeg?auto=compress&cs=tinysrgb&w=1500",
  "/images/mercedes-benz-sprinter-fleet.png"
];

const whyChooseIcons: IconType[] = [CircleDollarSign, Clock3, Plane, Car, CheckCircle2, CreditCard];

const stepIcons: IconType[] = [Route, CreditCard, BadgeCheck, CircleDollarSign];

function getDestinationLabel(t: PageDictionary, destination: string) {
  return t.destinations[destination as keyof PageDictionary["destinations"]] ?? destination;
}

function findFixedRoute(from: string, to: string) {
  return routePrices.find(
    (route) => (route.from === from && route.to === to) || (route.from === to && route.to === from)
  );
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

function formatPrice(amount: number, currency: RoutePrice["currency"] = "GBP") {
  if (currency === "GBP") {
    return `£${amount}`;
  }

  return `${currency} ${amount}`;
}

function getBookingUrl(result: RouteSearchResult, locale: Locale) {
  const params = new URLSearchParams({
    from: result.from,
    to: result.to,
    date: result.departureDate,
    time: result.departureTime,
    passengers: String(result.passengers),
    tripType: result.tripType,
    locale
  });

  if (result.route && result.totalPrice !== undefined && result.reservationFee !== undefined && result.remainingBalance !== undefined) {
    params.set("currency", result.route.currency);
    params.set("price", String(result.route.price));
    params.set("totalPrice", String(result.totalPrice));
    params.set("reservationFee", String(result.reservationFee));
    params.set("remainingBalance", String(result.remainingBalance));
  }

  if (result.tripType === "round-trip") {
    params.set("returnDate", result.returnDate);
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

  return `https://wa.me/905000000000?text=${encodeURIComponent(lines.join("\n"))}`;
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
          <span className="brand-mark">{t.brand.mark}</span>
          <span>{t.brand.name}</span>
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
            <a className="whatsapp-link" href="#contact" aria-label={t.a11y.contactWhatsapp}>
              <MessageCircle size={16} aria-hidden="true" />
              {t.common.whatsapp}
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
            <a className="button button-outline-dark" href="#contact" onClick={() => setIsMenuOpen(false)}>
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
  t
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: IconType;
  error?: string;
  t: PageDictionary;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const errorId = useId();

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
    <div className="field field-location location-select" ref={wrapperRef}>
      <span id={labelId}>{label}</span>
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
      {isOpen && (
        <div className="location-menu" role="listbox" aria-labelledby={labelId}>
          {destinations.map((destination) => (
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
  error
}: {
  label: string;
  value: string;
  min: string;
  placeholder: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const errorId = useId();

  return (
    <label className="field">
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
  error
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const errorId = useId();

  return (
    <label className="field">
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
  t
}: {
  passengers: number;
  onChange: (passengers: number) => void;
  error?: string;
  t: PageDictionary;
}) {
  const errorId = useId();

  return (
    <div className="field">
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
          disabled={passengers >= 8}
          onClick={() => onChange(Math.min(8, passengers + 1))}
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
            <a className="button button-outline-dark" href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={17} aria-hidden="true" />
              {t.common.contactWhatsapp}
            </a>
          </div>
        </>
      )}

      {!isAvailable && (
        <div className="result-actions">
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
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
  const [from, setFrom] = useState("Dalaman Airport");
  const [to, setTo] = useState("Calis");
  const [departureDate, setDepartureDate] = useState(() => getDateWithOffset(1));
  const [departureTime, setDepartureTime] = useState("14:30");
  const [returnDate, setReturnDate] = useState(() => getDateWithOffset(8));
  const [returnTime, setReturnTime] = useState("14:30");
  const [passengers, setPassengers] = useState(2);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [searchResult, setSearchResult] = useState<RouteSearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const selectedRoute = useMemo(() => findFixedRoute(from, to), [from, to]);

  function resetFeedback() {
    setErrors({});
    setSearchResult(null);
  }

  function swapLocations() {
    setFrom(to);
    setTo(from);
    resetFeedback();
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

    if (!Number.isFinite(passengers) || passengers < 1 || passengers > 8) {
      nextErrors.passengers = t.booking.errors.passengersRequired;
    }

    return nextErrors;
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

    const route = findFixedRoute(from, to);
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
      setSearchResult({ ...baseResult, status: "unavailable" });
      setIsSearching(false);
      return;
    }

    const totalPrice = route.price * (tripType === "round-trip" ? 2 : 1);
    const reservationFee = Number((totalPrice * 0.1).toFixed(2));
    const remainingBalance = Number((totalPrice - reservationFee).toFixed(2));

    setSearchResult({
      ...baseResult,
      status: "available",
      route,
      totalPrice,
      reservationFee,
      remainingBalance
    });
    setIsSearching(false);
  }

  const bookingMessage =
    selectedRoute && from !== to
      ? t.booking.fixedPreview(
          selectedRoute.price,
          getDestinationLabel(t, selectedRoute.from),
          getDestinationLabel(t, selectedRoute.to)
        )
      : t.booking.paymentNote;

  return (
    <form className="booking-widget" id="booking" onSubmit={handleSubmit} noValidate>
      <div className="booking-topline">
        <TripTypeTabs
          tripType={tripType}
          t={t}
          onChange={(nextTripType) => {
            setTripType(nextTripType);
            resetFeedback();
          }}
        />
      </div>

      <div className="booking-grid">
        <LocationSelect
          label={t.booking.from}
          value={from}
          onChange={(value) => {
            setFrom(value);
            resetFeedback();
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
          label={t.booking.to}
          value={to}
          onChange={(value) => {
            setTo(value);
            resetFeedback();
          }}
          icon={MapPin}
          error={errors.to}
          t={t}
        />

        <DateInput
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
  const { locale, setLocale, dictionary: t } = useI18n();

  return (
    <>
      <Header selectedLocale={locale} onLocaleSelect={setLocale} t={t} />
      <main>
        <section className="hero" id="home">
          <div className="hero-bg" />
          <div className="container hero-content">
            <div className="hero-booking">
              <BookingWidget t={t} locale={locale} />
            </div>
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
              <div className="hero-actions">
                <a className="button button-primary" href="#booking">
                  {t.hero.primaryCta}
                </a>
                <a className="button button-secondary" href="#popular-destinations">
                  {t.hero.secondaryCta}
                </a>
                <a className="button button-ghost" href="#contact">
                  <MessageCircle size={17} aria-hidden="true" />
                  {t.common.contactWhatsapp}
                </a>
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
          </div>
        </section>

        <section className="section" id="popular-destinations">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">{t.routes.eyebrow}</span>
              <h2>{t.routes.title}</h2>
              <p>{t.routes.text}</p>
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

        <section className="section section-soft" id="vip-transfer">
          <div className="container">
            <div className="section-heading section-heading-left">
              <span className="eyebrow">{t.vip.eyebrow}</span>
              <h2>{t.vip.title}</h2>
              <p>{t.vip.text}</p>
            </div>
            <div className="experience-grid">
              {t.experienceCards.map((card, index) => {
                const Icon = experienceCardIcons[index];
                const key = `${locale}-${card.title}`;
                return (
                  <article className="feature-card" key={key}>
                    <div className="icon-badge">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="other-services">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">{t.otherServices.eyebrow}</span>
              <h2>{t.otherServices.title}</h2>
              <p>{t.otherServices.text}</p>
            </div>
            <div className="services-grid">
              {otherServiceCards.map((serviceMeta) => {
                const service = t.otherServices[serviceMeta.key];
                const Icon = serviceMeta.icon;
                return (
                  <article className="service-card" key={`${locale}-${service.title}`}>
                    <div className="service-image">
                      <img src={serviceMeta.image} alt={service.title} />
                    </div>
                    <div className="service-content">
                      <span className="service-badge">
                        <Icon size={15} aria-hidden="true" />
                        {service.subtitle}
                      </span>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <a href="#booking">{service.cta}</a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section fleet-section" id="fleet">
          <div className="container fleet-layout">
            <div className="fleet-vehicle-grid">
              {t.fleet.vehicles.map((vehicle, index) => (
                <article className="fleet-vehicle-card" key={`${locale}-${vehicle.name}`}>
                  <div className="fleet-vehicle-image">
                    <img src={fleetVehicleImages[index]} alt={vehicle.imageAlt} />
                  </div>
                  <div className="fleet-vehicle-content">
                    <span>{vehicle.role}</span>
                    <h3>{vehicle.name}</h3>
                    <p>{vehicle.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="fleet-copy">
              <span className="eyebrow">{t.fleet.eyebrow}</span>
              <h2>{t.fleet.title}</h2>
              <p>{t.fleet.text}</p>
              <ul className="fleet-list">
                {t.fleet.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a className="button button-primary" href="#booking">
                {t.fleet.cta}
              </a>
            </div>
          </div>
        </section>

        <section className="why-band" id="about">
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

        <section className="section section-soft" id="how-reservation-works">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">{t.reservation.eyebrow}</span>
              <h2>{t.reservation.title}</h2>
              <p>{t.reservation.text}</p>
            </div>
            <div className="steps-grid">
              {t.reservation.steps.map((step, index) => {
                const Icon = stepIcons[index];
                return (
                  <article className="step-card" key={`${locale}-${step.title}`}>
                    <span className="step-number">{index + 1}</span>
                    <Icon size={24} aria-hidden="true" />
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="testimonials">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">{t.testimonials.eyebrow}</span>
              <h2>{t.testimonials.title}</h2>
              <p>{t.testimonials.text}</p>
            </div>
            <div className="testimonial-grid">
              {t.testimonials.items.map((testimonial) => (
                <article className="testimonial-card" key={`${locale}-${testimonial.name}`}>
                  <div className="stars" aria-label={t.a11y.fiveStarRating}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} size={16} fill="currentColor" aria-hidden="true" />
                    ))}
                  </div>
                  <p>“{testimonial.quote}”</p>
                  <div className="guest">
                    <span>{testimonial.name.slice(0, 1)}</span>
                    <div>
                      <strong>{testimonial.name}</strong>
                      <small>{testimonial.country}</small>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div className="faq-intro">
              <span className="eyebrow">{t.faq.eyebrow}</span>
              <h2>{t.faq.title}</h2>
              <p>{t.faq.text}</p>
            </div>
            <div className="faq-list">
              {t.faq.items.map((faq) => (
                <details key={`${locale}-${faq.question}`}>
                  <summary>
                    {faq.question}
                    <ChevronDown size={18} aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-banner">
          <div className="container cta-content">
            <div>
              <span className="eyebrow">{t.cta.eyebrow}</span>
              <h2>{t.cta.title}</h2>
              <p>{t.cta.text}</p>
            </div>
            <div className="cta-actions">
              <a className="button button-light" href="#booking">
                {t.common.bookNow}
              </a>
              <a className="button button-cta-outline" href="#contact">
                <MessageCircle size={17} aria-hidden="true" />
                {t.common.contactWhatsapp}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#home">
              <span className="brand-mark">{t.brand.mark}</span>
              <span>{t.brand.name}</span>
            </a>
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
              <a href={index === t.footer.serviceLinks.length - 1 ? "#other-services" : "#booking"} key={serviceLink}>
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
            <a href="#contact">
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
    </>
  );
}

