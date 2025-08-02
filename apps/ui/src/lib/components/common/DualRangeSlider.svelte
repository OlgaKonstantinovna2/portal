<script lang="ts">
  import * as m from '$paraglide/messages';
  import type { CurrencyCode } from '$lib/types/currency';
  import { CURRENCIES } from '$lib/constants/currencies';
  
  export let min = 0;
  export let max = 10000;
  export let step = 100;
  export let value = { min: 0, max: 10000 };
  export let label = m.lessonPriceEstimation();
  export let currency: CurrencyCode = 'RUB';
  
  // Get currency ranges
  $: currencyRanges = CURRENCIES[currency];
  $: currencySymbol = currencyRanges.symbol;
  
  // Update min, max, step based on currency
  $: min = currencyRanges.ranges.min;
  $: max = currencyRanges.ranges.max;
  $: step = currencyRanges.ranges.step;
  
  // Reset value if it's outside the new range
  $: if (value.min < min || value.max > max) {
    value = { min, max };
  }
  
  // Determine if we need to include parameters in URL
  $: shouldIncludeMin = value.min > min;
  $: shouldIncludeMax = value.max < max;
  
  // Handlers to prevent slider intersection
  function updateMin() {
    if (value.min > value.max) {
      value.min = value.max;
    }
  }
  
  function updateMax() {
    if (value.max < value.min) {
      value.max = value.min;
    }
  }
  
  // Calculate positions for visual range display
  $: minPercent = ((value.min - min) / (max - min)) * 100;
  $: maxPercent = ((value.max - min) / (max - min)) * 100;
</script>

<div class="space-y-2">
  {#if label}
    <span class="text-surface-700 dark:text-surface-300 text-sm">{label}</span>
  {/if}
  
  <div class="flex justify-center py-2">
    <div class="relative w-full">
      <!-- Background track -->
      <div class="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg"></div>
      
      <!-- Active range -->
      <div 
        class="absolute top-0 h-2 bg-primary-500 rounded-lg"
        style="left: {minPercent}%; width: {maxPercent - minPercent}%;"
      ></div>
      
      <!-- Minimum slider -->
      <input
        type="range"
        {min}
        {max}
        {step}
        bind:value={value.min}
        on:input={updateMin}
        class="absolute top-0 w-full h-2 bg-transparent pointer-events-none appearance-none z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-600 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:pointer-events-auto"
      />
      
      <!-- Maximum slider -->
      <input
        type="range"
        {min}
        {max}
        {step}
        bind:value={value.max}
        on:input={updateMax}
        class="absolute top-0 w-full h-2 bg-transparent pointer-events-none appearance-none z-20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-600 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:pointer-events-auto"
      />
    </div>
  </div>
  
  <!-- Value display -->
  <div class="flex justify-between items-center gap-4">
    <span class="text-surface-700 dark:text-surface-300 text-sm px-2 py-1 min-w-[80px] text-center">
      {shouldIncludeMin ? `${value.min} ${currencySymbol}` : `от ${min} ${currencySymbol}`}
    </span>
    <span class="text-surface-700 dark:text-surface-300 text-sm px-2 py-1 min-w-[80px] text-center">
      {shouldIncludeMax ? `${value.max} ${currencySymbol}` : `до ∞ ${currencySymbol}`}
    </span>
  </div>
</div> 