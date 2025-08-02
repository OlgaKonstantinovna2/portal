<script lang="ts">
  import { Icon } from '../../common';
  import TutorLocationSection from '../TutorLocationSection.svelte';
  import { PROFILE_STYLES } from '../../../constants/profile';

  export let form: {
    registration_geo: {
      country: string;
      city: string;
      latitude?: number;
      longitude?: number;
    };
  };
  export let errors: Record<string, string> = {};
</script>

<div class={PROFILE_STYLES.section}>
  <h2 class={PROFILE_STYLES.sectionTitle}>
    <Icon name="location" size="w-5 h-5" color="text-primary-500" />
    Location
  </h2>
  <TutorLocationSection {form} {errors} />
</div> 