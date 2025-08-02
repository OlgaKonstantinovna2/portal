<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Icon } from './index';
  import type { IconName } from '../../types/common';

  export let value: any = null;
  export let optionValue: any;
  export let label: string;
  export let icon: IconName | null = null;
  export let variant: 'primary' | 'surface' = 'primary';
  export let disabled = false;
  export let size: 'sm' | 'md' | 'lg' = 'md';

  const dispatch = createEventDispatcher<{
    change: { value: any };
  }>();

  const variants = {
    primary: {
      active: 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-800',
      inactive: 'text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700/50 border-primary-100 dark:border-primary-900/30'
    },
    surface: {
      active: 'bg-surface-500/10 text-surface-600 dark:text-surface-400 border-surface-200 dark:border-surface-700',
      inactive: 'text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700/50 border-surface-100 dark:border-surface-800/50'
    }
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm', // Like inputs
    lg: 'px-4 py-2.5 text-base'
  };

  // Support both single value and array
  $: isActive = Array.isArray(value) 
    ? value.includes(optionValue)
    : value === optionValue;
    
  $: buttonClass = `${sizes[size]} rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border ${isActive ? variants[variant].active : variants[variant].inactive} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

  function handleClick() {
    if (disabled) return;
    
    let newValue;
    
    if (Array.isArray(value)) {
      // Multiple selection
      if (isActive) {
        newValue = value.filter(v => v !== optionValue);
      } else {
        newValue = [...value, optionValue];
      }
    } else {
      // Single selection
      newValue = isActive ? null : optionValue;
    }
    
    dispatch('change', { value: newValue });
  }
</script>

<button
  type="button"
  class={buttonClass}
  on:click={handleClick}
  {disabled}
>
  {#if icon}
    <Icon name={icon} size="w-4 h-4" />
  {/if}
  {label}
</button> 