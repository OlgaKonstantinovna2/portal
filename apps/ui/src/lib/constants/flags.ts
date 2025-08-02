import type { LanguageFlagOption, CurrencyOption } from '$lib/types/flags';

// Main languages with flags
export const LANGUAGE_FLAGS: LanguageFlagOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: 'gb', // United Kingdom
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: 'es',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: 'fr',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: 'de',
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: 'it',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: 'pt',
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: 'ru',
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: 'cn',
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: 'jp',
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: 'kr',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: 'sa',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: 'in',
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: 'bd',
  },
  {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: 'tr',
  },
  {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    flag: 'nl',
  },
  {
    code: 'pl',
    name: 'Polish',
    nativeName: 'Polski',
    flag: 'pl',
  },
  {
    code: 'sv',
    name: 'Swedish',
    nativeName: 'Svenska',
    flag: 'se',
  },
  {
    code: 'da',
    name: 'Danish',
    nativeName: 'Dansk',
    flag: 'dk',
  },
  {
    code: 'fi',
    name: 'Finnish',
    nativeName: 'Suomi',
    flag: 'fi',
  },
  {
    code: 'no',
    name: 'Norwegian',
    nativeName: 'Norsk',
    flag: 'no',
  },
];

// Main currencies with symbols
export const CURRENCY_FLAGS: CurrencyOption[] = [
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: 'us',
  },
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    flag: 'eu',
  },
  {
    code: 'RUB',
    symbol: '₽',
    name: 'Russian Ruble',
    flag: 'ru',
  },
];
