<script lang="ts">
  import { InlineSelect, ToggleButton } from '../common';
  import * as m from '$paraglide/messages';
  import type { Language, LanguageLevel, LearningPurpose, LessonFormat } from '$lib/types/common';
  import { LESSON_FORMATS } from '$lib/constants/common';

  export let sourceLanguage: Language | '';
  export let targetLanguage: Language | '';
  export let purpose: LearningPurpose | '';
  export let level: LanguageLevel | '';
  export let format: LessonFormat | '';
  export let languageOptions: Array<{ value: string; label: string }>;
  export let purposeOptions: Array<{ value: string; label: string }>;
  export let levelOptions: Array<{ value: string; label: string }>;

  const styles = {
    formGroup: 'flex items-center gap-3',
    label: 'text-surface-700 dark:text-surface-300 text-sm'
  };

  function handleFormatChange(event: CustomEvent<{ value: any }>) {
    format = event.detail.value as LessonFormat | '';
  }

  function handleChange(event: CustomEvent<{ value: string }>, field: 'sourceLanguage' | 'targetLanguage' | 'purpose' | 'level') {
    switch (field) {
      case 'sourceLanguage':
        sourceLanguage = event.detail.value as Language | '';
        break;
      case 'targetLanguage':
        targetLanguage = event.detail.value as Language | '';
        break;
      case 'purpose':
        purpose = event.detail.value as LearningPurpose | '';
        break;
      case 'level':
        level = event.detail.value as LanguageLevel | '';
        break;
    }
  }
</script>

<div class="flex flex-col gap-6">
  <div class={styles.formGroup}>
    <span class={styles.label}>{m.iSpeak()}</span>
    <InlineSelect
      options={languageOptions}
      bind:value={sourceLanguage}
      placeholder={m.selectLanguage()}
      on:change={(event) => handleChange(event, 'sourceLanguage')}
    />
  </div>
  <div class={styles.formGroup}>
    <span class={styles.label}>{m.iWillLearn()}</span>
    <InlineSelect
      options={languageOptions}
      bind:value={targetLanguage}
      placeholder={m.selectLanguage()}
      on:change={(event) => handleChange(event, 'targetLanguage')}
    />
  </div>
  <div class={styles.formGroup}>
    <span class={styles.label}>{m.format()}</span>
    <div class="flex gap-2">
      <ToggleButton
        value={format}
        optionValue="online"
        label={LESSON_FORMATS.online}
        variant="primary"
        on:change={handleFormatChange}
      />
      <ToggleButton
        value={format}
        optionValue="on-site"
        label={LESSON_FORMATS['on-site']}
        variant="primary"
        on:change={handleFormatChange}
      />
    </div>
  </div>
  <div class={styles.formGroup}>
    <span class={styles.label}>{m.for()}</span>
    <InlineSelect
      options={purposeOptions}
      bind:value={purpose}
      placeholder={m.selectPurpose()}
      on:change={(event) => handleChange(event, 'purpose')}
    />
  </div>
  <div class={styles.formGroup}>
    <span class={styles.label}>{m.myLevelIs()}</span>
    <InlineSelect
      options={levelOptions}
      bind:value={level}
      placeholder={m.selectLevel()}
      on:change={(event) => handleChange(event, 'level')}
    />
  </div>
</div> 