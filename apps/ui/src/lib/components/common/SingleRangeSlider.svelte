<script lang="ts">
  export let min = 1;
  export let max = 20;
  export let step = 1;
  export let value = 5;
  export let label = 'Distance';
  export let unit = 'km';
  
  // Calculate position for visual display
  $: percent = ((value - min) / (max - min)) * 100;
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
        style="width: {percent}%;"
      ></div>
      
      <!-- Slider -->
      <input
        type="range"
        {min}
        {max}
        {step}
        bind:value
        class="absolute top-0 w-full h-2 bg-transparent pointer-events-none appearance-none z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-600 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:pointer-events-auto"
      />
    </div>
  </div>
  
  <!-- Value display -->
  <div class="flex justify-center items-center">
    <span class="text-surface-700 dark:text-surface-300 text-sm px-2 py-1 min-w-[80px] text-center">
      {value} {unit}
    </span>
  </div>
</div> 