export type Language =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'it'
  | 'pt'
  | 'ru'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'ar'
  | 'hi'
  | 'bn'
  | 'tr'
  | 'nl'
  | 'pl'
  | 'sv'
  | 'da'
  | 'fi'
  | 'no';

export type LanguageLevel =
  | 'beginner'
  | 'elementary'
  | 'intermediate'
  | 'upper_intermediate'
  | 'advanced';

export type LearningPurpose = 'immigration' | 'travel' | 'work' | 'university' | 'school';
export type LessonFormat = 'online' | 'on-site';

export type IconName =
  | 'star'
  | 'location'
  | 'email'
  | 'whatsapp'
  | 'telegram'
  | 'chevron-down'
  | 'play'
  | 'pause'
  | 'gender-male'
  | 'gender-female'
  | 'edit'
  | 'user'
  | 'book'
  | 'information-circle'
  | 'target'
  | 'video-camera'
  | 'currency-dollar'
  | 'logout'
  | 'check'
  | 'arrow-left'
  | 'chart-bar'
  | 'spinner'
  | 'magnifying-glass';

export type ErrorType =
  | 'network'
  | 'server'
  | 'validation'
  | 'not_found'
  | 'unauthorized'
  | 'unknown';

export interface AppError {
  type: ErrorType;
  message: string;
  details?: string;
  retryable?: boolean;
}
