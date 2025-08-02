<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { SearchButtonOption } from './SearchButtonOption';

  export let options: SearchButtonOption[] = [];
  export let value = '';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let variant: 'default' | 'outline' = 'default';
  export let disabled = false;

  const dispatch = createEventDispatcher<{
    change: { value: string };
  }>();

  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-1.5 text-sm',
    lg: 'px-6 py-2 text-base'
  };

  const styles = {
    button: {
      base: 'px-4 py-1.5 text-sm rounded-lg transition-colors duration-200',
      active: 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
      inactive: 'text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700/50'
    }
  };

  function handleClick(optionValue: string) {
    if (disabled) return;
    
    value = optionValue;
    dispatch('change', { value: optionValue });
  }
</script>

<div class="flex gap-2 flex-wrap">
  {#each options as option (option.value)}
    <button
      type="button"
      class="{styles.button.base} {value === option.value ? styles.button.active : styles.button.inactive}"
      disabled={disabled || option.disabled}
      on:click={() => handleClick(option.value)}
    >
      {option.label}
    </button>
  {/each}
</div> 