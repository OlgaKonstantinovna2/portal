<script lang="ts">
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import { clickOutside } from '$lib/actions';
  import { createEventDispatcher } from 'svelte';
  import Icon from './Icon.svelte';
  import { FlagIcon } from '.';

  export let options: { value: string; label: string; flag?: string; symbol?: string }[] = [];
  export let value: string;
  export let placeholder = 'Select...';
  export let showFlags = false;
  export let showSymbols = false;

  const dispatch = createEventDispatcher();
  let isOpen = false;
  let dropdownElement: HTMLElement;

  function handleSelect(selectedValue: string) {
    dispatch('change', { value: selectedValue });
    isOpen = false;
  }

  $: selectedOption = options.find(opt => opt.value === value);
</script>

<div 
  bind:this={dropdownElement}
  use:clickOutside={() => isOpen = false}
  class="relative"
>
  <button
    type="button"
    class="pl-3 pr-[1.75rem] py-2 text-left bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg text-surface-900 dark:text-surface-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
    on:click={() => isOpen = !isOpen}
  >
    <div class="flex items-center gap-2">
      {#if selectedOption}
        {#if showFlags && selectedOption.flag && !showSymbols}
          <FlagIcon countryCode={selectedOption.flag} size="sm" />
        {:else if showSymbols && selectedOption.symbol}
          <span class="text-md leading-none font-medium text-surface-700 dark:text-surface-300">
            {selectedOption.symbol}
          </span>
        {:else}
          <span class="text-surface-700 dark:text-surface-300">
            {selectedOption.label}
          </span>
        {/if}
      {:else}
        <span class="text-surface-500 dark:text-surface-400">{placeholder}</span>
      {/if}
    </div>
    <span class="absolute z-[60] inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <Icon 
        name="chevron-down" 
        size="w-4 h-4" 
        color="text-surface-500 dark:text-surface-400"
        class_="transition-transform duration-200 {isOpen ? 'rotate-180' : ''}" />
    </span>
  </button>

  {#if isOpen}
    <div class="absolute right-0 z-[60] w-40 mt-1 bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg shadow-lg">
      <ListBox
        bind:group={value}
        class="w-full max-h-48 overflow-y-auto scrollbar-thin"
        active="variant-filled-primary"
        padding="p-2"
        rounded="rounded-lg"
      >
        {#each options as option}
          <ListBoxItem 
            group={value}
            name={option.value}
            value={option.value}
            class={option.value === value ? 'selected' : ''}
            on:click={() => handleSelect(option.value)}
          >
            <div class="flex items-center gap-2">
              {#if showFlags && option.flag}
                <FlagIcon countryCode={option.flag} size="sm" />
              {/if}
              {#if showSymbols && option.symbol}
                <span class="text-lg font-medium">{option.symbol}</span>
              {/if}
              <span>{option.label}</span>
            </div>
          </ListBoxItem>
        {/each}
      </ListBox>
    </div>
  {/if}
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

  /* Active state styles */
  :global(.listbox-item) {
    cursor: pointer;
    user-select: none;
    border-radius: 0.5rem;
  }

  :global(.listbox-item.selected) {
    background-color: rgb(14 165 233);
    color: white;
  }

  /* ListBox container styles */
  :global(.listbox) {
    border-radius: 0.5rem;
  }
</style> 