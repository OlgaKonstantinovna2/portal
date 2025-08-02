<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { clickOutside } from '$lib/actions';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import * as m from '$paraglide/messages';
  import type { SearchFormData } from '$lib/types/search';
  import { 
    createSearchFormState, 
    initializeFromUrl, 
    resetForm, 
    handleSearch, 
    getActiveFilterTagsFromUrl,
    languageOptions,
    purposeOptions,
    levelOptions
  } from '$lib/utils/searchUtils';
  import { currencyStore, getPriceRangeForCurrency } from '$lib/stores/currency';
  import { TutorPreferencesSection, LanguageSection, LocationSection, PriceSection, SearchFormHeader } from './';
  import { Button } from '../common';

  const dispatch = createEventDispatcher<{
    search: SearchFormData;
    submit: SearchFormData;
  }>();

  let formState = createSearchFormState();
  let isExpanded = false;
  let formElement: HTMLElement;

  // Get active filter tags for header display
  $: activeFilterTags = getActiveFilterTagsFromUrl($page.url);

  // Update price range when currency changes
  $: {
    const newRange = getPriceRangeForCurrency($currencyStore);
    if (formState.currency !== $currencyStore) {
      formState.currency = $currencyStore;
      formState.priceRange = {
        min: newRange.min,
        max: newRange.max
      };
    }
  }

  // Block scroll when filters are expanded
  $: if (browser) {
    if (isExpanded) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }

  // Cleanup on component destroy
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    if (browser) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  });

  // Initialize form from URL parameters (reactive)
  function initializeFormFromUrl() {
    formState = initializeFromUrl($page.url, $page.data.lang);
  }

  // Initialize on mount and when URL changes
  $: {
    initializeFormFromUrl();
  }

  function handleReset() {
    const initialState = resetForm($page.data.lang, $page.url);
    // Update local form state to match the reset state
    formState = {
      sourceLanguage: initialState.source_language,
      targetLanguage: initialState.target_language,
      purpose: initialState.purpose,
      level: initialState.source_level,
      tutorLevel: initialState.tutor_level,
      format: initialState.lesson_mode,
      gender: initialState.tutor_gender,
      country: initialState.tutor_country,
      city: initialState.tutor_city,
      priceRange: initialState.lesson_price,
      currency: initialState.currency,
      distance: initialState.distance,
    };
    dispatch('search', initialState);
  }

  function handleSearchSubmit() {
    const searchParams = handleSearch(formState, $page.url);
    if (searchParams) {
      isExpanded = false;
      dispatch('search', searchParams);
    }
  }

  const styles = {
    container: 'sticky top-0 z-10 search-form relative',
    formWrapper: 'absolute inset-x-0 top-full z-40 bg-white/90 dark:bg-surface-800/90 backdrop-blur-md rounded-lg border-b border-surface-200/50 dark:border-surface-600/50 shadow-lg transition-all duration-200 transform',
    formContent: 'max-w-7xl mx-auto px-4 py-4',
    formSection: 'flex flex-col lg:flex-row gap-6 relative',
    divider: 'h-px lg:h-auto lg:w-px bg-surface-200 dark:bg-surface-600',
    button: {
      reset: 'text-sm text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200'
    }
  };
</script>

<div class={styles.container} bind:this={formElement} use:clickOutside={() => isExpanded = false}>
  <SearchFormHeader 
    {isExpanded} 
    onToggle={() => isExpanded = !isExpanded} 
    onSearch={handleSearchSubmit}
    onReset={handleReset}
    activeFilters={activeFilterTags}
  />

  <div
    class="{styles.formWrapper} {isExpanded ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'}"
    on:click|stopPropagation
  >
    <div class="max-h-[70vh] overflow-y-auto scrollbar-thin">
      <div class={styles.formContent}>
        <div class={styles.formSection}>
          {#if activeFilterTags.length > 0}
            <div class="absolute right-0">
              <button
                type="button"
                class={styles.button.reset}
                on:click={handleReset}
              >
                {m.resetAll()}
              </button>
            </div>
          {/if}
          
          <LanguageSection
            bind:sourceLanguage={formState.sourceLanguage}
            bind:targetLanguage={formState.targetLanguage}
            bind:purpose={formState.purpose}
            bind:level={formState.level}
            bind:format={formState.format}
            {languageOptions}
            {purposeOptions}
            {levelOptions}
          />

          <div class={styles.divider}></div>

          <div class="flex flex-col gap-y-6">
            <TutorPreferencesSection
              bind:gender={formState.gender}
              />
              <LocationSection
                bind:country={formState.country}
                bind:city={formState.city}
                bind:distance={formState.distance}
              />
          </div>

          <div class={styles.divider}></div>
          
          <PriceSection
            bind:priceRange={formState.priceRange}
            bind:currency={formState.currency}
          />
        </div>
        
        <div class="lg:absolute lg:bottom-4 lg:right-4 w-full lg:w-max mt-6 lg:mt-0">
          <Button on:click={handleSearchSubmit}>
            {m.search()}
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Scrollbar styles */
  :global(.scrollbar-thin) {
    scrollbar-width: thin;
    mask-image: linear-gradient(to bottom, transparent, black 0%, black 100%, transparent);
  }

  :global(.scrollbar-thin::-webkit-scrollbar) {
    width: 6px;
  }

  :global(.scrollbar-thin::-webkit-scrollbar-track) {
    background: transparent;
  }

  :global(.scrollbar-thin::-webkit-scrollbar-thumb) {
    background-color: rgb(var(--color-surface-300));
    border-radius: 3px;
  }

  :global(.dark .scrollbar-thin::-webkit-scrollbar-thumb) {
    background-color: rgb(var(--color-surface-600));
  }
</style> 