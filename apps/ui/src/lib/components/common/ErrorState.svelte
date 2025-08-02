<script lang="ts">
  import Button from './Button.svelte';
  import type { AppError } from '$lib/types/common';
  
  export let error: AppError | string;
  export let onRetry: () => void;
  export let title: string | undefined = undefined;
  export let icon: string | undefined = undefined;
  
  $: errorMessage = typeof error === 'string' ? error : error.message;
  $: errorType = typeof error === 'string' ? 'unknown' : error.type;
  $: isRetryable = typeof error === 'string' ? true : error.retryable ?? true;
  $: errorTitle = title ?? getErrorTitle(errorType);
  $: errorIcon = icon ?? getErrorIcon(errorType);
  
  function getErrorTitle(type: string): string {
    switch (type) {
      case 'network': return 'Network Error';
      case 'server': return 'Server Error';
      case 'validation': return 'Validation Error';
      case 'not_found': return 'Not Found';
      case 'unauthorized': return 'Unauthorized';
      default: return 'Error';
    }
  }
  
  function getErrorIcon(type: string): string {
    switch (type) {
      case 'network': return '🌐';
      case 'server': return '🔧';
      case 'validation': return '⚠️';
      case 'not_found': return '🔍';
      case 'unauthorized': return '🔒';
      default: return '⚠️';
    }
  }
</script>

<div class="text-center py-12">
  <div class="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
    <span class="text-red-500 dark:text-red-300 text-2xl">{errorIcon}</span>
  </div>
  <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
    {errorTitle}
  </h3>
  <p class="text-surface-600 dark:text-surface-400 mb-4">
    {errorMessage}
  </p>
  {#if isRetryable}
    <Button 
      fullWidth={false}
      class_="mx-auto"
      on:click={onRetry}
    >
      Try Again
    </Button>
  {/if}
</div> 