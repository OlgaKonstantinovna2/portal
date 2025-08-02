<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { FormInput, Button, Icon } from '../common';
  import type { TutorVerificationForm } from '$lib/types/tutor';

  const dispatch = createEventDispatcher<{
    submit: TutorVerificationForm;
    verified: void;
  }>();

  export let deviceId: string | null;

  let code = '';
  let errors: Record<string, string> = {};
  let isSubmitting = false;

  function validateForm(): boolean {
    errors = {};

    if (!code) {
      errors.code = 'Verification code is required';
    } else if (!/^\d{6}$/.test(code)) {
      errors.code = 'Code must be 6 digits';
    }

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) return;
    if (!deviceId) {
      errors.code = 'Device ID is missing. Please try registering again.';
      return;
    }

    isSubmitting = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const successMessage = document.createElement('div');
      successMessage.className = 'fixed inset-0 flex items-center justify-center bg-black/50 z-50';
      successMessage.innerHTML = `
        <div class="bg-white dark:bg-surface-800 p-6 rounded-lg shadow-lg text-center">
          <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">Email Verified!</h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">Your email has been successfully verified.</p>
        </div>
      `;
      document.body.appendChild(successMessage);

      setTimeout(() => {
        document.body.removeChild(successMessage);
        dispatch('verified');
      }, 2000);
    } catch (error) {
      console.error('Verification error:', error);
      errors.code = 'Invalid verification code';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
  <FormInput
    id="code"
    label="Verification Code"
    bind:value={code}
    type="text"
    placeholder="Enter 6-digit code"
    maxlength={6}
    error={errors.code}
  />

  <div class="flex justify-end">
    <Button
      type="submit"
      disabled={isSubmitting}
      loading={isSubmitting}
    >
      {isSubmitting ? 'Verifying...' : 'Verify'}
    </Button>
  </div>
</form> 