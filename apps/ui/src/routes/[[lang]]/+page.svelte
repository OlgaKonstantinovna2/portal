<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import type { Tutor } from '$lib/types/tutor';
  import type { SearchFormData } from '$lib/types/search';
  import type { AppError } from '$lib/types/common';
  import { mockTutors } from '$lib/mocks/tutors';
  import { TutorCard, SearchForm } from '$lib/components/features';
  import { ErrorState, EmptyState, LoadingState } from '$lib/components/common';
  import * as m from '$paraglide/messages';
  import { SearchService } from '$lib/services';
  import { API_DELAY_MS } from '$lib/constants/common';

  let tutors: Tutor[] = [];
  let filteredTutors: Tutor[] = [];
  let isLoading = false;
  let error: AppError | string | null = null;
  let isInitial = true;

  onMount(() => {
    isLoading = true;
    
    // Simulate initial loading
    setTimeout(() => {
      tutors = mockTutors;
      // Initialize filtered tutors based on URL parameters
      filteredTutors = SearchService.initializeFromUrl(tutors, $page.url);
      isInitial = false;
      isLoading = false;
      
      // Temporary: Test error state
      // error = 'An error occurred while filtering. Please try again.';
      // error = {
      //   type: 'network',
      //   message: 'No internet connection. Please check your network and try again.',
      //   retryable: true
      // };
    }, 500); // 0.5 second loading
  });

  function handleSearch(event: CustomEvent<SearchFormData>) {
    const searchParams = event.detail;
    isLoading = true;
    error = null;
    
    // Simulate API delay
    setTimeout(() => {
      try {
        filteredTutors = SearchService.filterTutors(tutors, searchParams);
        isLoading = false;
      } catch (err) {
        error = 'An error occurred while filtering. Please try again.';
        isLoading = false;
        console.error('Filter error:', err);
      }
    }, API_DELAY_MS);
  }
</script>

<main class="min-h-screen">
  <SearchForm on:search={handleSearch} />
  
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Results Section -->
    <div class="mx-auto max-w-7xl">
      {#if isLoading}
        <LoadingState 
          type="spinner"
          message={m.loading()}
          size="md"
        />
        {:else if error}
          <ErrorState 
            {error}
            onRetry={() => error = null}
          />
      {:else if !isInitial && filteredTutors.length === 0}
        <EmptyState 
          title={m.noResults()}
          description="Try adjusting your filters to find more tutors"
          showSuggestions={true}
        />
      {:else if !isInitial && filteredTutors.length > 0}
        <div
         class="grid gap-4 lg:gap-6 xl:gap-10 w-full justify-center transition-all duration-300" 
         style="grid-template-columns: repeat(auto-fit, minmax(260px, 360px));">
          {#each filteredTutors as tutor (tutor.id)}
            <TutorCard {tutor} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
</main>

<style>
  /* Line clamp for bio */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style> 