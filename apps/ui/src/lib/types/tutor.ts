import type { LearningPurpose, LanguageLevel, LessonFormat } from './common';

export interface GeoLocation {
  country: string;
  city: string;
  latitude?: number;
  longitude?: number;
}

export interface Tutor {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  whatsapp?: string;
  telegram?: string;
  gender: 'male' | 'female';
  is_native_speaker?: boolean;
  subjects: string[];
  purposes: LearningPurpose[];
  level: LanguageLevel;
  lesson_mode: LessonFormat[];
  bio: string;
  registration_geo: GeoLocation;
  avatar_url?: string;
  audio_intro_url?: string;
  created_at: string;
  updated_at: string;
  rating?: number;
  reviews_count?: number;
  price_per_hour?: number;
}

export interface TutorRegistrationForm {
  email: string;
  first_name: string;
  last_name: string;
  whatsapp: string;
  telegram: string;
  gender: 'male' | 'female' | null;
  is_native_speaker: boolean | null;
  subjects: string[];
  level: LanguageLevel;
  bio: string;
  registration_geo: GeoLocation;
}

export interface TutorRegistrationResponse {
  device_id: string;
  message: string;
}

export interface TutorVerificationForm {
  code: string;
  device_id: string;
}
