<script lang="ts">
  import type { LanguageLevel } from '$lib/types/common';
  import { LANGUAGE_LEVELS } from '$lib/constants/common';

  export let level: LanguageLevel;
  export let showLabel: boolean = true;
  export let size: 'sm' | 'md' | 'lg' = 'md';

  // Get level number (1-5)
  const levelNumber = Object.keys(LANGUAGE_LEVELS).indexOf(level) + 1;
  const maxLevels = Object.keys(LANGUAGE_LEVELS).length;

  // Tailwind color classes for primary gradient
  const levelColorClasses = {
    1: 'bg-primary-200', // beginner
    2: 'bg-primary-300', // elementary
    3: 'bg-primary-400', // intermediate
    4: 'bg-primary-500', // upper-intermediate
    5: 'bg-primary-600' // advanced
  };

  // Size classes
  const sizeClasses = {
    sm: {
      step: 'w-2 h-2',
      gap: 'w-1',
      container: 'h-2'
    },
    md: {
      step: 'w-3 h-3',
      gap: 'w-1.5',
      container: 'h-3'
    },
    lg: {
      step: 'w-4 h-4',
      gap: 'w-2',
      container: 'h-4'
    }
  };

  const currentSize = sizeClasses[size];

  // Function to safely get level color
  function getLevelColor(step: number): string {
    if (step >= 1 && step <= 5) {
      return levelColorClasses[step as 1|2|3|4|5];
    }
    return 'bg-surface-300 dark:bg-surface-600';
  }
</script>

<div class="flex items-center gap-2">
  
  <div class="flex items-center {currentSize.container}">
    {#each Array(maxLevels) as _, i}
      {@const stepNumber = i + 1}
      {@const isActive = stepNumber <= levelNumber}
      {@const isCurrent = stepNumber === levelNumber}
      
      <div class="flex items-center">
        <!-- Step -->
        <div 
          class="rounded-full transition-all duration-300 {currentSize.step} {isActive ? 'shadow-md' : ''} {isActive ? getLevelColor(stepNumber) : 'bg-surface-300 dark:bg-surface-600'}"
        ></div>
        
        <!-- Gap between steps -->
        {#if stepNumber < maxLevels}
          <div class="{currentSize.gap} h-px bg-surface-200 dark:bg-surface-700"></div>
        {/if}
      </div>
    {/each}
  </div>
  {#if showLabel}
    <span class="text-surface-600 dark:text-surface-400">
      {LANGUAGE_LEVELS[level]}
    </span>
  {/if}
</div> 