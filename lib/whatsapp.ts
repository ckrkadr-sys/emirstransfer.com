import { buildWhatsAppUrl } from "./transferPricing";

export { WHATSAPP_PHONE, buildWhatsAppUrl } from "./transferPricing";

export function createWhatsAppLink(message: string) {
  return buildWhatsAppUrl({ message });
}
