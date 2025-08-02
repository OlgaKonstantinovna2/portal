export interface CurrencyRanges {
  min: number;
  max: number;
  step: number;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  ranges: CurrencyRanges;
}

export type CurrencyCode = 'RUB' | 'USD' | 'EUR';
