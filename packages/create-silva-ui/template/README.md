# Silva UI starter

A small Vite + TypeScript starter for Silva UI.

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

To add a page, make a file in `src/pages`, add a navigation link in `Layout.tsx`, then map its path in `app.tsx`.
