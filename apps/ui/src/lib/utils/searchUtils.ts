import type { SearchFormData } from '$lib/types/search';
import type { Language, LanguageLevel, LearningPurpose, LessonFormat } from '$lib/types/common';
import type { CurrencyCode } from '$lib/types/currency';
import { LANGUAGE_FLAGS } from '$lib/constants/flags';
import { LEARNING_PURPOSES, LANGUAGE_LEVELS } from '$lib/constants/common';
import { CURRENCIES, DEFAULT_CURRENCY } from '$lib/constants/currencies';
import { URL_PARAMS } from '$lib/constants/urlParams';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';

// ===== TYPES =====

// Form state interface for component use
export interface SearchFormState {
  sourceLanguage: Language | '';
  targetLanguage: Language | '';
  purpose: LearningPurpose | '';
  level: LanguageLevel | '';
  tutorLevel: LanguageLevel | '';
  format: LessonFormat | '';
  gender: string;
  country: string;
  city: string;
  priceRange: { min: number; max: number };
  currency: CurrencyCode;
  distance: number;
}

// ===== VALIDATION =====

// Validate if a string is a valid language code
export function validateLanguage(code: string | null): code is Language {
  return code !== null && LANGUAGE_FLAGS.some(lang => lang.code === code);
}

// Validate if a string is a valid lesson format
export function validateLessonFormat(format: string | null): format is LessonFormat {
  return format === 'online' || format === 'on-site';
}

// Validate if a string is a valid learning purpose
export function validateLearningPurpose(purpose: string | null): purpose is LearningPurpose {
  return purpose !== null && Object.keys(LEARNING_PURPOSES).includes(purpose);
}

// Validate if a string is a valid language level
export function validateLanguageLevel(level: string | null): level is LanguageLevel {
  return level !== null && Object.keys(LANGUAGE_LEVELS).includes(level);
}

// Validate if a string is a valid currency code
export function validateCurrency(code: string | null): code is CurrencyCode {
  return code !== null && Object.keys(CURRENCIES).includes(code);
}

// ===== URL MANAGEMENT =====

// Parse URL parameters and return SearchFormData
export function parseUrlParams(url: URL): SearchFormData {
  const params = url.searchParams;

  const sourceLanguage = params.get(URL_PARAMS.SOURCE_LANGUAGE);
  const targetLanguage = params.get(URL_PARAMS.TARGET_LANGUAGE);
  const lessonMode = params.get(URL_PARAMS.LESSON_MODE);
  const purpose = params.get(URL_PARAMS.PURPOSE);
  const sourceLevel = params.get(URL_PARAMS.SOURCE_LEVEL);
  const tutorLevel = params.get(URL_PARAMS.TUTOR_LEVEL);
  const tutorGender = params.get(URL_PARAMS.TUTOR_GENDER);
  const tutorCountry = params.get(URL_PARAMS.TUTOR_COUNTRY);
  const tutorCity = params.get(URL_PARAMS.TUTOR_CITY);
  const lessonPriceMin = params.get(URL_PARAMS.LESSON_PRICE_MIN);
  const lessonPriceMax = params.get(URL_PARAMS.LESSON_PRICE_MAX);
  const currency = params.get(URL_PARAMS.CURRENCY);
  const distance = params.get(URL_PARAMS.DISTANCE);

  // Determine currency and price range
  const currentCurrency = validateCurrency(currency) ? currency : DEFAULT_CURRENCY;
  const currencyRanges = CURRENCIES[currentCurrency];

  const min = lessonPriceMin ? parseInt(lessonPriceMin) : currencyRanges.ranges.min;
  const max = lessonPriceMax ? parseInt(lessonPriceMax) : currencyRanges.ranges.max;
  const distanceValue = distance ? parseInt(distance) : 5;

  return {
    source_language: validateLanguage(sourceLanguage) ? sourceLanguage : ('' as Language),
    target_language: validateLanguage(targetLanguage) ? targetLanguage : ('' as Language),
    lesson_mode: validateLessonFormat(lessonMode) ? lessonMode : ('' as LessonFormat),
    purpose: validateLearningPurpose(purpose) ? purpose : ('' as LearningPurpose),
    source_level: validateLanguageLevel(sourceLevel) ? sourceLevel : ('' as LanguageLevel),
    tutor_level: validateLanguageLevel(tutorLevel) ? tutorLevel : ('' as LanguageLevel),
    tutor_gender: tutorGender || '',
    tutor_country: tutorCountry || '',
    tutor_city: tutorCity || '',
    lesson_price: {
      min: !isNaN(min) ? min : currencyRanges.ranges.min,
      max: !isNaN(max) ? max : currencyRanges.ranges.max,
    },
    currency: currentCurrency,
    distance: !isNaN(distanceValue) ? distanceValue : 5,
  };
}

