import type { Currency } from '$lib/types/currency';

export const CURRENCIES: Record<string, Currency> = {
  RUB: {
    code: 'RUB',
    symbol: '₽',
    name: 'Russian Ruble',
    ranges: {
      min: 0,
      max: 10000,
      step: 100,
    },
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    ranges: {
      min: 0,
      max: 100,
      step: 5,
    },
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    ranges: {
      min: 0,
      max: 100,
      step: 5,
    },
  },
};

export const DEFAULT_CURRENCY = 'USD';
