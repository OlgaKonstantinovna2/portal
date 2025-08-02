<script lang="ts">
  import { Icon } from '../../common';
  import { PROFILE_STYLES } from '../../../constants/profile';

  export let avatarUrl: string | null = null;
  export let avatarPreview: string | null = null;
  export let onAvatarChange: (event: Event) => void;
</script>

<div class={PROFILE_STYLES.header}>
  <div class={PROFILE_STYLES.headerContent}>
    <div class="relative group">
      <input
        type="file"
        accept="image/*"
        on:change={onAvatarChange}
        class="hidden"
        id="avatar-upload"
      />
      <label for="avatar-upload" class="cursor-pointer block">
        <div class={PROFILE_STYLES.avatar}>
          {#if avatarPreview || avatarUrl}
            <img 
              src={avatarPreview || avatarUrl} 
              alt="Avatar" 
              class="w-full h-full object-cover"
            />
          {:else}
            <div class="w-full h-full flex items-center justify-center text-surface-400">
              <Icon name="email" size="w-8 h-8" />
            </div>
          {/if}
        </div>
        <!-- Overlay for edit -->
        <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
          <Icon name="edit" size="w-5 h-5" class_="text-white" />
        </div>
      </label>
    </div>
    <p class="text-xs text-surface-500 text-center mt-1">
      Tap to change photo
    </p>
    <div class={PROFILE_STYLES.headerInfo}>
      <h1 class={PROFILE_STYLES.title}>
        Edit Profile
      </h1>
      <p class={PROFILE_STYLES.subtitle}>Update your information and photo</p>
    </div>
  </div>
</div> 