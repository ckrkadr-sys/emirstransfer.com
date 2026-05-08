"use client";

import { useI18n } from "../lib/i18n/useI18n";
import { createWhatsAppLink } from "../lib/whatsapp";
import { WhatsAppBrandIcon } from "./WhatsAppBrandIcon";

export function MobileWhatsAppCta() {
  const { dictionary: t } = useI18n();

  return (
    <a
      className="mobile-sticky-whatsapp"
      href={createWhatsAppLink(t.common.whatsappInquiry)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.a11y.contactWhatsapp}
    >
      <WhatsAppBrandIcon />
      {t.common.contactWhatsapp}
    </a>
  );
}
