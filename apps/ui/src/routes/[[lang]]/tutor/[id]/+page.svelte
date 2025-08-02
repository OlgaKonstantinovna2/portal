<script lang="ts">
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { mockTutors } from '$lib/mocks/tutors';
  import { getLanguageName } from '$lib/utils/utils';
  import { LEARNING_PURPOSES } from '$lib/constants/common';
  import { Level, Button, Icon, ProfileSection } from '$lib/components/common';
  import { ContactAccordion, AudioPlayer, LocationMap } from '$lib/components/features';

  const tutor = mockTutors.find(t => t.id === $page.params.id) ?? mockTutors[0];

  function goBack() {
    if (browser && document.referrer) {
      window.history.back();
    } else {
      goto('/');
    }
  }

  const styles = {
    container: 'max-w-4xl mx-auto px-4',
    card: 'bg-white dark:bg-surface-800 rounded-xl shadow-lg overflow-hidden',
    header: 'p-6 border-b border-surface-200 dark:border-surface-700',
    headerContent: 'flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6',
    avatar: 'w-28 h-28 rounded-full object-cover shadow-md border-4 border-white dark:border-surface-800 sm:mx-0',
    headerInfo: 'flex-1 text-center sm:text-left',
    name: 'text-2xl font-semibold text-surface-900 dark:text-surface-50',
    headerStats: 'mt-2 flex flex-col justify-center sm:justify-start items-center gap-2 sm:gap-4',
    price: 'text-2xl font-semibold text-primary-600 dark:text-primary-400',
    content: 'p-6',
    languageTag: 'px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full font-medium border border-primary-200 dark:border-primary-800 truncate',
    purposeTag: 'px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-medium border border-green-200 dark:border-green-800 truncate',
    formatTag: 'px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full font-medium border border-purple-200 dark:border-purple-800 truncate'
  };
</script>

<div class={styles.container} transition:fade>
  <!-- Back Button -->
  <Button class_="mb-6 flex items-center justify-center gap-2" on:click={goBack}>
    <Icon name="arrow-left" size="w-5 h-5" color="text-white" />
    Back
  </Button>

  <div class={styles.card}>
    <!-- Header -->
    <div class={styles.header}>
      <div class={styles.headerContent}>
        <div class="relative w-max mx-auto">
          <img
            src={tutor.avatar_url}
            alt={`${tutor.first_name} ${tutor.last_name}`}
            class={styles.avatar}
          />
          <!-- Gender indicator -->
          <div class="absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-2 border-white dark:border-surface-800 flex items-center justify-center {tutor.gender === 'female' ? 'bg-pink-200 dark:bg-pink-800' : 'bg-blue-200 dark:bg-blue-800'}">
            <Icon 
              name={tutor.gender === 'female' ? 'gender-female' : 'gender-male'} 
              size="w-4 h-4" 
              color={tutor.gender === 'female' ? 'text-pink-600 dark:text-pink-300' : 'text-blue-600 dark:text-blue-300'} 
            />
          </div>
        </div>
        <div class={styles.headerInfo}>
          <h1 class={styles.name}>
            {tutor.first_name} {tutor.last_name}
          </h1>
          <div class={styles.headerStats}>
            <div class="flex items-center gap-1">
              <Icon name="star" color="text-yellow-500" />
              <span class="text-surface-700 dark:text-surface-300">{tutor.rating ?? '—'}</span>
              <span class="text-surface-500 dark:text-surface-400">({tutor.reviews_count ?? 0})</span>
            </div>
            <div class="text-surface-700 dark:text-surface-300">
              <Level level={tutor.level} showLabel={true} size="md" />
            </div>
          </div>
        </div>
        <div class="text-center sm:text-right">
          <div class={styles.price}>
            {tutor.price_per_hour ?? '—'} ₽/hr
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class={styles.content}>
      <!-- Audio Introduction -->
      {#if tutor.audio_intro_url}
        <div class="mb-6">
          <AudioPlayer 
            audioUrl={tutor.audio_intro_url}
            title="Audio Introduction from {tutor.first_name}"
          />
        </div>
      {/if}

      <div class="prose dark:prose-invert max-w-none">
        <p>{tutor.bio}</p>
      </div>

      <!-- Languages -->
      <ProfileSection title="Languages">
        <div class="flex flex-wrap gap-2">
          {#each tutor.subjects as language}
            <span class={styles.languageTag}>
              {getLanguageName(language)}
            </span>
          {/each}
        </div>
      </ProfileSection>

      <!-- Purposes -->
      <ProfileSection title="Purposes">
        <div class="flex flex-wrap gap-2">
          {#each tutor.purposes as purpose}
            <span class={styles.purposeTag}>
              {LEARNING_PURPOSES[purpose] || purpose}
            </span>
          {/each}
        </div>
      </ProfileSection>

      <!-- Lesson Formats -->
      <ProfileSection title="Lesson Formats">
        <div class="flex flex-wrap gap-2">
          {#each tutor.lesson_mode as mode}
            <span class={styles.formatTag}>
              {mode === 'online' ? 'Online' : 'On-site'}
            </span>
          {/each}
        </div>
      </ProfileSection>
      
      <!-- Location -->
      <ProfileSection title="Location">
        <div class="space-y-4">
          <div class="flex items-center gap-2 text-surface-700 dark:text-surface-300">
            <Icon name="location" size="w-5 h-5" color="text-primary-500" />
            <span>{tutor.registration_geo.city}, {tutor.registration_geo.country}</span>
          </div>
          <LocationMap 
            latitude={tutor.registration_geo.latitude}
            longitude={tutor.registration_geo.longitude}
            readonly={true}
            popupText="{tutor.first_name}'s location"
            height="250px"
          />
        </div>
      </ProfileSection>
      
      <!-- Contact Information -->
      <ContactAccordion 
        email={tutor.email} 
        whatsapp={tutor.whatsapp} 
        telegram={tutor.telegram} 
      />
    </div>
  </div>
</div> 