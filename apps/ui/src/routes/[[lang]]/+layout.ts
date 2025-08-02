import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { locales } from '$paraglide/runtime';

export const load: LayoutLoad = async ({ url, params }) => {
  const path = url.pathname;

  // If lang is not specified or it's 'en', use English without prefix
  if (!params.lang || params.lang === 'en') {
    return { lang: 'en' as const };
  }

  // For other languages, check if they are supported
  if (!locales.includes(params.lang as (typeof locales)[number])) {
    throw redirect(307, path.replace(`/${params.lang}`, ''));
  }

  return {
    lang: params.lang as (typeof locales)[number],
  };
};
