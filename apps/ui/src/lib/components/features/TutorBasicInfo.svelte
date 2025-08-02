<script lang="ts">
  import { FormInput, ToggleButtonGroup } from '../common';
  import type { IconName } from '../../types/common';

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

  const genderOptions = [
    { value: 'male', label: 'Male', icon: 'gender-male' as IconName, variant: 'primary' as const },
    { value: 'female', label: 'Female', icon: 'gender-female' as IconName, variant: 'primary' as const }
  ];

  const nativeSpeakerOptions = [
    { value: true, label: 'Yes', variant: 'primary' as const },
    { value: false, label: 'No', variant: 'primary' as const }
  ];
</script>

<div class="space-y-6">
  <!-- Basic Contact Information -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FormInput
      id="first_name"
      label="First Name"
      bind:value={form.first_name}
      type="text"
      error={errors.first_name}
    />
    
    <FormInput
      id="last_name"
      label="Last Name"
      bind:value={form.last_name}
      type="text"
      error={errors.last_name}
    />
    
    <FormInput
      id="tutor-email"
      label="Email"
      bind:value={form.email}
      type="email"
      placeholder="your@email.com"
      error={errors.email}
    />
    
    <FormInput
      id="whatsapp"
      label="WhatsApp"
      bind:value={form.whatsapp}
      type="tel"
      placeholder="+1234567890"
      error={errors.whatsapp}
    />
    
    <FormInput
      id="telegram"
      label="Telegram"
      bind:value={form.telegram}
      type="text"
      placeholder="@username or username"
      error={errors.telegram}
    />
  </div>

  <!-- Gender Selection -->
  <ToggleButtonGroup
    bind:value={form.gender}
    options={genderOptions}
    label="Gender"
    error={errors.gender}
  />

  <!-- Native Speaker Selection -->
  <ToggleButtonGroup
    bind:value={form.is_native_speaker}
    options={nativeSpeakerOptions}
    label="Native Speaker"
    error={errors.is_native_speaker}
  />
</div> 