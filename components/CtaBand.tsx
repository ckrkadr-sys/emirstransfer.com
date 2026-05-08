import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "../lib/transferPricing";

type CtaBandProps = {
  title?: string;
  text?: string;
  buttonLabel?: string;
};

export function CtaBand({
  title = "Ready to book your private Dalaman Airport transfer?",
  text = "Send your hotel, flight number and passenger count. Emirs Transfer will confirm your fixed price quickly.",
  buttonLabel = "Get Instant Price on WhatsApp"
}: CtaBandProps) {
  return (
    <section className="cta-band">
      <div className="container cta-band-inner">
        <div>
          <span className="eyebrow">Private VIP Transfer</span>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <a className="button button-whatsapp button-large" href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={19} aria-hidden="true" />
          {buttonLabel}
        </a>
      </div>
    </section>
  );
}
