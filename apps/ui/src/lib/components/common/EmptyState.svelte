<script lang="ts">
  import Icon from './Icon.svelte';
  
  export let title = 'No results found';
  export let description = 'Try adjusting your search criteria';
  export let showSuggestions = false;
</script>

<div class="text-center py-12">
  <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
    <Icon name="magnifying-glass" size="w-8 h-8" color="text-primary-600 dark:text-primary-400" />
  </div>
  <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
    {title}
  </h3>
  <p class="text-surface-600 dark:text-surface-400 mb-4">
    {description}
  </p>
  
  {#if showSuggestions}
    <div class="text-sm text-surface-500 dark:text-surface-400 space-y-1">
      <p>Try:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Broadening your filter criteria</li>
        <li>Removing some filters</li>
        <li>Adjusting price range</li>
      </ul>
    </div>
  {/if}
</div> 