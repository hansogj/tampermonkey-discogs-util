import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    global: 'window', // Provide a global object for compatibility
    globalThis: 'window', // Ensure globalThis points to window
  },
  build: {
    lib: {
      entry: 'src/main.tsx',
      name: 'DiscogsGradingHelperPanel',
      fileName: (format) => `discogs-util.user.js`, // Output as discogs-util.user.js regardless of format
      formats: ['iife'], // IIFE format is often more suitable for user scripts
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        extend: true,
      },
    },
  },
});
