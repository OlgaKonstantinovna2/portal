<script lang="ts">
  import { slide } from 'svelte/transition';
  import { Icon } from '../../common';
  import { PROFILE_STYLES } from '../../../constants/profile';
  import AudioPlayer from '../AudioPlayer.svelte';

  export let audioUrl: string | null = null;
  export let audioPreview: string | null = null;
  export let showAudioSection: boolean = false;
  export let onAudioChange: (event: Event) => void;
  export let onToggleAudioSection: () => void;
</script>

<div class={PROFILE_STYLES.section}>
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-50 flex items-center gap-3">
      <Icon name="play" size="w-5 h-5" class_="text-primary-500" />
      Audio Introduction
    </h2>
    <button
      type="button"
      on:click={onToggleAudioSection}
      class="text-primary-600 hover:text-primary-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
    >
      {showAudioSection ? 'Hide' : 'Edit'}
    </button>
  </div>
  
  {#if showAudioSection}
    <div class="space-y-4" transition:slide={{ duration: 200 }}>
      <!-- Current Audio -->
      {#if audioPreview}
        <div>
          <div class="flex items-center gap-2 mb-2">
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300">New Audio</h3>
            <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full border border-green-200 dark:border-green-700 font-medium">Preview</span>
          </div>
          <AudioPlayer
            audioUrl={audioPreview} 
            title="Audio Introduction"
          />
        </div>
      {:else if audioUrl}
        <div>
          <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Current Audio</h3>
          <AudioPlayer 
            audioUrl={audioUrl} 
            title="Audio Introduction"
          />
        </div>
      {/if}
      
      <!-- Upload New Audio -->
      <div>
        <label for="audio-upload" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
          Upload New Audio
        </label>
        <input
          type="file"
          accept="audio/*"
          on:change={onAudioChange}
          class="hidden"
          id="audio-upload"
        />
        <label for="audio-upload" class="cursor-pointer block">
          <div class="border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-xl p-8 text-center hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20">
            <Icon name="play" size="w-12 h-12" class_="text-surface-400 mx-auto mb-4" />
            <p class="text-sm text-surface-600 dark:text-surface-400 font-medium">
              Click to upload audio file (MP3, WAV, etc.)
            </p>
          </div>
        </label>
      </div>
    </div>
  {:else}
    <!-- Audio Preview -->
    {#if audioPreview}
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-sm font-medium text-green-600 dark:text-green-400">New Audio</span>
          <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full border border-green-200 dark:border-green-700 font-medium">Preview</span>
        </div>
        <AudioPlayer 
          audioUrl={audioPreview} 
          title="Audio Introduction"
        />
      </div>
    {:else if audioUrl}
      <AudioPlayer 
        audioUrl={audioUrl} 
        title="Audio Introduction"
      />
    {:else}
      <p class="text-sm text-surface-500 dark:text-surface-400">No audio introduction uploaded yet.</p>
    {/if}
  {/if}
</div> 