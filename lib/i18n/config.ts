export const locales = ["tr", "en", "ru", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";
export const fallbackLocale: Locale = "en";

export const languageOptions: Array<{ code: Uppercase<Locale>; locale: Locale }> = [
  { code: "TR", locale: "tr" },
  { code: "EN", locale: "en" },
  { code: "RU", locale: "ru" },
  { code: "ZH", locale: "zh" }
];

export function isLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && (locales as readonly string[]).includes(value));
}
