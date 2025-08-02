<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Button, FormInput } from '../common';
  import { TutorBasicInfo, TutorLocationSection, SubjectsSelector } from './';
  import type { TutorRegistrationForm } from '$lib/types/tutor';
  import { LANGUAGE_FLAGS } from '$lib/constants/flags';

  const dispatch = createEventDispatcher<{
    submit: { deviceId: string };
  }>();

  let form: TutorRegistrationForm = {
    email: '',
    first_name: '',
    last_name: '',
    whatsapp: '',
    telegram: '',
    gender: null,
    is_native_speaker: null,
    subjects: [],
    level: 'intermediate',
    bio: '',
    registration_geo: {
      country: '',
      city: ''
    }
  };

  let errors: Record<string, string> = {};
  let isSubmitting = false;

  // Use languages from constants instead of hardcoded list
  const subjects = LANGUAGE_FLAGS.map(lang => lang.name);

  function validateForm(): boolean {
    errors = {};

    if (!form.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Invalid email format';
    }

    if (!form.first_name) {
      errors.first_name = 'First name is required';
    }

    if (!form.last_name) {
      errors.last_name = 'Last name is required';
    }

    if (!form.whatsapp) {
      errors.whatsapp = 'WhatsApp is required';
    }

    if (!form.telegram) {
      errors.telegram = 'Telegram is required';
    }

    if (form.subjects.length === 0) {
      errors.subjects = 'Select at least one subject';
    }

    if (!form.gender) {
      errors.gender = 'Please select your gender';
    }

    if (form.is_native_speaker === null) {
      errors.is_native_speaker = 'Please indicate if you are a native speaker';
    }

    if (!form.bio) {
      errors.bio = 'Bio is required';
    }

    if (!form.registration_geo.country) {
      errors.country = 'Country is required';
    }

    if (!form.registration_geo.city) {
      errors.city = 'City is required';
    }

    if (!form.registration_geo.latitude || !form.registration_geo.longitude) {
      errors.location = 'Please select your location on the map';
    }

    return Object.keys(errors).length === 0;
  }

  function handleSubmit() {
    if (!validateForm()) return;

    isSubmitting = true;
    
    // Log form data
    console.log('Form data:', form);
    
    // For testing, just send a random deviceId
    dispatch('submit', { deviceId: 'test-device-id-' + Math.random().toString(36).substr(2, 9) });
    isSubmitting = false;
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  <!-- Basic Information -->
  <TutorBasicInfo {form} {errors} />

  <!-- Location Section -->
  <TutorLocationSection {form} {errors} />

  <!-- Subjects and Level -->
  <SubjectsSelector
    {subjects}
    bind:selectedSubjects={form.subjects}
    error={errors.subjects}
  />
  
  <!-- Bio Section -->
  <FormInput
    id="bio"
    label="Bio"
    bind:value={form.bio}
    type="textarea"
    placeholder="Tell us about yourself and your teaching experience..."
    error={errors.bio}
    rows={4}
  />
  
  <div class="flex justify-end">
    <Button
      type="submit"
      disabled={isSubmitting}
      loading={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : 'Submit Registration'}
    </Button>
  </div>
</form> 