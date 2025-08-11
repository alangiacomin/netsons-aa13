import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    laravel({
      input: [
        'resources/css/vendor.css',
        'resources/css/app.css',
        'resources/js/index.tsx'
      ],
      refresh: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
    // Aggiungere una gestione migliorata delle risorse statiche
    assetsInlineLimit: 4096, // Per caricare file di dimensioni maggiori come file esterni
    minify: 'terser', // Usa Terser per una migliore compressione del codice
  },
  // server: {
  //   watch: {
  //     ignored: [
  //       '**',
  //       '!resources/js/**/*',
  //       '!vite.config.js'
  //     ]
  //   }
  // }
});
