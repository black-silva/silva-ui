import type { StorybookConfig } from '@storybook/html-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import path from 'node:path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/html-vite',
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), vanillaExtractPlugin()];
    config.resolve = {
      ...config.resolve,
      alias: { ...(config.resolve?.alias ?? {}), 'silva-ui': path.resolve(process.cwd(), 'src/index.ts') },
    };
    config.esbuild = { ...config.esbuild, jsxImportSource: 'hono/jsx/dom' };
    return config;
  },
};
export default config;
