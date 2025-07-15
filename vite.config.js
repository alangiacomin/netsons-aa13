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
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       api: 'legacy',
  //       silenceDeprecations: ['legacy-js-api', 'color-functions', 'global-builtin', 'import'],
  //     },
  //   },
  // },
  build: {
    rollupOptions: {
      output: {
        // Separazione automatica dei vendor per ottimizzare il caricamento
        //manualChunks(id) {
        //    if (id.includes('node_modules')) {
        //        return 'vendor';
        //    }
        //    if (id.includes('resources/js') && id.includes('.scss')) {
        //        return 'components';
        //    }
        //    if (id.includes('resources/js')) {
        //        return 'app';
        //    }
        //    // Aggiungi altre regole per chunk specifici
        //    return null;
        //},
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        //assetFileNames: ({name}) => {
        //    if (name && name.endsWith('.css')) {
        //        console.log(name, name === 'index.css'
        //          ? 'css/app-[hash][extname]'
        //          : 'css/[name]-[hash][extname]');
        //        return name === 'index.css'
        //          ? 'css/app-[hash][extname]'
        //          : 'css/[name]-[hash][extname]';
        //    }
        //    // Per altri asset, usa un modello comune
        //    return 'assets/[name]-[hash][extname]';
        //},
      },
    },
    // Aggiungere una gestione migliorata delle risorse statiche
    assetsInlineLimit: 4096, // Per caricare file di dimensioni maggiori come file esterni
    minify: 'terser', // Usa Terser per una migliore compressione del codice
  },
});
