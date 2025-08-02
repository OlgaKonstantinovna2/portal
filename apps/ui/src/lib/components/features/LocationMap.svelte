<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import type { GeoLocation } from '$lib/types/tutor';
  import type { Map, Marker, LeafletMouseEvent } from 'leaflet';

  const dispatch = createEventDispatcher<{
    locationSelected: { latitude: number; longitude: number };
  }>();

  export let location: GeoLocation | null = null;
  export let latitude: number | null = null;
  export let longitude: number | null = null;
  export let height = '400px';
  export let readonly = false;
  export let popupText = 'Location';

  let mapContainer: HTMLElement;
  let map: Map | null = null;
  let marker: Marker | null = null;
  let isMapInitialized = false;
  let userInteracting = false; // Flag to track user interaction

  // Import Leaflet only on client side
  let L: typeof import('leaflet') | null = null;

  // Get coordinates from either location object or direct props
  $: coordinates = {
    latitude: latitude ?? location?.latitude ?? null,
    longitude: longitude ?? location?.longitude ?? null
  };

  onMount(async () => {
    if (typeof window !== 'undefined') {
      // Dynamic import of Leaflet
      const leaflet = await import('leaflet');
      L = leaflet;
      
      // Import Leaflet CSS
      await import('leaflet/dist/leaflet.css');
      
      initializeMap();
    }
  });

  onDestroy(() => {
    if (map) {
      map.remove();
    }
  });

  async function initializeMap() {
    if (!L || !mapContainer || isMapInitialized) return;

    // Set initial coordinates
    let initialLat = 55.7558; // Moscow as default
    let initialLng = 37.6176;
    let initialZoom = 10;

    // If coordinates exist, use them
    if (coordinates.latitude && coordinates.longitude) {
      initialLat = coordinates.latitude;
      initialLng = coordinates.longitude;
      initialZoom = 12;
    }

    // Create map
    map = L.map(mapContainer).setView([initialLat, initialLng], initialZoom);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add marker if coordinates exist
    if (coordinates.latitude && coordinates.longitude) {
      marker = L.marker([coordinates.latitude, coordinates.longitude])
        .addTo(map)
        .bindPopup(popupText);
    }

    // Map click handler (only if not readonly)
    if (!readonly) {
      map.on('click', (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        
        userInteracting = true; // Set interaction flag
        
        // Remove old marker
        if (marker && map) {
          map.removeLayer(marker);
        }

        // Add new marker
        if (L && map) {
          marker = L.marker([lat, lng])
            .addTo(map)
            .bindPopup('Selected location');
        }

        // Dispatch event with coordinates
        dispatch('locationSelected', { latitude: lat, longitude: lng });
        
        // Reset flag after small delay
        setTimeout(() => {
          userInteracting = false;
        }, 100);
      });
    }

    isMapInitialized = true;
  }

  // Update map when coordinates change
  $: if (map && L && coordinates.latitude && coordinates.longitude && !userInteracting) {
    const newLat = coordinates.latitude;
    const newLng = coordinates.longitude;
    
    // Update only marker, don't change center and zoom
    if (marker && map) {
      map.removeLayer(marker);
    }
    
    if (L && map) {
      marker = L.marker([newLat, newLng])
        .addTo(map)
        .bindPopup(popupText);
    }
  }
</script>

<div class="location-map-container">
  <div 
    bind:this={mapContainer} 
    class="map-container"
    style="height: {height};"
  ></div>
  
  {#if !isMapInitialized}
    <div class="map-loading">
      <div class="loading-spinner"></div>
      <p>Loading map...</p>
    </div>
  {/if}
</div>

<style>
  .location-map-container {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgb(var(--color-surface-300));
  }

  .dark .location-map-container {
    border-color: rgb(var(--color-surface-600));
  }

  .map-container {
    width: 100%;
    background-color: #f8f9fa;
  }

  .dark .map-container {
    background-color: #2d3748;
  }

  .map-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: rgb(var(--color-surface-600));
  }

  .dark .map-loading {
    color: rgb(var(--color-surface-400));
  }

  .loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid rgb(var(--color-surface-200));
    border-top: 3px solid rgb(var(--color-primary-500));
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 8px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Leaflet styles */
  :global(.leaflet-container) {
    font-family: inherit;
  }

  :global(.leaflet-popup-content-wrapper) {
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  :global(.leaflet-popup-content) {
    margin: 8px 12px;
    font-size: 14px;
  }
</style> 