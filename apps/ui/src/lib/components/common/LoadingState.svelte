<script lang="ts">
  
  export let type: 'spinner' | 'dots' | 'skeleton' = 'spinner';
  export let message = 'Loading...';
  export let size: 'sm' | 'md' | 'lg' = 'md';
</script>

<div class="text-center py-8">
  {#if type === 'spinner'}
    <div class="inline-block animate-spin rounded-full border-4 border-primary-500 border-t-transparent {size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-12 w-12' : 'h-8 w-8'}"></div>
    <p class="mt-2 text-surface-600 dark:text-surface-400">{message}</p>
  {:else if type === 'dots'}
    <div class="flex justify-center space-x-1">
      <div class="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
      <div class="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
      <div class="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
    </div>
    <p class="mt-2 text-surface-600 dark:text-surface-400">{message}</p>
  {:else if type === 'skeleton'}
    <div class="space-y-3">
      <div class="h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse"></div>
      <div class="h-4 bg-surface-200 dark:bg-surface-700 rounded w-3/4 mx-auto animate-pulse"></div>
      <div class="h-4 bg-surface-200 dark:bg-surface-700 rounded w-1/2 mx-auto animate-pulse"></div>
    </div>
  {/if}
</div> 