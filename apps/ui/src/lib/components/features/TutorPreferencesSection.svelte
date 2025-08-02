<script lang="ts">
  import { ToggleButton } from '../common';
  import * as m from '$paraglide/messages';

  export let gender: string;

  function handleGenderChange(event: CustomEvent<{ value: any }>) {
    gender = event.detail.value;
  }
</script>

<div class="flex flex-col gap-6">
  <div>
    <label class="block text-sm text-surface-700 dark:text-surface-300 mb-2">
      {m.myTutorShouldBe()}
    </label>
    <div class="flex gap-2">
      <ToggleButton
        value={gender}
        optionValue="female"
        label={m.female()}
        variant="primary"
        on:change={handleGenderChange}
      />
      <ToggleButton
        value={gender}
        optionValue="male"
        label={m.male()}
        variant="primary"
        on:change={handleGenderChange}
      />
      <ToggleButton
        value={gender}
        optionValue="native"
        label={m.nativeSpeaker()}
        variant="primary"
        on:change={handleGenderChange}
      />
    </div>
  </div>
</div> 