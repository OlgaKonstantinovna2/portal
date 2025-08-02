<script lang="ts">
  import '../../app.css';
  import 'flag-icons/css/flag-icons.min.css';
  import { setLocale } from '$paraglide/runtime';
  import * as m from '$paraglide/messages';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { Language } from '$lib/types/common';
  import type { CurrencyCode } from '$lib/types/currency';
  import { LanguageSelector, CurrencySelector } from '$lib/components/common';
  import { currencyStore } from '$lib/stores/currency';

  // Update locale when language changes
  $: setLocale($page.data.lang);

  function getLangPrefix(lang: string) {
    return lang === 'en' ? '' : `/${lang}`;
  }

  function getHomePrefix(lang: string) {
    return lang === 'en' ? '/' : `/${lang}`;
  }

  function handleLanguageChange(event: CustomEvent<{ value: string }>) {
    const newLanguage = event.detail.value as Language;
    // Get current path
    let path = $page.url.pathname;
    // Remove language prefix if not English
    const currentLang = $page.data.lang;
    if (currentLang !== 'en') {
      path = path.replace(`/${currentLang}`, '');
      if (path === '') path = '/';
    }
    // Form new path
    const newPath = newLanguage === 'en'
      ? path
      : path === '/' ? `/${newLanguage}` : `/${newLanguage}${path}`;
    goto(newPath);
  }

  function handleCurrencyChange(event: CustomEvent<{ value: string }>) {
    const newCurrency = event.detail.value as CurrencyCode;
    currencyStore.set(newCurrency);
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
  <nav class="bg-white dark:bg-surface-800 border-b-2 border-primary-100 dark:border-primary-900 shadow-sm relative z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-24">
        <!-- Logo on the left -->
        <div class="flex items-center">
          <a 
            href={getHomePrefix($page.data.lang)} 
            class="text-2xl lg:text-3xl lg:leading-10 font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent hover:from-primary-500 hover:to-primary-400 transition-all duration-300"
          >
            English.guru
          </a>
        </div>

        <!-- Title and description in center (desktop) -->
        <div class="hidden lg:flex flex-col items-start text-center">
          <h1 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-1">
            Language tutors hub
          </h1>
          <p class="text-sm text-surface-600 dark:text-surface-400">
            Find best matching teachers from around the world
          </p>
        </div>

        <!-- Right side - empty div for balance (desktop) -->
        <div class="hidden lg:block w-32"></div>

        <!-- Navigation items on the right -->
        <div class="flex items-end sm:items-center gap-2 sm:gap-4 lg:gap-6 sm:flex-row flex-col">
          <a
            href={`${getLangPrefix($page.data.lang)}/tutor`}
            class="text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium order-2 sm:order-1"
          >
            {m.forTutors()}
          </a>
          
          <!-- Language and Currency Selectors -->
          <div class="flex items-center gap-2 order-1 sm:order-2">
            <LanguageSelector 
              showLabels={true}
              selectedLanguage={$page.data.lang}
              on:change={handleLanguageChange}
            />
            <div class="w-px h-5 bg-surface-300 dark:bg-surface-600"></div>
            <CurrencySelector 
              selectedCurrency={$currencyStore}
              on:change={handleCurrencyChange}
            />
          </div>
        </div>
      </div>
    </div>
  </nav>

  <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <slot />
  </main>
</div>