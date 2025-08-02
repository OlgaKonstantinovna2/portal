<script lang="ts">
  import { FormInput } from '../common';
  import { LocationMap } from './';
  import { geocodingService } from '$lib/services/geocodingService';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  export let form: {
    registration_geo: {
      country: string;
      city: string;
      latitude?: number;
      longitude?: number;
    };
  };

  export let errors: Record<string, string> = {};

  let isGeocoding = false;
  let geocodingError = '';
  let showMap = false;
  let coordinateSource: 'browser' | 'geocoding' | 'manual' | null = null;

  // Initialize coordinates when component loads
  onMount(async () => {
    if (browser) {
      await initializeLocation();
    }
  });

  async function initializeLocation() {
    // First try to get coordinates from browser
    const browserLocation = await geocodingService.getBrowserLocation();
    if (browserLocation) {
      form.registration_geo.latitude = browserLocation.latitude;
      form.registration_geo.longitude = browserLocation.longitude;
      showMap = true;
      coordinateSource = 'browser';
    }
  }

  async function handleAddressBlur() {
    if (!form.registration_geo.country || !form.registration_geo.city) {
      return;
    }

    isGeocoding = true;
    geocodingError = '';

    try {
      const coordinates = await geocodingService.geocodeAddress(
        form.registration_geo.country,
        form.registration_geo.city
      );
      
      if (coordinates) {
        form.registration_geo.latitude = coordinates.latitude;
        form.registration_geo.longitude = coordinates.longitude;
        showMap = true;
        coordinateSource = 'geocoding';
      }
    } catch (error) {
      geocodingError = 'Could not determine coordinates for this address. Please select location manually on the map.';
      showMap = true;
    } finally {
      isGeocoding = false;
    }
  }

  function handleLocationSelected(event: CustomEvent<{ latitude: number; longitude: number }>) {
    form.registration_geo.latitude = event.detail.latitude;
    form.registration_geo.longitude = event.detail.longitude;
    coordinateSource = 'manual';
  }
</script>

<div class="space-y-4">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FormInput
      id="country"
      label="Country"
      bind:value={form.registration_geo.country}
      type="text"
      error={errors.country}
    />
    
    <FormInput
      id="city"
      label="City"
      bind:value={form.registration_geo.city}
      type="text"
      error={errors.city}
      on:blur={handleAddressBlur}
    />
  </div>

  <!-- Geocoding status -->
  {#if isGeocoding}
    <div class="flex items-center gap-2 text-surface-600 dark:text-surface-400">
      <div class="w-4 h-4 border-2 border-surface-300 border-t-surface-600 rounded-full animate-spin"></div>
      <span>Determining coordinates...</span>
    </div>
  {/if}

  {#if geocodingError}
    <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-yellow-700 dark:text-yellow-300">
      {geocodingError}
    </div>
  {/if}

  <!-- Map -->
  {#if showMap}
    <div class="space-y-3">
      <!-- Coordinate source information -->
      {#if coordinateSource}
        <div class="p-3 border bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 border-primary-200 dark:border-primary-800 rounded-lg text-sm">
          {#if coordinateSource === 'browser'}
            📍 Coordinates obtained from browser (GPS). Enter teaching address to refine location.
          {:else if coordinateSource === 'geocoding'}
            🗺️ Coordinates determined by teaching address. You can refine location by clicking on the map.
          {:else if coordinateSource === 'manual'}
            ✅ Location selected manually on the map.
          {/if}
        </div>
      {/if}
      
      <LocationMap 
        location={form.registration_geo}
        height="400px"
        on:locationSelected={handleLocationSelected}
      />
      
      {#if form.registration_geo.latitude && form.registration_geo.longitude}
        <div class="text-sm text-surface-600 dark:text-surface-400 text-right">
          Coordinates: {form.registration_geo.latitude.toFixed(4)}, {form.registration_geo.longitude.toFixed(4)}
        </div>
      {/if}
      
      {#if errors.location}
        <div class="text-red-600 dark:text-red-400 text-sm">
          {errors.location}
        </div>
      {/if}
    </div>
  {/if}
</div> 