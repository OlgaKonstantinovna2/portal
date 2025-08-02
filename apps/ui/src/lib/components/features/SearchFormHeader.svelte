<script lang="ts">
  import * as m from '$paraglide/messages';
  import { Icon } from '../common';
  
  export let isExpanded: boolean;
  export let onToggle: () => void;
  export let onSearch: () => void;
  export let onReset: () => void;
  export let activeFilters: Array<{ text: string; type: 'language' | 'purpose' | 'level' | 'format' | 'gender' | 'native' }> = [];

  $: displayText = activeFilters.length > 0 
    ? activeFilters.map(f => f.text).join(' • ') 
    : m.searchFilters();

  function getTagClasses(type: string) {
    switch (type) {
      case 'language':
        return 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 border-primary-200 dark:border-primary-800';
      case 'purpose':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800';
      case 'level':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-800';
      case 'format':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800';
      case 'gender':
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-800';
      case 'native':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 border-primary-200 dark:border-primary-800';
    }
  }
</script>

<button
  class="w-full px-4 py-2 bg-white/90 dark:bg-surface-800/90 rounded-lg backdrop-blur-md border border-surface-200/50 dark:border-surface-600/50 shadow-sm flex items-center justify-between hover:bg-white/80 dark:hover:bg-surface-800/80 transition-colors duration-200"
  on:click|stopPropagation={onToggle}
>
  <div class="flex-1 text-left flex items-center gap-2 flex-wrap">
    {#if activeFilters.length > 0}
      {#each activeFilters as filter}
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border {getTagClasses(filter.type)}">
          {filter.text}
        </span>
      {/each}
    {:else}
      <span 
        class="text-surface-700 dark:text-surface-300 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400"
        on:click|stopPropagation={onSearch}
      >
        {displayText}
      </span>
    {/if}
  </div>
  
  <div class="flex items-center gap-2">
    {#if activeFilters.length > 0 && !isExpanded}
      <button
        type="button"
        class="text-sm text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
        on:click|stopPropagation={onReset}
      >
        {m.resetAll()}
      </button>
    {/if}
    <Icon
      name="chevron-down"
      size="w-5 h-5"
      color="text-surface-500 dark:text-surface-400"
      class_="transition-transform duration-200 flex-shrink-0 {isExpanded ? 'rotate-180' : ''}"
    />
  </div>
</button> 