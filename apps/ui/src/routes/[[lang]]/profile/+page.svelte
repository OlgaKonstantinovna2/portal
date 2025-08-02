<script lang="ts">
  import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';
  import type { Tutor } from '$lib/types/tutor';
  import type { TutorRegistrationForm } from '$lib/types/tutor';
  import type { LearningPurpose, LessonFormat } from '$lib/types/common';
  import { LEARNING_PURPOSES, LESSON_FORMATS } from '$lib/constants/common';
  import { LANGUAGE_FLAGS } from '$lib/constants/flags';
  import { PROFILE_STYLES } from '$lib/constants/profile';
  import { 
    ProfileHeader,
    ProfileBasicInfo,
    ProfileLocation,
    ProfileSubjects,
    ProfileBio,
    ProfilePreferences,
    ProfilePricing,
    ProfileAudio,
    ProfilePassword,
    ProfileActions
  } from '$lib/components/features/profile';
  import { mockTutors } from '$lib/mocks/tutors';

  // Mock data - will be loaded from server in real application
  const mockTutor: Tutor = mockTutors[0];

  let tutor = { ...mockTutor };
  let avatarFile: File | null = null;
  let avatarPreview: string | null = null;
  let audioFile: File | null = null;
  let audioPreview: string | null = null;
  let showPasswordSection = false;
  let showAudioSection = false;

  // Password change
  let currentPassword = '';
  let newPassword = '';
  let confirmPassword = '';

  // Form data - using the same interface as in registration
  let form: TutorRegistrationForm = {
    email: tutor.email,
    first_name: tutor.first_name,
    last_name: tutor.last_name,
    whatsapp: tutor.whatsapp || '',
    telegram: tutor.telegram || '',
    gender: tutor.gender,
    is_native_speaker: tutor.is_native_speaker || false,
    subjects: [...tutor.subjects],
    level: tutor.level,
    bio: tutor.bio,
    registration_geo: { ...tutor.registration_geo }
  };

  // Additional fields for profile
  let purposes: LearningPurpose[] = [...tutor.purposes];
  let lessonMode: LessonFormat[] = [...tutor.lesson_mode];
  let pricePerHour = tutor.price_per_hour || 0;

  let errors: Record<string, string> = {};

  // Use languages from constants
  const subjects = LANGUAGE_FLAGS.map(lang => lang.name);

  // Create key arrays with correct types
  const purposeKeys = Object.keys(LEARNING_PURPOSES) as LearningPurpose[];
  const lessonFormatKeys = Object.keys(LESSON_FORMATS) as LessonFormat[];

  // Prepare options for components
  const purposeOptions = purposeKeys.map(key => ({
    value: key,
    label: LEARNING_PURPOSES[key]
  }));

  const lessonFormatOptions = lessonFormatKeys.map(key => ({
    value: key,
    label: LESSON_FORMATS[key]
  }));

  function handleAvatarChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      avatarFile = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        avatarPreview = e.target?.result as string;
      };
      reader.readAsDataURL(avatarFile);
    }
  }

  function handleAudioChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      audioFile = target.files[0];
      audioPreview = URL.createObjectURL(audioFile);
    }
  }

  function handlePasswordChange() {
    // Password change logic will be here
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Send to server
    console.log('Changing password...');
  }

  function handleLogout() {
    // Logout logic will be here
    goto('/');
  }

  function handleSave() {
    // Save logic will be here
    console.log('Saving profile...');
  }

  function handleToggleAudioSection() {
    showAudioSection = !showAudioSection;
  }

  function handleTogglePasswordSection() {
    showPasswordSection = !showPasswordSection;
  }
</script>

<svelte:head>
  <title>Edit Profile</title>
</svelte:head>

<div class="min-h-screen" transition:fade>
  <div class={PROFILE_STYLES.container}>
    <div class={PROFILE_STYLES.card}>
      <!-- Header -->
      <ProfileHeader
        avatarUrl={tutor.avatar_url}
        avatarPreview={avatarPreview}
        onAvatarChange={handleAvatarChange}
      />

      <!-- Content -->
      <div class={PROFILE_STYLES.content}>
        <div class="max-w-2xl mx-auto">
          <!-- Basic Info -->
          <ProfileBasicInfo {form} {errors} />

          <!-- Location Section -->
          <ProfileLocation {form} {errors} />

          <!-- Subjects -->
          <ProfileSubjects
            {subjects}
            selectedSubjects={form.subjects}
            error={errors.subjects}
          />
          
          <!-- Bio Section -->
          <ProfileBio bio={form.bio} error={errors.bio} />

          <!-- Teaching Preferences -->
          <ProfilePreferences
            bind:purposes
            bind:lessonMode
            {purposeOptions}
            {lessonFormatOptions}
          />

          <!-- Price -->
          <ProfilePricing bind:pricePerHour />

          <!-- Audio Introduction -->
          <ProfileAudio
            audioUrl={tutor.audio_intro_url}
            {audioPreview}
            {showAudioSection}
            onAudioChange={handleAudioChange}
            onToggleAudioSection={handleToggleAudioSection}
          />

          <!-- Change Password -->
          <ProfilePassword
            {showPasswordSection}
            bind:currentPassword
            bind:newPassword
            bind:confirmPassword
            onTogglePasswordSection={handleTogglePasswordSection}
            onChangePassword={handlePasswordChange}
          />

          <!-- Action Buttons -->
          <ProfileActions
            onLogout={handleLogout}
            onSave={handleSave}
            disabled={true}
            loading={false}
          />
        </div>
      </div>
    </div>
  </div>
</div> 