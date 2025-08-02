import type { Language, LanguageLevel, LearningPurpose, LessonFormat } from '$lib/types/common';

export const LANGUAGE_LEVELS: Record<LanguageLevel, string> = {
  beginner: 'Beginner',
  elementary: 'Elementary',
  intermediate: 'Intermediate',
  upper_intermediate: 'Upper Intermediate',
  advanced: 'Advanced',
};

export const LEARNING_PURPOSES: Record<LearningPurpose, string> = {
  immigration: 'Immigration',
  travel: 'Travel',
  work: 'Work & Business',
  university: 'University',
  school: 'School',
};

export const LESSON_FORMATS: Record<LessonFormat, string> = {
  online: 'Online',
  'on-site': 'On-Site',
};

// Default values for search parameters
export const DEFAULT_PRICE_MIN = 0;
export const DEFAULT_PRICE_MAX = 10000;
export const DEFAULT_LANGUAGE: Language = 'en';
export const DEFAULT_LESSON_MODE: LessonFormat = 'online';
export const DEFAULT_PURPOSE: LearningPurpose = 'travel';
export const DEFAULT_LEVEL: LanguageLevel = 'beginner';

// API constants
export const API_DELAY_MS = 500;
