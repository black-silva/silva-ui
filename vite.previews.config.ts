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
      'react/jsx-runtime': 'hono/jsx/dom/jsx-runtime',
      'react/jsx-dev-runtime': 'hono/jsx/dom/jsx-dev-runtime',
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
