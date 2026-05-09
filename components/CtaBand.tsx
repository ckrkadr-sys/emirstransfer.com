"use client";

import { useI18n } from "../lib/i18n/useI18n";
import { buildWhatsAppUrl } from "../lib/transferPricing";
import { WhatsAppBrandIcon } from "./WhatsAppBrandIcon";

type CtaBandProps = {
  title?: string;
  text?: string;
  buttonLabel?: string;
};

export function CtaBand({ title, text, buttonLabel }: CtaBandProps) {
  const { dictionary } = useI18n();
  const copy = dictionary.site.cta;

  return (
    <section className="cta-band">
      <div className="container cta-band-inner">
        <div>
          <span className="eyebrow">{copy.eyebrow}</span>
          <h2>{title ?? copy.title}</h2>
          <p>{text ?? copy.text}</p>
        </div>
        <a className="button button-whatsapp button-large" href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
          <WhatsAppBrandIcon />
          {buttonLabel ?? copy.button}
        </a>
      </div>
    </section>
  );
}
