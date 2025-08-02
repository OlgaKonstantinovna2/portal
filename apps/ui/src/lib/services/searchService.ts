import type { Tutor } from '$lib/types/tutor';
import type { SearchFormData } from '$lib/types/search';
import type { LessonFormat } from '$lib/types/common';
import { DEFAULT_PRICE_MIN, DEFAULT_PRICE_MAX } from '$lib/constants/common';
import { parseUrlParams, hasActiveFilters } from '$lib/utils/searchUtils';

export class SearchService {
  // Filter tutors based on search parameters
  static filterTutors(tutors: Tutor[], searchParams: SearchFormData): Tutor[] {
    return tutors.filter(tutor => {
      // Filter by target language (what tutor teaches)
      if (searchParams.target_language && !tutor.subjects.includes(searchParams.target_language)) {
        return false;
      }

      // Filter by lesson mode (online/on-site)
      if (
        searchParams.lesson_mode &&
        !tutor.lesson_mode.includes(searchParams.lesson_mode as LessonFormat)
      ) {
        return false;
      }

      // Filter by tutor gender or type
      if (searchParams.tutor_gender) {
        if (searchParams.tutor_gender === 'native') {
          // Native Speaker - show only native speakers
          if (!tutor.is_native_speaker) {
            return false;
          }
        } else {
          // Female/Male - filter by gender
          if (tutor.gender !== searchParams.tutor_gender) {
            return false;
          }
        }
      }

      return true;
    });
  }

  // Initialize filtered tutors based on URL parameters
  static initializeFromUrl(tutors: Tutor[], url: URL): Tutor[] {
    const initialSearchParams = parseUrlParams(url);

    if (hasActiveFilters(initialSearchParams)) {
      return this.filterTutors(tutors, initialSearchParams);
    } else {
      return tutors;
    }
  }

  // Create SearchFormData from URL parameters (for backward compatibility)
  static createSearchParamsFromUrl(url: URL): SearchFormData {
    return parseUrlParams(url);
  }
}
