"use client";

import Link from "next/link";
import { FormEvent, ReactNode, useId, useState } from "react";
import { ArrowLeft, CheckCircle2, CreditCard, Mail, Plane, UserRound } from "lucide-react";
import { WhatsAppBrandIcon } from "../../components/WhatsAppBrandIcon";
import { useI18n } from "../../lib/i18n/useI18n";
import { type Locale } from "../../lib/i18n/config";
import { type PageDictionary } from "../../lib/i18n/dictionaries";
import { createWhatsAppLink } from "../../lib/whatsapp";

export type BookingPageData = {
  from: string;
  to: string;
  date: string;
  time: string;
  returnDate: string;
  returnTime: string;
  passengers: number;
  tripType: "one-way" | "round-trip";
  currency: "GBP";
  totalPrice: number;
  reservationFee: number;
  remainingBalance: number;
  isPriced: boolean;
};

type ReservationFormState = {
  fullName: string;
  phone: string;
  email: string;
  flightNumber: string;
  pickupAddress: string;
  notes: string;
};

type ReservationFormErrors = Partial<Record<keyof Omit<ReservationFormState, "notes">, string>>;

type ReservationPayload = {
  booking: BookingPageData;
  customer: ReservationFormState;
  locale: Locale;
};

const initialFormState: ReservationFormState = {
  fullName: "",
  phone: "",
  email: "",
  flightNumber: "",
  pickupAddress: "",
  notes: ""
};

function getLocationLabel(t: PageDictionary, value: string) {
  return t.destinations[value as keyof PageDictionary["destinations"]] ?? value;
}

function formatDisplayDate(value: string, missingValue: string) {
  if (!value) {
    return missingValue;
  }

  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

function formatPrice(amount: number, currency: BookingPageData["currency"]) {
  if (currency === "GBP") {
    return `£${amount}`;
  }

  return `${currency} ${amount}`;
}

function getTripTypeLabel(t: PageDictionary, tripType: BookingPageData["tripType"]) {
  return tripType === "round-trip" ? t.booking.roundTrip : t.booking.oneWay;
}

function validateForm(form: ReservationFormState, t: PageDictionary) {
  const errors: ReservationFormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.fullName.trim()) {
    errors.fullName = t.bookPage.errors.fullNameRequired;
  }

  if (!form.phone.trim()) {
    errors.phone = t.bookPage.errors.phoneRequired;
  }

  if (!form.email.trim()) {
    errors.email = t.bookPage.errors.emailRequired;
  } else if (!emailPattern.test(form.email.trim())) {
    errors.email = t.bookPage.errors.emailInvalid;
  }

  if (!form.flightNumber.trim()) {
    errors.flightNumber = t.bookPage.errors.flightNumberRequired;
  }

  if (!form.pickupAddress.trim()) {
    errors.pickupAddress = t.bookPage.errors.pickupAddressRequired;
  }

  return errors;
}

function buildWhatsappMessage(payload: ReservationPayload, t: PageDictionary) {
  const { booking, customer } = payload;
  const noteValue = customer.notes.trim() || t.bookPage.whatsapp.notProvided;
  const lines = [
    t.bookPage.whatsapp.intro,
    "",
    t.bookPage.whatsapp.customerDetails,
    `${t.bookPage.form.fullName}: ${customer.fullName}`,
    `${t.bookPage.form.phone}: ${customer.phone}`,
    `${t.bookPage.form.email}: ${customer.email}`,
    `${t.bookPage.form.flightNumber}: ${customer.flightNumber}`,
    `${t.bookPage.form.pickupAddress}: ${customer.pickupAddress}`,
    `${t.bookPage.form.notes}: ${noteValue}`,
    "",
    t.bookPage.whatsapp.transferDetails,
    `${t.bookPage.route}: ${getLocationLabel(t, booking.from)} - ${getLocationLabel(t, booking.to)}`,
    `${t.bookPage.tripType}: ${getTripTypeLabel(t, booking.tripType)}`,
    `${t.bookPage.departure}: ${formatDisplayDate(booking.date, t.bookPage.missingValue)} - ${booking.time || t.bookPage.missingValue}`,
    booking.tripType === "round-trip"
      ? `${t.bookPage.return}: ${formatDisplayDate(booking.returnDate, t.bookPage.missingValue)} - ${
          booking.returnTime || t.bookPage.missingValue
        }`
      : "",
    `${t.bookPage.passengers}: ${t.booking.passengerLabel(booking.passengers)}`,
    `${t.bookPage.vehicle}: ${t.common.vehicle}`,
    "",
    t.bookPage.whatsapp.priceDetails,
    `${t.bookPage.totalPrice}: ${formatPrice(booking.totalPrice, booking.currency)}`,
    `${t.bookPage.reservationFee}: ${formatPrice(booking.reservationFee, booking.currency)}`,
    `${t.bookPage.remainingBalance}: ${formatPrice(booking.remainingBalance, booking.currency)}`,
    t.bookPage.balancePaymentNote
  ].filter(Boolean);

  return lines.join("\n");
}

