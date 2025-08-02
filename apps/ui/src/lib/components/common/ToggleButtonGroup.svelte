<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ToggleButton from './ToggleButton.svelte';
  import type { IconName } from '../../types/common';

  export let value: any = null;
  export let options: Array<{
    value: any;
    label: string;
    icon?: IconName;
    variant?: 'primary' | 'surface';
  }>;
  export let label: string = '';
  export let error: string = '';
  export let disabled = false;
  export let size: 'sm' | 'md' | 'lg' = 'md';

  const dispatch = createEventDispatcher<{
    change: { value: any };
  }>();

  function handleChange(event: CustomEvent<{ value: any }>) {
    value = event.detail.value;
    dispatch('change', { value });
  }
</script>

<div>
  {#if label}
    <label class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
      {label}
    </label>
  {/if}
  
  <div class="flex gap-2 flex-wrap">
    {#each options as option}
      <ToggleButton
        value={value}
        optionValue={option.value}
        label={option.label}
        icon={option.icon}
        variant="primary"
        disabled={disabled}
        size={size}
        on:change={handleChange}
      />
    {/each}
  </div>
  
  {#if error}
    <div class="text-red-600 dark:text-red-400 text-sm mt-1">
      {error}
    </div>
  {/if}
</div> 