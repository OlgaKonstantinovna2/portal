<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Dropdown } from '.';
  import { LANGUAGE_FLAGS } from '$lib/constants/flags';
  import type { Language } from '$lib/types/common';

  export let selectedLanguage: Language = 'en';
  export let showLabels: boolean = false;

  const dispatch = createEventDispatcher();

  function handleLanguageChange(event: CustomEvent) {
    selectedLanguage = event.detail.value as Language;
    dispatch('change', { value: event.detail.value });
  }

  $: languageOptions = LANGUAGE_FLAGS.map(lang => ({
    value: lang.code,
    label: showLabels ? lang.nativeName : lang.name,
    flag: lang.flag
  }));
</script>

<Dropdown
  options={languageOptions}
  value={selectedLanguage}
  showFlags={true}
  on:change={handleLanguageChange}
/> 