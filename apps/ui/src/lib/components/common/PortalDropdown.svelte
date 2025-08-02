<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { getDropdownPortal } from '$lib/utils/portal';

  export let isOpen = false;
  export let position: { top: number; left: number; width: number } = { top: 0, left: 0, width: 200 };
  export let options: { value: string; label: string }[] = [];
  export let selectedValue = '';
  export let onSelect: (option: { value: string; label: string }) => void;

  let dropdownElement: HTMLElement;

  onMount(() => {
    if (isOpen && dropdownElement) {
      const portal = getDropdownPortal();
      portal.mount(dropdownElement);
    }
  });

  onDestroy(() => {
    if (dropdownElement) {
      const portal = getDropdownPortal();
      portal.unmount(dropdownElement);
    }
  });

  $: if (isOpen && dropdownElement) {
    const portal = getDropdownPortal();
    portal.mount(dropdownElement);
  } else if (!isOpen && dropdownElement) {
    const portal = getDropdownPortal();
    portal.unmount(dropdownElement);
    // Force cleanup after unmount
    setTimeout(() => {
      if (dropdownElement && dropdownElement.parentNode) {
        dropdownElement.parentNode.removeChild(dropdownElement);
      }
    }, 100);
  }

  function handleSelect(option: { value: string; label: string }) {
    onSelect(option);
  }
</script>

{#if isOpen}
  <div
    bind:this={dropdownElement}
    class="fixed py-1 bg-white/90 dark:bg-surface-800/90 backdrop-blur-md rounded-lg shadow-lg border border-surface-200/50 dark:border-surface-600/50 max-h-[300px] overflow-y-auto scrollbar-thin portal-dropdown"
    style="top: {position.top}px; left: {position.left}px; width: {position.width}px; max-width: {position.width}px;"
    transition:fade
  >
    {#each options as option}
      <button
        type="button"
        class="w-full px-4 py-2 text-left text-sm transition-colors duration-200 {option.value === selectedValue ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700/50'}"
        on:click={() => handleSelect(option)}
      >
        {option.label}
      </button>
    {/each}
  </div>
{/if}

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