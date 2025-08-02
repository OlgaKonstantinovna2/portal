<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { clickOutside } from '$lib/actions';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import Icon from './Icon.svelte';
  import { PortalDropdown } from '.';
  import { getDropdownPortal } from '$lib/utils/portal';

  export let options: { value: string; label: string }[] = [];
  export let value = '';
  export let placeholder = 'Select option';

  const dispatch = createEventDispatcher();
  let isOpen = false;
  let selectElement: HTMLElement;
  let dropdownPosition = { top: 0, left: 0, width: 200 };

  function handleSelect(option: { value: string; label: string }) {
    value = option.value;
    dispatch('change', { value: option.value });
    isOpen = false;
  }

  function toggleDropdown() {
    if (!isOpen) {
      calculatePosition();
    }
    isOpen = !isOpen;
  }

  function closeDropdown() {
    isOpen = false;
    // Force cleanup after a short delay
    setTimeout(() => {
      if (browser) {
        const portal = getDropdownPortal();
        portal.cleanup();
      }
    }, 150);
  }

  function handleClickOutside() {
    closeDropdown();
  }

  function calculatePosition() {
    if (selectElement) {
      const rect = selectElement.getBoundingClientRect();
      dropdownPosition = {
        top: rect.bottom + 4,
        left: rect.left,
        width: 200
      };
    }
  }

  // Close dropdown on scroll or resize
  function handleScrollOrResize(event: Event) {
    if (isOpen) {
      // Check if scroll happened inside the dropdown
      const target = event.target as HTMLElement;
      if (target && target.closest && target.closest('.portal-dropdown')) {
        return; // Don't close if scrolling inside dropdown
      }
      isOpen = false;
    }
  }

  onMount(() => {
    if (browser) {
      window.addEventListener('scroll', handleScrollOrResize, true);
      window.addEventListener('resize', handleScrollOrResize);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    }
  });

  $: selectedOption = options.find(opt => opt.value === value);
</script>

<div 
  class="inline-flex items-center relative" 
  bind:this={selectElement}
  use:clickOutside={handleClickOutside}
>
  <button
    type="button"
    class="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
    on:click|stopPropagation={toggleDropdown}
  >
    <span class="text-surface-700 dark:text-surface-300">{selectedOption?.label || placeholder}</span>
    <Icon
      name="chevron-down"
      size="w-4 h-4"
      class_="transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
    />
  </button>
</div>

<PortalDropdown
  {isOpen}
  position={dropdownPosition}
  {options}
  selectedValue={value}
  onSelect={handleSelect}
/>