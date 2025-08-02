<script lang="ts">
  import { Icon, ToggleButtonGroup } from '../../common';
  import { PROFILE_STYLES } from '../../../constants/profile';
  import type { LearningPurpose, LessonFormat } from '../../../types/common';

  export let purposes: LearningPurpose[];
  export let lessonMode: LessonFormat[];
  export let purposeOptions: Array<{ value: string; label: string }>;
  export let lessonFormatOptions: Array<{ value: string; label: string }>;
</script>

<div class="grid grid-cols-1 md:grid-cols-2">
  <!-- Purposes -->
  <div class={PROFILE_STYLES.sectionGrid}>
    <h2 class={PROFILE_STYLES.sectionTitle}>
      <Icon name="target" size="w-5 h-5" class_="text-primary-500" />
      Teaching Purposes
    </h2>
    <ToggleButtonGroup
      value={purposes}
      options={purposeOptions}
      on:change={(event) => {
        purposes = event.detail.value;
      }}
    />
  </div>

  <!-- Lesson Formats -->
  <div class={PROFILE_STYLES.sectionGrid}>
    <h2 class={PROFILE_STYLES.sectionTitle}>
      <Icon name="video-camera" size="w-5 h-5" class_="text-primary-500" />
      Lesson Formats
    </h2>
    <ToggleButtonGroup
      value={lessonMode}
      options={lessonFormatOptions}
      on:change={(event) => {
        lessonMode = event.detail.value;
      }}
    />
  </div>
</div> 