import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "../lib/transferPricing";

export function MobileWhatsAppCta() {
  return (
    <a className="mobile-sticky-whatsapp" href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
      <MessageCircle size={18} aria-hidden="true" />
      Book via WhatsApp
    </a>
  );
}
