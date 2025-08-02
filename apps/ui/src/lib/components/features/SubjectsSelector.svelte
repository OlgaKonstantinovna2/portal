<script lang="ts">
  import { ToggleButton } from '../common';
  import * as m from '$paraglide/messages';
  
  export let subjects: string[] = [];
  export let selectedSubjects: string[] = [];
  export let error: string = '';

  const labelClass = "block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2";
  const errorClass = "mt-1 text-sm text-red-500";

  function toggleSubject(subject: string) {
    const index = selectedSubjects.indexOf(subject);
    if (index === -1) {
      selectedSubjects = [...selectedSubjects, subject];
    } else {
      selectedSubjects = selectedSubjects.filter((s) => s !== subject);
    }
  }
</script>

<div>
  <label class={labelClass}>
    {m.subjects()}
  </label>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-1">
    {#each subjects as subject}
      <ToggleButton
        size="md"
        value={selectedSubjects}
        optionValue={subject}
        label={subject}
        variant="primary"
        on:change={() => toggleSubject(subject)}
      />
    {/each}
  </div>
  {#if error}
    <p class={errorClass}>{error}</p>
  {/if}
</div> 