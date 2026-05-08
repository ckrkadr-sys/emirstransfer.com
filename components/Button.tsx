import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "dark" | "whatsapp" | "light";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
};

export function ButtonLink({ href, children, variant = "primary", className = "", external }: ButtonLinkProps) {
  const classes = `button button-${variant} ${className}`.trim();
  const isExternal = external ?? href.startsWith("http");

  if (isExternal) {
    return (
      <a className={classes} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
