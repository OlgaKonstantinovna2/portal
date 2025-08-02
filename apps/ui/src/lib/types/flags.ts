export interface FlagOption {
  code: string;
  name: string;
  flag: string;
}

export interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
  flag?: string;
}

export interface LanguageFlagOption {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}
