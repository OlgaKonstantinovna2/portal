import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { paraglide } from '@inlang/paraglide-js-adapter-vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $lib: 'src/lib',
      $paraglide: 'src/paraglide'
    }
  },
  preprocess: [
    vitePreprocess(),
    paraglide({
      project: './project.inlang',
      outdir: './src/paraglide'
    })
  ],
  vitePlugin: {
    inspector: true
  }
};

export default config; 