// Update URL with search parameters
export function updateUrl(filters: SearchFormData, currentUrl: URL): void {
  const params = new URLSearchParams();

  if (filters.source_language) params.set(URL_PARAMS.SOURCE_LANGUAGE, filters.source_language);
  if (filters.target_language) params.set(URL_PARAMS.TARGET_LANGUAGE, filters.target_language);
  if (filters.lesson_mode) params.set(URL_PARAMS.LESSON_MODE, filters.lesson_mode);
  if (filters.purpose) params.set(URL_PARAMS.PURPOSE, filters.purpose);
  if (filters.source_level) params.set(URL_PARAMS.SOURCE_LEVEL, filters.source_level);
  if (filters.tutor_level) params.set(URL_PARAMS.TUTOR_LEVEL, filters.tutor_level);
  if (filters.tutor_gender) params.set(URL_PARAMS.TUTOR_GENDER, filters.tutor_gender);
  if (filters.tutor_country) params.set(URL_PARAMS.TUTOR_COUNTRY, filters.tutor_country);
  if (filters.tutor_city) params.set(URL_PARAMS.TUTOR_CITY, filters.tutor_city);
  if (filters.currency !== DEFAULT_CURRENCY) params.set(URL_PARAMS.CURRENCY, filters.currency);
  if (filters.distance !== 5) params.set(URL_PARAMS.DISTANCE, filters.distance.toString());

  const currencyRanges = CURRENCIES[filters.currency];
  if (filters.lesson_price.min > currencyRanges.ranges.min) {
    params.set(URL_PARAMS.LESSON_PRICE_MIN, filters.lesson_price.min.toString());
  }
  if (filters.lesson_price.max < currencyRanges.ranges.max) {
    params.set(URL_PARAMS.LESSON_PRICE_MAX, filters.lesson_price.max.toString());
  }

  const newUrl = `${currentUrl.pathname}?${params.toString()}`;

  // Only call goto() in browser environment
  if (browser) {
    goto(newUrl, { replaceState: true });
  }
}

// Check if there are any active filters
export function hasActiveFilters(filters: SearchFormData): boolean {
  // Don't consider lesson_mode as an active filter if no languages are selected
  const hasLanguageFilters = !!filters.target_language;

  return !!(
    hasLanguageFilters ||
    filters.purpose ||
    filters.source_level ||
    filters.tutor_level ||
    filters.tutor_gender ||
    filters.tutor_country ||
    filters.tutor_city
  );
}

// Validate form data
export function validateForm(filters: SearchFormData): boolean {
  // Only validate language selection if both languages are selected
  if (
    filters.source_language &&
    filters.target_language &&
    filters.source_language === filters.target_language
  ) {
    return false;
  }
  return true;
}

// Get initial form state
export function getInitialFormState(currentLanguage?: Language): SearchFormData {
  const currencyRanges = CURRENCIES[DEFAULT_CURRENCY];
  return {
    source_language: currentLanguage || ('' as Language),
    target_language: '' as Language,
    lesson_mode: '' as LessonFormat,
    purpose: '' as LearningPurpose,
    source_level: '' as LanguageLevel,
    tutor_level: '' as LanguageLevel,
    tutor_gender: '',
    tutor_country: '',
    tutor_city: '',
    lesson_price: {
      min: currencyRanges.ranges.min,
      max: currencyRanges.ranges.max,
    },
    currency: DEFAULT_CURRENCY,
    distance: 5,
  };
}

