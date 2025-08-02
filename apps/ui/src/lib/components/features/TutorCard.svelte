<script lang="ts">
  import type { Tutor } from '$lib/types/tutor';
  import { getLanguageName } from '$lib/utils/utils';
  import { LEARNING_PURPOSES } from '$lib/constants/common';
  import { goto } from '$app/navigation';
  import { slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import { SearchService } from '$lib/services';
  import { Level, Icon, Button } from '../common';
  import { AudioPlayer } from './';

  export let tutor: Tutor;

  let isExpanded = false;
  let cardElement: HTMLElement;

  // Get URL parameters for conditional rendering
  $: urlParams = SearchService.createSearchParamsFromUrl($page.url);
  $: shouldShowLanguageTags = !urlParams.target_language;
  $: shouldShowPurposeTags = !urlParams.purpose;
  $: shouldShowLessonModeTags = !urlParams.lesson_mode;
  $: shouldShowGender = !urlParams.tutor_gender;

  function handleDetails() {
    goto(`/tutor/${tutor.id}`);
  }

  function toggleExpand() {
    isExpanded = !isExpanded;
  }
</script>

<div 
  bind:this={cardElement}
  class="w-full max-w-[25rem] bg-white dark:bg-surface-800 backdrop-blur rounded-2xl border border-surface-200 dark:border-surface-700 shadow-lg hover:shadow-primary-500/10 transition-all duration-300 {isExpanded ? 'card-expanded' : 'card-closed'}"
  on:click={toggleExpand}
>
  <div class="p-4 sm:p-5 lg:p-6 flex flex-row gap-3 sm:gap-4 lg:gap-5">
    <!-- Avatar and Rating Section -->
    <div class="flex flex-col items-center gap-2 min-w-[90px] sm:min-w-[100px] lg:min-w-[110px]">
      <div class="relative">
        <img
          src={tutor.avatar_url}
          alt={`${tutor.first_name} ${tutor.last_name}`}
          class="w-28 h-28 lg:w-32 lg:h-32 rounded-full object-cover shadow-md border-4 border-white dark:border-surface-800"
        />
        {#if shouldShowGender}
          <div class="absolute -bottom-0.5 lg:-bottom-1 -right-0.5 lg:-right-1 w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 border-white dark:border-surface-800 flex items-center justify-center {tutor.gender === 'female' ? 'bg-pink-200 dark:bg-pink-800' : 'bg-blue-200 dark:bg-blue-800'}">
            <Icon 
              name={tutor.gender === 'female' ? 'gender-female' : 'gender-male'} 
              size="w-3 h-3 lg:w-4 lg:h-4" 
              color={tutor.gender === 'female' ? 'text-pink-600 dark:text-pink-300' : 'text-blue-600 dark:text-blue-300'} 
            />
          </div>
        {/if}
      </div>
      <div class="flex flex-col items-center gap-1 mt-1">
        <div class="flex items-center gap-1 text-yellow-500 text-xs sm:text-sm lg:text-base">
          <Icon name="star" color="text-yellow-500" />
          <span>{tutor.rating ?? '—'}</span>
          <span class="text-xs text-surface-500 dark:text-surface-400">({tutor.reviews_count ?? 0} reviews)</span>
        </div>
        <div class="text-primary-700 dark:text-primary-300 text-xs sm:text-sm lg:text-base font-semibold text-center">
          {tutor.price_per_hour ? `from ${tutor.price_per_hour} ₽/hour` : 'Price not specified'}
        </div>
      </div>
    </div>

    <!-- Info Section -->
    <div class="flex-1 flex flex-col min-w-0 gap-2">
      <h3 class="text-lg sm:text-xl lg:text-2xl font-bold text-surface-900 dark:text-surface-50 mb-1 truncate">
        {tutor.first_name} {tutor.last_name}
      </h3>
      
      <!-- Language Tags -->
      {#if shouldShowLanguageTags}
        <div class="flex flex-wrap gap-1 sm:gap-1.5 mb-1">
          {#each tutor.subjects as subject}
            <span class="px-1.5 sm:px-2 py-0.5 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-xs font-medium border border-primary-200 dark:border-primary-800 truncate">
              {getLanguageName(subject)}
            </span>
          {/each}
        </div>
      {/if}
      
      <!-- Purpose Tags -->
      {#if shouldShowPurposeTags}
        <div class="flex flex-wrap gap-1 sm:gap-1.5 mb-1">
          {#each tutor.purposes as purpose}
            <span class="px-1.5 sm:px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium border border-green-200 dark:border-green-800 truncate">
              {LEARNING_PURPOSES[purpose] || purpose}
            </span>
          {/each}
        </div>
      {/if}
      
      <!-- Lesson Mode Tags -->
      {#if shouldShowLessonModeTags}
        <div class="flex flex-wrap gap-1 sm:gap-1.5 mb-1">
          {#each tutor.lesson_mode as mode}
            <span class="px-1.5 sm:px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium border border-purple-200 dark:border-purple-800 truncate">
              {mode === 'online' ? 'Online' : 'On-site'}
            </span>
          {/each}
        </div>
      {/if}
      
      <!-- Details Section -->
      <div class="flex flex-col flex-wrap items-start gap-2 text-surface-600 dark:text-surface-400 text-sm mb-2 min-w-0">
        <div class="flex items-center gap-1">
          <Icon name="chart-bar" size="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5" color="text-primary-500" />
          <Level level={tutor.level} showLabel={false} size="md" />
        </div>
        <div class="flex items-start gap-1 min-w-0 flex-1">
          <Icon name="location" size="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5" color="text-primary-500" />
          <span class="break-words text-xs sm:text-sm">{tutor.registration_geo.city}, {tutor.registration_geo.country}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Expanded Section -->
  {#if isExpanded}
    <div 
      class="px-4 pt-3 sm:px-5 sm:pt-4 lg:px-6 lg:pt-4 pb-4 sm:pb-5 lg:pb-6 border-t border-surface-200 dark:border-surface-700"
      transition:slide={{ duration: 200 }}
    >
      <!-- Audio Introduction -->
      {#if tutor.audio_intro_url}
        <div class="mb-4" on:click|stopPropagation>
          <AudioPlayer 
            audioUrl={tutor.audio_intro_url}
            title="Audio Introduction from {tutor.first_name}"
          />
        </div>
      {/if}

      <div class="prose dark:prose-invert max-w-none mb-4">
        <p class="text-surface-600 dark:text-surface-400 text-xs sm:text-sm">{tutor.bio}</p>
      </div>
      <Button stopPropagation={true} on:click={handleDetails}>
        View Full Profile
      </Button>
    </div>
  {/if}
</div> 

<style>
  .card-closed {
    max-height: 250px;
    min-height: 250px;
    overflow: hidden;
  }
  
  @media (min-width: 640px) {
    .card-closed {
      max-height: 260px;
      min-height: 260px;
    }
  }
  
  @media (min-width: 1024px) {
    .card-closed {
      max-height: 300px;
      min-height: 300px;
    }
  }
  
  .card-expanded {
    max-height: 800px;
  }
</style>