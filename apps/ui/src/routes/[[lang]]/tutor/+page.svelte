<script lang="ts">
  import { TutorRegistrationForm, TutorVerificationForm, TutorLoginForm } from '$lib/components/features';
  import { onMount } from 'svelte';

  let showVerification = false;
  let deviceId: string | null = null;
  let errorMessage = '';

  onMount(() => {
    deviceId = localStorage.getItem('tutor_device_id');
  });

  async function handleRegistration(event: CustomEvent<{ deviceId: string }>) {
    // Save deviceId for testing
    localStorage.setItem('tutor_device_id', event.detail.deviceId);
    deviceId = event.detail.deviceId;
    showVerification = true; // Show verification instead of forms
  }

  async function handleLogin(event: CustomEvent<{ email: string; password: string }>) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any login
      localStorage.setItem('tutor_token', 'demo-token-' + Math.random().toString(36).substr(2, 9));
      
      // TODO: Redirect to tutor dashboard
      console.log('Login successful:', event.detail.email);
    } catch (error) {
      console.error('Login error:', error);
      errorMessage = 'Login failed. Please try again.';
    }
  }

  function handleVerified() {
    showVerification = false; // Return to login + registration forms
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-2xl mx-auto">
    <div class="text-center mb-6">
      <h1 class="text-3xl leading-[1.3] font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent mb-2">
        {#if showVerification}
          Verify Your Email
        {:else}
          Login or Join as a tutor
        {/if}
      </h1>
      <p class="text-surface-600 dark:text-surface-400">
        {#if showVerification}
          Please enter the verification code sent to your email
        {:else}
          Sign in to your account or create a new one to start teaching
        {/if}
      </p>
    </div>

    {#if showVerification}
      <!-- Verification Form -->
      <div class="bg-white/50 dark:bg-surface-800/50 rounded-lg border border-surface-200 dark:border-surface-700 p-6">
        {#if errorMessage}
          <div class="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
            {errorMessage}
          </div>
        {/if}
        <TutorVerificationForm 
          deviceId={deviceId} 
          on:verified={handleVerified}
        />
      </div>
    {:else}
      <!-- Login Form -->
      <div class="bg-white/50 dark:bg-surface-800/50 rounded-lg border border-surface-200 dark:border-surface-700 p-6 mb-6">
        
        {#if errorMessage}
          <div class="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
            {errorMessage}
          </div>
        {/if}

        <TutorLoginForm on:submit={handleLogin} />
      </div>

      <!-- Registration Section -->
      <p class="text-surface-600 dark:text-surface-400 text-center mb-6">
        Don't have an account? Register below to start teaching
      </p>
      <div class="bg-white/50 dark:bg-surface-800/50 rounded-lg border border-surface-200 dark:border-surface-700 p-6">
        <TutorRegistrationForm on:submit={handleRegistration} />
      </div>
    {/if}
  </div>
</div> 