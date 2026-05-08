"use client";

import { FormEvent, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { buildWhatsAppUrl } from "../lib/transferPricing";

const initialState = {
  name: "",
  date: "",
  flightNumber: "",
  hotel: "",
  passengers: ""
};

export function ContactBookingForm() {
  const [form, setForm] = useState(initialState);

  function updateField(field: keyof typeof initialState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "Hello Emirs Transfer,",
      "",
      "I would like to book a private VIP transfer from Dalaman Airport.",
      "",
      `Date: ${form.date}`,
      `Flight Number: ${form.flightNumber}`,
      `Hotel / Destination: ${form.hotel}`,
      `Passengers: ${form.passengers}`,
      `Name: ${form.name}`
    ].join("\n");

    window.open(buildWhatsAppUrl({ message }), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Your name" />
      </label>
      <label>
        <span>Arrival date</span>
        <input type="date" value={form.date} onChange={(event) => updateField("date", event.target.value)} />
      </label>
      <label>
        <span>Flight number</span>
        <input
          value={form.flightNumber}
          onChange={(event) => updateField("flightNumber", event.target.value)}
          placeholder="Example: XQ684"
        />
      </label>
      <label>
        <span>Hotel / Destination</span>
        <input
          value={form.hotel}
          onChange={(event) => updateField("hotel", event.target.value)}
          placeholder="Example: Liberty Lykia"
        />
      </label>
      <label>
        <span>Passengers</span>
        <input
          value={form.passengers}
          onChange={(event) => updateField("passengers", event.target.value)}
          placeholder="Example: 4"
        />
      </label>
      <button className="button button-whatsapp" type="submit">
        <MessageCircle size={18} aria-hidden="true" />
        Send on WhatsApp
        <Send size={16} aria-hidden="true" />
      </button>
    </form>
  );
}
