import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://alutian.github.io',
  base: '/JapanTrip2026',
  trailingSlash: 'ignore',
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      manifest: {
        name: 'Japan 2026',
        short_name: 'Japan 2026',
        description: 'Trip companion — Ajay, Candice, Zara, Kai, Grandma · May 29 – Jun 8, 2026',
        theme_color: '#b91c1c',
        background_color: '#0f172a',
        display: 'standalone',
        scope: '/JapanTrip2026/',
        start_url: '/JapanTrip2026/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{html,css,js,svg,png,webmanifest,json}'],
        navigateFallback: '/JapanTrip2026/',
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
});
