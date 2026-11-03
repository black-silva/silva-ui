import devServer, { defaultOptions } from "@hono/vite-dev-server";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    devServer({
      entry: "src/server.ts",
      exclude: [/^\/(?!api(?:\/|$))/, ...defaultOptions.exclude],
    }),
  ],
});