// Get active filter tags for display
export function getActiveFilterTags(filters: SearchFormData): Array<{
  text: string;
  type: 'language' | 'purpose' | 'level' | 'format' | 'gender' | 'native';
}> {
  const tags: Array<{
    text: string;
    type: 'language' | 'purpose' | 'level' | 'format' | 'gender' | 'native';
  }> = [];

  // Add target language
  if (filters.target_language) {
    const language = LANGUAGE_FLAGS.find(lang => lang.code === filters.target_language);
    if (language) {
      tags.push({ text: language.name, type: 'language' });
    }
  }

  // Add purpose
  if (filters.purpose) {
    const purpose = LEARNING_PURPOSES[filters.purpose];
    if (purpose) {
      tags.push({ text: purpose, type: 'purpose' });
    }
  }

  // Add lesson mode
  if (filters.lesson_mode) {
    const modeText = filters.lesson_mode === 'online' ? 'Online' : 'On-site';
    tags.push({ text: modeText, type: 'format' });
  }

  // Add tutor gender or type
  if (filters.tutor_gender) {
    if (filters.tutor_gender === 'native') {
      tags.push({ text: 'Native Speaker', type: 'native' });
    } else {
      const genderText = filters.tutor_gender === 'male' ? 'Male' : 'Female';
      tags.push({ text: genderText, type: 'gender' });
    }
  }

  // Add level
  if (filters.source_level) {
    const level = LANGUAGE_LEVELS[filters.source_level];
    if (level) {
      tags.push({ text: level, type: 'level' });
    }
  }

  return tags;
}

// ===== FORM STATE MANAGEMENT =====

// Create initial form state for component
export function createSearchFormState(): SearchFormState {
  return {
    sourceLanguage: '' as Language | '',
    targetLanguage: '' as Language | '',
    purpose: '' as LearningPurpose | '',
    level: '' as LanguageLevel | '',
    tutorLevel: '' as LanguageLevel | '',
    format: '' as LessonFormat | '',
    gender: '',
    country: '',
    city: '',
    priceRange: {
      min: CURRENCIES[DEFAULT_CURRENCY].ranges.min,
      max: CURRENCIES[DEFAULT_CURRENCY].ranges.max,
    },
    currency: DEFAULT_CURRENCY as CurrencyCode,
    distance: 5,
  };
}

// Initialize form from URL parameters
export function initializeFromUrl(url: URL, currentLanguage: Language): SearchFormState {
  const urlParams = parseUrlParams(url);

  return {
    sourceLanguage: urlParams.source_language || currentLanguage,
    targetLanguage: urlParams.target_language || '',
    purpose: urlParams.purpose || '',
    level: urlParams.source_level || '',
    tutorLevel: urlParams.tutor_level || '',
    format: urlParams.lesson_mode || '',
    gender: urlParams.tutor_gender || '',
    country: urlParams.tutor_country || '',
    city: urlParams.tutor_city || '',
    priceRange: urlParams.lesson_price,
    currency: urlParams.currency,
    distance: urlParams.distance,
  };
}

// Reset form to initial state
export function resetForm(currentLanguage: Language, currentUrl: URL): SearchFormData {
  const initialState = getInitialFormState(currentLanguage);

  // Clear URL and trigger search
  updateUrl(initialState, currentUrl);

  return initialState;
}

// Convert form state to SearchFormData
export function convertToSearchFormData(formState: SearchFormState): SearchFormData {
  return {
    source_language: formState.sourceLanguage || ('' as Language),
    target_language: formState.targetLanguage || ('' as Language),
    lesson_mode: formState.format || ('' as LessonFormat),
    purpose: formState.purpose || ('' as LearningPurpose),
    source_level: formState.level || ('' as LanguageLevel),
    tutor_level: formState.tutorLevel || ('' as LanguageLevel),
    tutor_gender: formState.gender || '',
    tutor_country: formState.country || '',
    tutor_city: formState.city || '',
    lesson_price: formState.priceRange,
    currency: formState.currency,
    distance: formState.distance,
  };
}

// Handle search with validation
export function handleSearch(formState: SearchFormState, currentUrl: URL): SearchFormData | null {
  const searchParams = convertToSearchFormData(formState);

  if (!validateForm(searchParams)) {
    return null;
  }

  // Update URL with search parameters
  updateUrl(searchParams, currentUrl);

  return searchParams;
}

// Get active filter tags from URL
export function getActiveFilterTagsFromUrl(url: URL) {
  return getActiveFilterTags(parseUrlParams(url));
}

// ===== SELECT OPTIONS =====

// Convert constants to select format
export const languageOptions = LANGUAGE_FLAGS.map(lang => ({ value: lang.code, label: lang.name }));
export const purposeOptions = Object.entries(LEARNING_PURPOSES).map(([value, label]) => ({
  value,
  label,
}));
export const levelOptions = Object.entries(LANGUAGE_LEVELS).map(([value, label]) => ({
  value,
  label,
}));
export const currencyOptions = Object.entries(CURRENCIES).map(([code, currency]) => ({
  value: code,
  label: `${currency.symbol} ${currency.name}`,
}));
