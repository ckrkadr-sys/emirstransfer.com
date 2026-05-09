"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { useI18n } from "../lib/i18n/useI18n";
import { buildWhatsAppUrl } from "../lib/transferPricing";
import { WhatsAppBrandIcon } from "./WhatsAppBrandIcon";

const initialState = {
  name: "",
  date: "",
  flightNumber: "",
  hotel: "",
  passengers: ""
};

export function ContactBookingForm() {
  const { dictionary } = useI18n();
  const copy = dictionary.site.contactPage.form;
  const [form, setForm] = useState(initialState);

  function updateField(field: keyof typeof initialState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      copy.messageIntro,
      "",
      copy.messageRequest,
      "",
      `${copy.date}: ${form.date}`,
      `${copy.flightNumber}: ${form.flightNumber}`,
      `${copy.hotel}: ${form.hotel}`,
      `${copy.passengers}: ${form.passengers}`,
      `${copy.name}: ${form.name}`
    ].join("\n");

    window.open(buildWhatsAppUrl({ message }), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>{copy.name}</span>
        <input value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder={copy.namePlaceholder} />
      </label>
      <label>
        <span>{copy.date}</span>
        <input type="date" value={form.date} onChange={(event) => updateField("date", event.target.value)} />
      </label>
      <label>
        <span>{copy.flightNumber}</span>
        <input
          value={form.flightNumber}
          onChange={(event) => updateField("flightNumber", event.target.value)}
          placeholder={copy.flightNumberPlaceholder}
        />
      </label>
      <label>
        <span>{copy.hotel}</span>
        <input value={form.hotel} onChange={(event) => updateField("hotel", event.target.value)} placeholder={copy.hotelPlaceholder} />
      </label>
      <label>
        <span>{copy.passengers}</span>
        <input
          value={form.passengers}
          onChange={(event) => updateField("passengers", event.target.value)}
          placeholder={copy.passengersPlaceholder}
        />
      </label>
      <button className="button button-whatsapp" type="submit">
        <WhatsAppBrandIcon />
        {copy.submit}
        <Send size={16} aria-hidden="true" />
      </button>
    </form>
  );
}
