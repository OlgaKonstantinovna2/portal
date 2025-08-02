<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { FormInput, Button } from '../common';

  const dispatch = createEventDispatcher<{
    submit: { email: string; password: string };
  }>();

  let email = '';
  let password = '';
  let errors: { email?: string; password?: string } = {};

  function validateForm() {
    errors = {};
    let isValid = true;

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    return isValid;
  }

  function handleSubmit() {
    if (validateForm()) {
      dispatch('submit', { email, password });
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
  <FormInput
    id="login-email"
    label="Email"
    bind:value={email}
    type="email"
    placeholder="Enter your email"
    error={errors.email}
  />

  <FormInput
    id="password"
    label="Password"
    bind:value={password}
    type="password"
    placeholder="Enter your password"
    error={errors.password}
  />

  <Button
    type="submit"
  >
    Sign In
  </Button>
</form> 