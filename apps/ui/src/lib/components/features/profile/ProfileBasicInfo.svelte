<script lang="ts">
  import { Icon } from '../../common';
  import { PROFILE_STYLES } from '../../../constants/profile';
  import TutorBasicInfo from '../TutorBasicInfo.svelte';

  export let form: {
    first_name: string;
    last_name: string;
    email: string;
    whatsapp: string;
    telegram: string;
    gender: 'male' | 'female' | null;
    is_native_speaker: boolean | null;
  };
  export let errors: Record<string, string> = {};
</script>

<div class={PROFILE_STYLES.section}>
  <h2 class={PROFILE_STYLES.sectionTitle}>
    <Icon name="user" size="w-5 h-5" class_="text-primary-500" />
    Basic Information
  </h2>
  <TutorBasicInfo {form} {errors} />
</div> 