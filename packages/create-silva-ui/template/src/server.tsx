import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { renderToString } from 'hono/jsx/dom/server';
import { App, type Page } from './app.js';

const app = new Hono();

app.use('/assets/*', serveStatic({ root: './dist-client' }));
app.use('/silva-ui.css', serveStatic({ root: './dist-client' }));

function pageResponse(page: Page) {
  return new Response(`<!doctype html>${renderToString(<App page={page} />)}`, {
    headers: { 'content-type': 'text/html; charset=UTF-8' },
  });
}

app.get('/', () => pageResponse('dashboard'));
app.get('/components', () => pageResponse('components'));

const port = Number(process.env.PORT ?? 3000);
serve({ fetch: app.fetch, port });
console.log(`Silva UI template at http://localhost:${port}`);
