import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import path from 'node:path';

export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  resolve: { alias: { 'silva-ui': path.resolve(process.cwd(), 'src/index.ts') } },
  esbuild: { jsxImportSource: 'hono/jsx/dom' },
});
