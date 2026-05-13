"use client";

import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  ArrowLeftRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  MapPin,
  MessageCircle,
  Minus,
  Plane,
  Plus,
  Search,
  Users
} from "lucide-react";
import {
  findHotelTransferRouteMatch,
  hotelTransferRoutes,
  normalizeHotelSearchValue,
  searchHotelTransferRoutes,
  type HotelTransferRoute,
  type HotelTransferRouteMatch
} from "../../lib/hotelTransferRoutes";
import { type Locale } from "../../lib/i18n/config";
import { type PageDictionary } from "../../lib/i18n/dictionaries";
import { calculateFixedRouteQuote, getPriceTierForPassengers } from "../../lib/pricing/pricing.service";
import { findFixedRoutePrice } from "../../lib/pricing/static-pricing.repository";
import { type Currency, type FixedRoutePrice, type TripType } from "../../lib/pricing/pricing.types";
import { getLocationById, listLocations } from "../../lib/routes/static-route.repository";
import { createWhatsAppLink } from "../../lib/whatsapp";

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

const MAX_PASSENGERS = 20;

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

export function PriceFinder({ t, locale }: { t: PageDictionary; locale: Locale }) {
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

        <button className="swap-button" type="button" onClick={swapLocations} aria-label={t.booking.swap}>
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
          {isSearching ? <Clock3 className="spin" size={18} aria-hidden="true" /> : <Search size={18} aria-hidden="true" />}
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
