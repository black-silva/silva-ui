import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import path from 'path';

export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  resolve: {
    alias: {
      'silva-ui': path.resolve(process.cwd(), 'src/index.ts'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  esbuild: {
    jsxImportSource: 'hono/jsx/dom',
  },
});

