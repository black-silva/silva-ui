import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  root: 'preview',
  base: '/silva-ui/previews/',
  plugins: [vanillaExtractPlugin()],
  resolve: {
    alias: {
      'silva-ui': fileURLToPath(new URL('./src/index.ts', import.meta.url)),
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'hono/jsx',
  },
  build: {
    outDir: '../dist/previews',
    emptyOutDir: true,
  },
});
