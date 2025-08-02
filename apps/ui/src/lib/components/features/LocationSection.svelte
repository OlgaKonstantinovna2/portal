<script lang="ts">
  import { InlineSelect, SingleRangeSlider } from '../common';
  import * as m from '$paraglide/messages';
  import { countryOptions, cityOptions } from '$lib/mocks/locations';

  export let country: string;
  export let city: string;
  export let distance: number = 5;

  const styles = {
    formGroup: 'flex items-center gap-3',
    label: 'text-surface-700 dark:text-surface-300 text-sm'
  };

  // Get city options based on selected country
  $: availableCities = country ? cityOptions[country] || [] : [];
</script>

<div class="flex flex-col gap-4">
  <div class={styles.formGroup}>
    <span class={styles.label}>{m.location()}</span>
    <InlineSelect
      options={countryOptions}
      bind:value={country}
      placeholder={m.country()}
    />
    <InlineSelect
      options={availableCities}
      bind:value={city}
      placeholder={m.city()}
    />
  </div>

  <div>
    <SingleRangeSlider
      bind:value={distance}
      label="Search nearby"
      min={1}
      max={20}
      step={1}
      unit="km"
    />
  </div>
</div> 