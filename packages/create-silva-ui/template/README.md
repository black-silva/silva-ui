# Silva UI starter

A portable static SPA starter built with Vite, TypeScript, Silva UI, Hono JSX, and Ruta.

## Pages

- `src/pages/Home.tsx` renders `/`
- `src/pages/About.tsx` renders `/about`
- `src/components/Layout.tsx` holds the shared navigation and page layout
- `src/app.tsx` maps paths to pages
- `src/client.tsx` mounts the app in the browser

## Run it

```bash
npm install
npm run dev
```

Open the local address Vite prints. Visit `/about` to see the second page.

## Build it

```bash
npm run typecheck
npm run build
npm run preview
```

`npm run build` emits static files to `dist/`.

For Ruta client routes like `/about`, configure your host with SPA history fallback so unknown paths serve `dist/index.html`.

To add a page, make a file in `src/pages`, add a navigation link in `Layout.tsx`, then map its path in `app.tsx`.
