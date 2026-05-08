import { BadgeCheck, CircleDollarSign, Handshake, Plane } from "lucide-react";

const badges = [
  { label: "Fixed Price", icon: CircleDollarSign },
  { label: "Flight Tracking", icon: Plane },
  { label: "Meet & Greet", icon: Handshake },
  { label: "Private Transfer", icon: BadgeCheck }
];

export function TrustBadges() {
  return (
    <div className="trust-badges" aria-label="Transfer highlights">
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <span key={badge.label}>
            <Icon size={16} aria-hidden="true" />
            {badge.label}
          </span>
        );
      })}
    </div>
  );
}
