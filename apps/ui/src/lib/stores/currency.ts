import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { CURRENCIES, DEFAULT_CURRENCY } from '$lib/constants/currencies';
import type { CurrencyCode } from '$lib/types/currency';

// Get initial currency from localStorage or default
const getInitialCurrency = (): CurrencyCode => {
  if (browser) {
    const stored = localStorage.getItem('preferred-currency');
    if (stored && stored in CURRENCIES) {
      return stored as CurrencyCode;
    }
  }
  return DEFAULT_CURRENCY;
};

// Create the store
export const currencyStore = writable<CurrencyCode>(getInitialCurrency());

// Subscribe to changes and save to localStorage
if (browser) {
  currencyStore.subscribe(currency => {
    localStorage.setItem('preferred-currency', currency);
  });
}

// Helper function to get price range for current currency
export function getPriceRangeForCurrency(currency: CurrencyCode) {
  return CURRENCIES[currency].ranges;
}

// Helper function to convert price between currencies (simplified)
export function convertPrice(
  price: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
): number {
  // This is a simplified conversion - in real app you'd use exchange rates
  if (fromCurrency === toCurrency) return price;

  // Simple conversion rates (for demo purposes)
  const rates: Record<string, number> = {
    USD: 1,
    EUR: 0.85,
    RUB: 75,
  };

  const usdPrice = price / rates[fromCurrency];
  return usdPrice * rates[toCurrency];
}
