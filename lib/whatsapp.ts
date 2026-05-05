export const WHATSAPP_PHONE = "905000000000";

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
