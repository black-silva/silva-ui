import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import path from 'path';

export default defineConfig({
  root: process.cwd(),
  plugins: [vanillaExtractPlugin()],
  build: {
    outDir: 'dist/library',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(process.cwd(), 'src/index.ts'),
      formats: ['es'],
      fileName: 'silva-ui',
    },
    rollupOptions: {
      external: ['hono', /^hono\//, '@vanilla-extract/css', '@vanilla-extract/sprinkles'],
    },
  },
});
