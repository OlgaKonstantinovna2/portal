import type { CurrencyCode } from './currency';
import type { Language, LanguageLevel, LearningPurpose, LessonFormat } from './common';

export interface SearchFormData {
  source_language: Language;
  target_language: Language;
  lesson_mode: LessonFormat | '';
  purpose: LearningPurpose;
  source_level: LanguageLevel;
  tutor_level: LanguageLevel;
  tutor_gender: string;
  tutor_country: string;
  tutor_city: string;
  lesson_price: {
    min: number;
    max: number;
  };
  currency: CurrencyCode;
  distance: number;
}
