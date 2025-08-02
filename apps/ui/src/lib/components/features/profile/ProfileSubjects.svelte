<script lang="ts">
  import { Icon } from '../../common';
  import SubjectsSelector from '../SubjectsSelector.svelte';
  import { PROFILE_STYLES } from '../../../constants/profile';

  export let subjects: string[];
  export let selectedSubjects: string[];
  export let error: string = '';
</script>

<div class={PROFILE_STYLES.section}>
  <h2 class={PROFILE_STYLES.sectionTitle}>
    <Icon name="book" size="w-5 h-5" class_="text-primary-500" />
    Teaching Subjects
  </h2>
  <SubjectsSelector
    {subjects}
    bind:selectedSubjects
    {error}
  />
</div> 