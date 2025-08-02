<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Dropdown } from '.';
  import { CURRENCY_FLAGS } from '$lib/constants/flags';
  import type { CurrencyCode } from '$lib/types/currency';

  export let selectedCurrency: CurrencyCode = 'USD';
  export let showLabels: boolean = false;

  const dispatch = createEventDispatcher();

  function handleCurrencyChange(event: CustomEvent) {
    selectedCurrency = event.detail.value as CurrencyCode;
    dispatch('change', { value: event.detail.value });
  }

  $: currencyOptions = CURRENCY_FLAGS.map(currency => ({
    value: currency.code,
    label: currency.code,
    flag: currency.flag,
    symbol: currency.symbol
  }));
</script>

<Dropdown
  options={currencyOptions}
  value={selectedCurrency}
  showFlags={true}
  showSymbols={true}
  on:change={handleCurrencyChange}
/> 