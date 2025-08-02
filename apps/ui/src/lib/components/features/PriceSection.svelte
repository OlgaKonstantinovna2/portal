<script lang="ts">
  import { DualRangeSlider } from '../common';
  import type { CurrencyCode } from '$lib/types/currency';

  export let priceRange: { min: number; max: number };
  export let currency: CurrencyCode;
</script>

<div class="flex flex-col gap-6 lg:w-[30%] xl:w-[40%] w-full">
  <DualRangeSlider bind:value={priceRange} {currency} />
</div> 