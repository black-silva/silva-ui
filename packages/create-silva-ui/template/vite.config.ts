import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist-client',
    emptyOutDir: true,
    lib: {
      entry: 'src/client.tsx',
      formats: ['es'],
      fileName: () => 'assets/client.js',
    },
    rollupOptions: {
      output: { assetFileNames: 'assets/[name][extname]' },
    },
  },
});
