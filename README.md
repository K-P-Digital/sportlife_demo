# Sportlife React Demo

Mobile-first clickable prototype rebuilt from Google Stitch HTML exports as a Vite + React + TypeScript app.

The original Stitch export folders are kept under `docs/reference/`. The deployable app lives in `src/` and is rendered as a single-page app with shared screen templates and components.

## Stack

- Vite
- React
- TypeScript
- Tailwind CDN utility classes in the prototype shell
- Material Symbols icons

## Routes

- `/`, `/splash`
- `/onboarding/problem`
- `/onboarding/solution`
- `/onboarding/how-it-works`
- `/onboarding/social-proof`
- `/auth`
- `/sign-in`
- `/sign-up/basic-info`
- `/sign-up/location`
- `/sign-up/sports`
- `/sign-up/goal`
- `/sign-up/permissions`
- `/welcome`
- `/home`
- `/discover`
- `/training`
- `/favorites`
- `/profile`
- `/studio/zen-studio-kadikoy`
- `/studio/zen-studio-kadikoy/slots`
- `/booking/summary`
- `/booking/confirmed`
- `/reservations`
- `/qr-entry`
- `/filter`

## Local Preview

```sh
npm install
npm run dev
```

Then open `http://127.0.0.1:5173`.

With Make:

```sh
make install
make dev
```

## Build

```sh
npm run build
```

The production output is generated in `dist/`.

With Make:

```sh
make build
```

## Useful Make Targets

- `make install`: install npm dependencies.
- `make dev`: start the Vite dev server on port `5173`.
- `make build`: run TypeScript and Vite production build.
- `make preview`: serve the production build on port `4173`.
- `make route-check`: verify all demo routes against `APP_URL`, defaulting to `http://127.0.0.1:5173`.
- `make clean`: remove generated build/cache outputs.

## Deploy

Push the repository to GitHub and import it in Vercel. Vercel should auto-detect Vite.

- Build command: `npm run build`
- Output directory: `dist`

`vercel.json` rewrites all paths to `index.html`, so deep links like `/studio/zen-studio-kadikoy/slots` work after deployment.

## Component Structure

```text
src/
  app/
    App.tsx             # history state and route rendering
    routeRegistry.tsx   # route-to-screen registry
  features/
    auth/
    booking/
    onboarding/
    signup/
    splash/
    tabs/
  shared/
    data/               # demo content and remote image URLs
    lib/                # routes and navigation types
    ui/                 # reusable app shell, buttons, cards, nav, headers
```

## Reference Material

- `docs/reference/stitch-exports/`: original Google Stitch exports (`code.html` + `screen.png`).
- `docs/reference/design/`: design guideline documents.
- `docs/legacy-static/generated-routes/`: previous static HTML prototype output, kept only for comparison.
- `docs/legacy-static/tools/`: static HTML generation script from the earlier prototype pass.
