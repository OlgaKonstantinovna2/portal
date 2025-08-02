<script lang="ts">
  export let title: string;
  export let class_ = '';
</script>

<div class="mt-8 {class_}">
  <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-50 mb-4">{title}</h2>
  <slot />
</div> 