"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultLocale, fallbackLocale, isLocale, type Locale } from "./config";
import { dictionaries, type PageDictionary } from "./dictionaries";

const storageKey = "emirstransfer-locale";
const legacyStorageKey = "emirstransfer-language";
const localeChangeEvent = "emirstransfer:locale-change";

type TranslationParams = Record<string, string | number>;

function readPath(source: unknown, key: string) {
  return key.split(".").reduce<unknown>((value, segment) => {
    if (value && typeof value === "object" && segment in value) {
      return (value as Record<string, unknown>)[segment];
    }

    return undefined;
  }, source);
}

function formatTemplate(value: string, params?: TranslationParams) {
  if (!params) {
    return value;
  }

  return value.replace(/\{(\w+)\}/g, (_, key: string) => String(params[key] ?? ""));
}

function normalizeLegacyLocale(value: string | null) {
  if (!value) {
    return null;
  }

  const normalized = value.toLowerCase();
  return isLocale(normalized) ? normalized : null;
}

function readStoredLocale() {
  const storedLocale = window.localStorage.getItem(storageKey);
  const legacyLocale = normalizeLegacyLocale(window.localStorage.getItem(legacyStorageKey));

  if (isLocale(storedLocale)) {
    return storedLocale;
  }

  if (legacyLocale) {
    window.localStorage.setItem(storageKey, legacyLocale);
    return legacyLocale;
  }

  return defaultLocale;
}

export function useI18n() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const syncLocale = () => {
      const nextLocale = readStoredLocale();
      setLocaleState(nextLocale);
      document.documentElement.lang = nextLocale;
    };

    syncLocale();
    window.addEventListener("storage", syncLocale);
    window.addEventListener(localeChangeEvent, syncLocale);

    return () => {
      window.removeEventListener("storage", syncLocale);
      window.removeEventListener(localeChangeEvent, syncLocale);
    };
  }, []);

  function setLocale(nextLocale: Locale) {
    setLocaleState(nextLocale);
    document.documentElement.lang = nextLocale;
    window.localStorage.setItem(storageKey, nextLocale);
    window.localStorage.setItem(legacyStorageKey, nextLocale.toUpperCase());
    window.dispatchEvent(new Event(localeChangeEvent));
  }

  const dictionary = (dictionaries[locale] ?? dictionaries[fallbackLocale]) as PageDictionary;

  const t = useMemo(() => {
    return (key: string, params?: TranslationParams) => {
      const localized = readPath(dictionary, key);
      const fallback = readPath(dictionaries[fallbackLocale], key);
      const value = typeof localized === "string" ? localized : typeof fallback === "string" ? fallback : key;

      return formatTemplate(value, params);
    };
  }, [dictionary]);

  return { locale, setLocale, dictionary, t };
}
