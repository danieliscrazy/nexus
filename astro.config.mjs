import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://nexus.hackclub.com',
  integrations: [svelte()],
  vite: {
    server: {
      allowedHosts: ['.ts.net', '.ngrok-free.app', '.ngrok.app', '.ngrok.io'],
    },
    preview: {
      allowedHosts: ['.ts.net', '.ngrok-free.app', '.ngrok.app', '.ngrok.io'],
    },
  },
});
