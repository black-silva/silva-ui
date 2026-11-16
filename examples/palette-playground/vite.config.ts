import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [vanillaExtractPlugin()],
  resolve: {
    // Always use this checkout's source, never the published package or stale dist.
    alias: { 'silva-ui': fileURLToPath(new URL('../../src/index.ts', import.meta.url)) },
  },
  esbuild: { jsxImportSource: 'hono/jsx/dom' },
});
