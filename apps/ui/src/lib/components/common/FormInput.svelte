<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { clickOutside } from '$lib/actions';
  import Icon from './Icon.svelte';
  
  export let id: string;
  export let label: string;
  export let value: string | number;
  export let type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'password' | 'select' = 'text';
  export let placeholder: string = '';
  export let error: string = '';
  export let rows: number = 4;
  export let min: number | undefined = undefined;
  export let maxlength: number | undefined = undefined;
  export let options: Array<{ value: string; label: string }> = [];

  const dispatch = createEventDispatcher();

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white/50 dark:bg-surface-700/50 backdrop-blur-sm border border-surface-200 dark:border-surface-600 rounded-lg text-surface-900 dark:text-surface-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200";
  const labelClass = "block text-sm font-medium text-surface-700 dark:text-surface-300";
  const errorClass = "mt-1 text-sm text-red-500";
  const selectClass = "mt-1 text-left block w-full px-3 py-2 bg-white/50 dark:bg-surface-700/50 backdrop-blur-sm border border-surface-200 dark:border-surface-600 rounded-lg text-surface-900 dark:text-surface-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 appearance-none";

  // Dropdown state for select
  let isOpen = false;
  let dropdownElement: HTMLElement;

  function handleSelect(selectedValue: string) {
    value = selectedValue;
    dispatch('input');
    isOpen = false;
  }
</script>

<div>
  <label for={id} class={labelClass}>
    {label}
  </label>
  
  {#if type === 'textarea'}
    <textarea
      {id}
      bind:value
      {rows}
      class={inputClass}
      {placeholder}
      on:blur={() => dispatch('blur')}
      on:input={() => dispatch('input')}
    ></textarea>
  {:else if type === 'select'}
    <div 
      bind:this={dropdownElement}
      use:clickOutside={() => isOpen = false}
      class="relative"
    >
      <button
        type="button"
        {id}
        class={selectClass}
        on:click={() => isOpen = !isOpen}
      >
        {options.find(opt => opt.value === value)?.label || placeholder}
        <span class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <Icon name="chevron-down" size="w-4 h-4" color="text-surface-500 dark:text-surface-400" />
        </span>
      </button>

      {#if isOpen}
        <div class="absolute z-[60] w-full mt-1 bg-white/90 dark:bg-surface-700/90 backdrop-blur-md border border-surface-200 dark:border-surface-600 rounded-lg shadow-lg">
          <div class="w-full max-h-48 overflow-y-auto scrollbar-thin p-1">
            {#each options as option}
              <button
                type="button"
                class="w-full text-left px-3 py-2 rounded-md text-surface-900 dark:text-surface-50 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors duration-150 {option.value === value ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : ''}"
                on:click={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {:else if type === 'email'}
    <input
      {id}
      type="email"
      bind:value
      class={inputClass}
      {placeholder}
      on:blur={() => dispatch('blur')}
      on:input={() => dispatch('input')}
    />
  {:else if type === 'tel'}
    <input
      {id}
      type="tel"
      bind:value
      class={inputClass}
      {placeholder}
      on:blur={() => dispatch('blur')}
      on:input={() => dispatch('input')}
    />
  {:else if type === 'number'}
    <input
      {id}
      type="number"
      bind:value
      class={inputClass}
      {placeholder}
      {min}
      on:blur={() => dispatch('blur')}
      on:input={() => dispatch('input')}
    />
  {:else if type === 'password'}
    <input
      {id}
      type="password"
      bind:value
      class={inputClass}
      {placeholder}
      on:blur={() => dispatch('blur')}
      on:input={() => dispatch('input')}
    />
  {:else}
    <input
      {id}
      type="text"
      bind:value
      class={inputClass}
      {placeholder}
      {maxlength}
      on:blur={() => dispatch('blur')}
      on:input={() => dispatch('input')}
    />
  {/if}
  
  {#if error}
    <p class={errorClass}>{error}</p>
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
</style> 