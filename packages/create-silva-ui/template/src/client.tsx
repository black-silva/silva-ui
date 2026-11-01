import { createRoot } from 'hono/jsx/dom/client';
import 'silva-ui/style.css';
import { App } from './app';

const root = document.getElementById('app');

if (!root) {
  throw new Error('Could not find the app root.');
}

createRoot(root).render(<App />);
