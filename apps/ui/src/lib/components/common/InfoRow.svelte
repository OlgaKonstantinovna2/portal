<script lang="ts">
  import { Icon } from '../common';
  import type { IconName } from '../../types/common';
  
  export let icon: IconName;
  export let text: string;
  export let iconColor = 'text-primary-500';
  export let textColor = 'text-surface-600 dark:text-surface-400';
</script>

<div class="flex items-center gap-2 {textColor}">
  <Icon name={icon} color={iconColor} />
  <span>{text}</span>
</div> 