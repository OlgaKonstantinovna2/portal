<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from './Icon.svelte';

  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled = false;
  export let loading = false;
  export let stopPropagation = false;
  export let fullWidth = true;
  export let class_ = '';

  const dispatch = createEventDispatcher<{
    click: MouseEvent;
  }>();

  function handleClick(event: MouseEvent) {
    if (disabled || loading) return;
    if (stopPropagation) {
      event.stopPropagation();
    }
    dispatch('click', event);
  }

  $: buttonClasses = [
    fullWidth ? 'w-full' : 'w-auto',
    'px-4 py-2 text-white rounded-lg transition-colors duration-200 flex items-center justify-center',
    disabled || loading 
      ? 'bg-primary-400 cursor-not-allowed opacity-50' 
      : 'bg-primary-500 hover:bg-primary-600',
    class_
  ].join(' ');
</script>

<button
  {type}
  {disabled}
  class={buttonClasses}
  on:click={handleClick}
>
  {#if loading}
    <Icon name="spinner" size="w-4 h-4" class_="animate-spin -ml-1 mr-2" />
  {/if}
  <slot />
</button> 