async function submitReservationDraft(payload: ReservationPayload) {
  // Replace this with an email API or backend reservation API when persistence is added.
  return payload;
}

function FormField({
  label,
  error,
  optional,
  children
}: {
  label: string;
  error?: string;
  optional?: string;
  children: (inputProps: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
}) {
  const fieldId = useId();
  const errorId = `${fieldId}-error`;

  return (
    <label className="reservation-field" htmlFor={fieldId}>
      <span>
        {label}
        {optional && <small>{optional}</small>}
      </span>
      {children({ id: fieldId, describedBy: error ? errorId : undefined, invalid: Boolean(error) })}
      {error && (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      )}
    </label>
  );
}

function BookingSummary({ booking, t }: { booking: BookingPageData; t: PageDictionary }) {
  return (
    <article className="booking-summary-card">
      <h2>{t.bookPage.summaryTitle}</h2>
      <div className="booking-summary-list">
        <span>{t.bookPage.route}</span>
        <strong>
          {getLocationLabel(t, booking.from)} - {getLocationLabel(t, booking.to)}
        </strong>
        <span>{t.bookPage.tripType}</span>
        <strong>{getTripTypeLabel(t, booking.tripType)}</strong>
        <span>{t.bookPage.departure}</span>
        <strong>
          {formatDisplayDate(booking.date, t.bookPage.missingValue)} - {booking.time || t.bookPage.missingValue}
        </strong>
        {booking.tripType === "round-trip" && (
          <>
            <span>{t.bookPage.return}</span>
            <strong>
              {formatDisplayDate(booking.returnDate, t.bookPage.missingValue)} -{" "}
              {booking.returnTime || t.bookPage.missingValue}
            </strong>
          </>
        )}
        <span>{t.bookPage.passengers}</span>
        <strong>{t.booking.passengerLabel(booking.passengers)}</strong>
        <span>{t.bookPage.vehicle}</span>
        <strong>{t.common.vehicle}</strong>
      </div>

      {booking.isPriced ? (
        <>
          <div className="booking-summary-prices">
            <div>
              <span>{t.bookPage.totalPrice}</span>
              <strong>{formatPrice(booking.totalPrice, booking.currency)}</strong>
            </div>
            <div>
              <span>{t.bookPage.reservationFee}</span>
              <strong>{formatPrice(booking.reservationFee, booking.currency)}</strong>
            </div>
            <div>
              <span>{t.bookPage.remainingBalance}</span>
              <strong>{formatPrice(booking.remainingBalance, booking.currency)}</strong>
            </div>
          </div>
          <p className="booking-payment-note">
            <CreditCard size={17} aria-hidden="true" />
            {t.bookPage.balancePaymentNote}
          </p>
        </>
      ) : (
        <p className="booking-summary-warning">{t.bookPage.routeNotFound}</p>
      )}
    </article>
  );
}

export function BookingReservationFlow({ booking }: { booking: BookingPageData }) {
  const { locale, dictionary: t } = useI18n();
  const [form, setForm] = useState<ReservationFormState>(initialFormState);
  const [errors, setErrors] = useState<ReservationFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastMessage, setLastMessage] = useState("");

  function updateField(field: keyof ReservationFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function openWhatsapp(message: string) {
    window.open(createWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!booking.isPriced) {
      setErrors({ pickupAddress: t.bookPage.errors.routeUnavailable });
      return;
    }

    const nextErrors = validateForm(form, t);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload: ReservationPayload = {
      booking,
      customer: {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        flightNumber: form.flightNumber.trim(),
        pickupAddress: form.pickupAddress.trim(),
        notes: form.notes.trim()
      },
      locale
    };

    setIsSubmitting(true);
    const reservationDraft = await submitReservationDraft(payload);
    const whatsappMessage = buildWhatsappMessage(reservationDraft, t);
    setLastMessage(whatsappMessage);
    openWhatsapp(whatsappMessage);
    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  return (
    <main className="booking-page">
      <section className="booking-page-hero">
        <div className="container booking-page-layout booking-page-layout-form">
          <div className="booking-details-panel">
            <span className="eyebrow">{t.bookPage.eyebrow}</span>
            <h1>{t.bookPage.title}</h1>
            <p>{t.bookPage.description}</p>
            <Link className="button button-secondary booking-back-link" href="/">
              <ArrowLeft size={17} aria-hidden="true" />
              {t.bookPage.backHome}
            </Link>

            {isSubmitted ? (
              <section className="reservation-success-card" aria-live="polite">
                <div className="success-icon">
                  <CheckCircle2 size={26} aria-hidden="true" />
                </div>
                <span className="eyebrow">{t.bookPage.success.eyebrow}</span>
                <h2>{t.bookPage.success.title}</h2>
                <p>{t.bookPage.success.text}</p>
                <div className="reservation-actions">
                  <button className="button button-primary" type="button" onClick={() => openWhatsapp(lastMessage)}>
                    <WhatsAppBrandIcon />
                    {t.bookPage.success.sendAgain}
                  </button>
                  <Link className="button button-dark" href="/">
                    {t.bookPage.success.newReservation}
                  </Link>
                </div>
              </section>
            ) : (
              <form className="reservation-form-card" onSubmit={handleSubmit} noValidate>
                <div className="reservation-form-head">
                  <div>
                    <h2>{t.bookPage.form.title}</h2>
                    <p>{t.bookPage.form.description}</p>
                  </div>
                  <Plane size={24} aria-hidden="true" />
                </div>

                <div className="reservation-form-grid">
                  <FormField label={t.bookPage.form.fullName} error={errors.fullName}>
                    {({ id, describedBy, invalid }) => (
                      <input
                        id={id}
                        value={form.fullName}
                        placeholder={t.bookPage.form.fullNamePlaceholder}
                        aria-describedby={describedBy}
                        aria-invalid={invalid}
                        onChange={(event) => updateField("fullName", event.target.value)}
                      />
                    )}
                  </FormField>

                  <FormField label={t.bookPage.form.phone} error={errors.phone}>
                    {({ id, describedBy, invalid }) => (
                      <input
                        id={id}
                        value={form.phone}
                        placeholder={t.bookPage.form.phonePlaceholder}
                        aria-describedby={describedBy}
                        aria-invalid={invalid}
                        onChange={(event) => updateField("phone", event.target.value)}
                      />
                    )}
                  </FormField>

                  <FormField label={t.bookPage.form.email} error={errors.email}>
                    {({ id, describedBy, invalid }) => (
                      <input
                        id={id}
                        type="email"
                        value={form.email}
                        placeholder={t.bookPage.form.emailPlaceholder}
                        aria-describedby={describedBy}
                        aria-invalid={invalid}
                        onChange={(event) => updateField("email", event.target.value)}
                      />
                    )}
                  </FormField>

                  <FormField label={t.bookPage.form.flightNumber} error={errors.flightNumber}>
                    {({ id, describedBy, invalid }) => (
                      <input
                        id={id}
                        value={form.flightNumber}
                        placeholder={t.bookPage.form.flightNumberPlaceholder}
                        aria-describedby={describedBy}
                        aria-invalid={invalid}
                        onChange={(event) => updateField("flightNumber", event.target.value)}
                      />
                    )}
                  </FormField>

                  <FormField label={t.bookPage.form.pickupAddress} error={errors.pickupAddress}>
                    {({ id, describedBy, invalid }) => (
                      <input
                        id={id}
                        value={form.pickupAddress}
                        placeholder={t.bookPage.form.pickupAddressPlaceholder}
                        aria-describedby={describedBy}
                        aria-invalid={invalid}
                        onChange={(event) => updateField("pickupAddress", event.target.value)}
                      />
                    )}
                  </FormField>

                  <FormField label={t.bookPage.form.notes} optional={t.bookPage.form.optional}>
                    {({ id }) => (
                      <textarea
                        id={id}
                        value={form.notes}
                        placeholder={t.bookPage.form.notesPlaceholder}
                        rows={4}
                        onChange={(event) => updateField("notes", event.target.value)}
                      />
                    )}
                  </FormField>
                </div>

                <div className="reservation-form-footer">
                  <span>
                    <UserRound size={16} aria-hidden="true" />
                    {t.bookPage.form.requiredNote}
                  </span>
                  <button className="button button-primary" type="submit" disabled={isSubmitting || !booking.isPriced}>
                    {isSubmitting ? t.bookPage.form.openingWhatsapp : t.bookPage.form.submit}
                    <WhatsAppBrandIcon />
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="booking-side-panel">
            <BookingSummary booking={booking} t={t} />
            <div className="booking-contact-strip">
              <Mail size={17} aria-hidden="true" />
              <span>{t.bookPage.balancePaymentNote}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
