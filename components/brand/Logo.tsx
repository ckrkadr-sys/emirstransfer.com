type LogoProps = {
  href?: string;
  ariaLabel?: string;
  className?: string;
  variant?: "header" | "footer";
  brandName?: string;
  onClick?: () => void;
};

export function Logo({
  href = "#home",
  ariaLabel,
  className = "brand",
  variant = "header",
  brandName,
  onClick
}: LogoProps) {
  if (variant === "footer") {
    return (
      <a className={className} href={href} aria-label={ariaLabel} onClick={onClick}>
        <span className="brand-mark brand-mark-logo" aria-hidden="true">
          <img src="/images/emirs-travel-brand-mark.png" alt="" />
        </span>
        {brandName && <span>{brandName}</span>}
      </a>
    );
  }

  return (
    <a className={className} href={href} aria-label={ariaLabel} onClick={onClick}>
      <img className="brand-logo" src="/images/emirs-transfer-logo.png" alt="EMİRSTRANSFER.COM logosu" />
    </a>
  );
}
