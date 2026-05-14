import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://nexus.hackclub.com',
  integrations: [svelte()],
});
