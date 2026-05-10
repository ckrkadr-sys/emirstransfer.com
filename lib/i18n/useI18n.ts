"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultLocale, fallbackLocale, isLocale, type Locale } from "./config";
import { dictionaries, type PageDictionary } from "./dictionaries";

const storageKey = "emirstransfer-locale";
const legacyStorageKey = "emirstransfer-language";

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

export function useI18n() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(storageKey);
    const legacyLocale = normalizeLegacyLocale(window.localStorage.getItem(legacyStorageKey));

    if (isLocale(storedLocale)) {
      setLocaleState(storedLocale);
      return;
    }

    if (legacyLocale) {
      setLocaleState(legacyLocale);
      window.localStorage.setItem(storageKey, legacyLocale);
      return;
    }

    setLocaleState(defaultLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(nextLocale: Locale) {
    setLocaleState(nextLocale);
    window.localStorage.setItem(storageKey, nextLocale);
    window.localStorage.setItem(legacyStorageKey, nextLocale.toUpperCase());
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
