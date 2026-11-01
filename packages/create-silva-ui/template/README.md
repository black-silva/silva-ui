# Silva UI hydration template

A multi-page Hono + TypeScript app that demonstrates **server-rendered Silva UI**, with tiny browser controllers layered on afterwards.

## What it proves

- Two server-rendered routes: `/` and `/components`
- Shared layout and navigation using Silva UI components
- Accessible tabs enhanced in-place with keyboard support
- A sheet navigation menu enhanced in-place and closable with Escape
- No application-authored CSS. All styling comes from Silva UI props and its stylesheet.
- Gradients through `backgroundColor="aurora"` and `color="ocean"`
- Animation through `animation="fadeIn"`, `animation="slideUp"`, and `animation="pulse"`

## Run it

```bash
npm install
npm run build
npm start
```

Open `http://localhost:3000`.

For development:

```bash
npm run dev
```

## Architecture

The server renders complete, accessible HTML. The controller in `src/controllers.ts` does not import or re-render a component tree. It locates existing elements and only updates the attributes that make the interactions work:

- tabs: `data-active`, `aria-selected`, `hidden`, and focus
- sheet: `data-state`, `aria-hidden`, `aria-expanded`, and focus

That keeps the initial response usable if JavaScript never loads, while adding a small progressive-enhancement layer where it helps.

## Template status

This is intended as the practical starting point for `create-silva-ui` once the source-first package workflow is settled. It currently consumes the packed Silva UI build so it is a real consumer-level integration test.
