# i18n Checklist

- Header language switcher must change all visible page content, not only navigation.
- New user-facing strings must be added to the existing translation dictionaries before use.
- Components must use the existing `useI18n` hook or the dictionary passed from it.
- Do not hard-code visible UI copy inside page or shared UI components.
- Test TR, EN, RU, and ZH before deployment because all four locales are enabled.
