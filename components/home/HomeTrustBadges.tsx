"use client";

import { BadgeCheck, CircleDollarSign, Handshake, Plane } from "lucide-react";
import { useI18n } from "../../lib/i18n/useI18n";

const badgeIcons = [CircleDollarSign, Plane, Handshake, BadgeCheck];

export function HomeTrustBadges() {
  const { dictionary } = useI18n();

  return (
    <div className="home-trust-badges" aria-label={dictionary.a11y.transferHighlights}>
      {dictionary.site.home.trustBadges.map((label, index) => {
        const Icon = badgeIcons[index] ?? BadgeCheck;
        return (
          <span key={label}>
            <span className="home-trust-icon">
              <Icon size={15} aria-hidden="true" />
            </span>
            {label}
          </span>
        );
      })}
    </div>
  );
}
