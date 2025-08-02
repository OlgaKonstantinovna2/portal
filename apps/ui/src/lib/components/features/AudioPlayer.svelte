<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import { Icon } from '../common';

  export let audioUrl: string;
  export let title: string = 'Audio Introduction';
  export let duration: number = 0; // in seconds

  const dispatch = createEventDispatcher<{
    play: void;
    pause: void;
    ended: void;
    error: string;
  }>();

  let audio: HTMLAudioElement;
  let isPlaying = false;
  let currentTime = 0;
  let progress = 0;
  let audioLoaded = false;
  let audioError = false;
  let isLoading = true;
  let isVisible = false;
  let audioElement: HTMLElement;

  onMount(() => {
    // Create intersection observer to detect when component is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            isVisible = true;
            // Only load audio when component becomes visible
            if (audio) {
              audio.src = audioUrl;
              audio.load();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (audioElement) {
      observer.observe(audioElement);
    }

    return () => {
      if (audioElement) {
        observer.unobserve(audioElement);
      }
    };
  });

  $: if (audio && isVisible) {
    audio.addEventListener('loadstart', () => {
      isLoading = true;
      audioError = false;
    });

    audio.addEventListener('loadedmetadata', () => {
      duration = audio.duration;
      audioLoaded = true;
      audioError = false;
      isLoading = false;
    });

    audio.addEventListener('canplay', () => {
      isLoading = false;
    });

    audio.addEventListener('timeupdate', () => {
      const newCurrentTime = audio.currentTime;
      const newProgress = (newCurrentTime / duration) * 100;
      
      // Update values synchronously
      currentTime = newCurrentTime;
      progress = newProgress;
    });

    audio.addEventListener('ended', () => {
      isPlaying = false;
      currentTime = 0;
      progress = 0;
      dispatch('ended');
    });

    audio.addEventListener('error', (e) => {
      audioError = true;
      audioLoaded = false;
      isLoading = false;
      dispatch('error', 'Failed to load audio');
    });

    // Set a timeout to detect if audio doesn't load
    setTimeout(() => {
      if (isLoading && !audioLoaded) {
        audioError = true;
        isLoading = false;
        dispatch('error', 'Audio load timeout');
      }
    }, 10000); // 10 seconds timeout
  }

  async function togglePlay() {
    if (!audioLoaded || audioError || isLoading) return;

    try {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        dispatch('pause');
      } else {
        await audio.play();
        isPlaying = true;
        dispatch('play');
      }
    } catch (error) {
      audioError = true;
      dispatch('error', 'Failed to play audio');
    }
  }

  function formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function handleProgressClick(event: MouseEvent) {
    if (!audioLoaded || audioError || isLoading) return;
    
    const target = event.currentTarget as HTMLElement;
    if (!target) return;
    
    const rect = target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const clickPercent = clickX / width;
    
    audio.currentTime = clickPercent * duration;
  }
</script>

<div class="bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg" bind:this={audioElement}>
  <div class="px-4 py-3">
    <div class="flex items-center gap-3 mb-3">
      <!-- Play/Pause Button -->
      <button
        class="w-10 h-10 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        on:click={togglePlay}
        disabled={!audioLoaded || audioError || isLoading}
      >
        {#if isLoading}
          <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        {:else if isPlaying}
          <Icon name="pause" size="w-5 h-5" color="text-white" />
        {:else}
          <Icon name="play" size="w-5 h-5" color="text-white" />
        {/if}
      </button>

      <!-- Title -->
      <div class="flex-1 min-w-0">
        <h3 class="font-medium text-surface-900 dark:text-surface-50 truncate">
          {title}
        </h3>
        <p class="text-sm text-surface-600 dark:text-surface-400">
          {#if isLoading}
            Loading...
          {:else if audioError}
            Failed to load
          {:else}
            {formatTime(currentTime)} / {formatTime(duration)}
          {/if}
        </p>
        {#if audioError}
          <p class="text-sm text-red-500">Failed to load audio</p>
        {/if}
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="relative">
      <div 
        class="w-full h-2 bg-surface-200 dark:bg-surface-600 rounded-full cursor-pointer overflow-hidden"
        on:click={handleProgressClick}
      >
        <div 
          class="h-full bg-primary-500 rounded-full transition-all duration-75 ease-out"
          style="width: {progress}%"
        ></div>
      </div>
      
      <!-- Progress Handle -->
      {#if audioLoaded && !audioError && !isLoading}
        <div 
          class="absolute top-1/2 w-4 h-4 bg-primary-500 rounded-full shadow-lg transform -translate-y-1/2 transition-all duration-75 ease-out hover:scale-125 hover:shadow-xl cursor-pointer z-10"
          style="left: calc({progress}% - 8px)"
        ></div>
      {/if}
    </div>
  </div>

  <!-- Hidden Audio Element -->
  <audio bind:this={audio} preload="metadata">
    <source src={audioUrl} type="audio/mpeg">
    <source src={audioUrl} type="audio/wav">
    <source src={audioUrl} type="audio/ogg">
    Your browser does not support the audio element.
  </audio>
</div>

<style>
  .audio-player {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
</style> 