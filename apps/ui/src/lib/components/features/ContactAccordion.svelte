<script lang="ts">
  import { slide } from 'svelte/transition';
  import { Icon, InfoRow } from '../common';
  
  export let email: string;
  export let whatsapp: string = '';
  export let telegram: string = '';
  
  let isLoadingContacts = false;
  let contactsShown = false;

  async function showContacts() {
    if (contactsShown) {
      contactsShown = false;
      return;
    }
    
    isLoadingContacts = true;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    isLoadingContacts = false;
    contactsShown = true;
  }
</script>

<div class="mt-8">
  <button 
    class="w-full px-4 py-3 text-left bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg text-surface-900 dark:text-surface-50 disabled:opacity-50 disabled:cursor-not-allowed"
    on:click={showContacts}
    disabled={isLoadingContacts}
  >
    <div class="flex items-center justify-between">
      <div>
        <span class="font-medium">Show Contact</span>
      </div>
      <div class="flex items-center gap-2">
        {#if isLoadingContacts}
          <div class="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-sm text-surface-600 dark:text-surface-400">Loading...</span>
        {:else}
          <Icon 
            name="chevron-down" 
            size="w-4 h-4" 
            color="text-primary-500"
            class_="transition-transform duration-200 {contactsShown ? 'rotate-180' : ''}"
          />
        {/if}
      </div>
    </div>
  </button>

  {#if contactsShown}
    <div class="mt-1 py-1 bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg" transition:slide={{ duration: 200 }}>
      <div class="px-4 py-3 space-y-3">
        <InfoRow icon="email" text={email} />
        {#if whatsapp}
          <div class="flex items-center gap-2 text-surface-600 dark:text-surface-400">
            <Icon name="whatsapp" color="text-green-600 dark:text-green-400" />
            <a 
              href="https://wa.me/{whatsapp.replace(/[^0-9]/g, '')}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
            >
              WhatsApp
            </a>
          </div>
        {/if}
        {#if telegram}
          <div class="flex items-center gap-2 text-surface-600 dark:text-surface-400">
            <Icon name="telegram" color="text-primary-500" />
            <a 
              href="https://t.me/{telegram.replace('@', '')}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
            >
              Telegram
            </a>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div> 