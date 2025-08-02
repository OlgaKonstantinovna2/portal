<script lang="ts">
  import { slide } from 'svelte/transition';
  import { Icon, Button, FormInput } from '../../common';
  import { PROFILE_STYLES } from '../../../constants/profile';

  export let showPasswordSection: boolean = false;
  export let currentPassword: string = '';
  export let newPassword: string = '';
  export let confirmPassword: string = '';
  export let onTogglePasswordSection: () => void;
  export let onChangePassword: () => void;
</script>

<div class={PROFILE_STYLES.section}>
  <div class="flex items-center justify-between">
    <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-50 flex items-center gap-3">
      <Icon name="edit" size="w-5 h-5" class_="text-primary-500" />
      Change Password
    </h2>
    <button
      type="button"
      on:click={onTogglePasswordSection}
      class="text-primary-600 hover:text-primary-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
    >
      {showPasswordSection ? 'Hide' : 'Change'}
    </button>
  </div>
  
  {#if showPasswordSection}
    <div class="space-y-4 mt-6" transition:slide={{ duration: 200 }}>
      <FormInput
        id="current_password"
        label="Current Password"
        bind:value={currentPassword}
        type="password"
        placeholder="Enter your current password"
      />
      
      <FormInput
        id="new_password"
        label="New Password"
        bind:value={newPassword}
        type="password"
        placeholder="Enter new password"
      />
      
      <FormInput
        id="confirm_password"
        label="Confirm New Password"
        bind:value={confirmPassword}
        type="password"
        placeholder="Confirm new password"
      />
      
      <Button on:click={onChangePassword}>
        Update Password
      </Button>
    </div>
  {/if}
</div> 