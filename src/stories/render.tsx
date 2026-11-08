import { render, type Child } from 'hono/jsx/dom';

export function renderStory(story: Child) {
  const canvas = document.createElement('div');
  render(story, canvas);
  return canvas;
}
