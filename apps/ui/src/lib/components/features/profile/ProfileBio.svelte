<script lang="ts">
  import { Icon, FormInput } from '../../common';
  import { PROFILE_STYLES } from '../../../constants/profile';

  export let bio: string;
  export let error: string = '';
</script>

<div class={PROFILE_STYLES.section}>
  <h2 class={PROFILE_STYLES.sectionTitle}>
    <Icon name="information-circle" size="w-5 h-5" class_="text-primary-500" />
    About You
  </h2>
  <FormInput
    id="bio"
    label="Bio"
    bind:value={bio}
    type="textarea"
    placeholder="Tell us about yourself and your teaching experience..."
    {error}
    rows={4}
  />
</div> 