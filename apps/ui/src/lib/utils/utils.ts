import { LANGUAGE_FLAGS } from '$lib/constants/flags';

/**
 * Convert language code to display name
 */
export function getLanguageName(code: string): string {
  const language = LANGUAGE_FLAGS.find(lang => lang.code === code);
  return language ? language.name : code;
}

/**
 * Format tutor subjects for display
 */
export function formatTutorSubjects(subjects: string[]): string {
  return subjects.map(code => getLanguageName(code)).join(', ');
}
