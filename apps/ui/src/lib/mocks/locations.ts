import { LANGUAGE_FLAGS } from '$lib/constants/flags';

const languageToCountry: Record<
  string,
  { code: string; name: string; cities: Array<{ code: string; name: string }> }
> = {
  en: {
    code: 'gb',
    name: 'United Kingdom',
    cities: [
      { code: 'ln', name: 'London' },
      { code: 'mn', name: 'Manchester' },
      { code: 'br', name: 'Birmingham' },
    ],
  },
  es: {
    code: 'es',
    name: 'Spain',
    cities: [
      { code: 'md', name: 'Madrid' },
      { code: 'br', name: 'Barcelona' },
      { code: 'vl', name: 'Valencia' },
    ],
  },
  fr: {
    code: 'fr',
    name: 'France',
    cities: [
      { code: 'ps', name: 'Paris' },
      { code: 'ly', name: 'Lyon' },
      { code: 'mr', name: 'Marseille' },
    ],
  },
  de: {
    code: 'de',
    name: 'Germany',
    cities: [
      { code: 'br', name: 'Berlin' },
      { code: 'mn', name: 'Munich' },
      { code: 'hb', name: 'Hamburg' },
    ],
  },
  it: {
    code: 'it',
    name: 'Italy',
    cities: [
      { code: 'rm', name: 'Rome' },
      { code: 'ml', name: 'Milan' },
      { code: 'nv', name: 'Naples' },
    ],
  },
  ru: {
    code: 'ru',
    name: 'Russia',
    cities: [
      { code: 'ms', name: 'Moscow' },
      { code: 'sp', name: 'Saint Petersburg' },
      { code: 'nv', name: 'Novosibirsk' },
    ],
  },
  zh: {
    code: 'cn',
    name: 'China',
    cities: [
      { code: 'bj', name: 'Beijing' },
      { code: 'sh', name: 'Shanghai' },
      { code: 'gz', name: 'Guangzhou' },
    ],
  },
  ja: {
    code: 'jp',
    name: 'Japan',
    cities: [
      { code: 'tk', name: 'Tokyo' },
      { code: 'yk', name: 'Yokohama' },
      { code: 'os', name: 'Osaka' },
    ],
  },
  ko: {
    code: 'kr',
    name: 'South Korea',
    cities: [
      { code: 'sl', name: 'Seoul' },
      { code: 'bs', name: 'Busan' },
      { code: 'dj', name: 'Daegu' },
    ],
  },
};

export const countryOptions = LANGUAGE_FLAGS.map(lang => languageToCountry[lang.code])
  .filter(Boolean)
  .map(country => ({
    value: country.code,
    label: country.name,
  }));

export const cityOptions = Object.fromEntries(
  Object.entries(languageToCountry).map(([_, country]) => [
    country.code,
    country.cities.map(city => ({
      value: city.code,
      label: city.name,
    })),
  ])
);
