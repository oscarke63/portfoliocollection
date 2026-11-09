# Northlight Studio — Creative Agency Portfolio

A modern, responsive single-page application (SPA) that showcases a creative agency's work. Built with React and Vite, it pairs a polished public site with a built-in content studio so the portfolio can be updated dynamically — no code changes required.

## Features

- **Landing page with a project showcase** — a compact hero followed by the full project grid, front and center.
- **Dynamic project management** — add, edit, duplicate, reorder, publish, and delete projects from the Studio. New projects appear on the site instantly.
- **Search & filtering** — live, debounced search across titles, clients, taglines, descriptions, services, and highlights, plus category filter chips. Filter state is persisted in the URL and shareable.
- **Project detail pages** — case studies with overview, highlights, services, related work, and previous/next navigation.
- **Tools & Resources page** — the studio's toolkit and free downloadable resources.
- **Contact form** — validated, accessible, with success state.
- **Dark / light theme** — persisted to localStorage, respects system preference.
- **Fully responsive** — breakpoints from desktop down to small phones, with touch-friendly targets.
- **Content persistence** — all content is stored in the browser (localStorage) with JSON import/export and reset.

## Tech Stack

- **React 19** — component-driven UI
- **Vite** — dev server and build tool
- **Plain CSS** — a token-based design system (no CSS framework)
- **Hash-based routing** — dependency-free SPA routing with query-param support
- **Jest + React Testing Library** — unit and component tests

## Getting Started

### Prerequisites

- **Node.js 18+** (Node 20 LTS recommended) — check with `node -v`
- **npm 9+** — ships with Node; check with `npm -v`

### Install & run

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# build for production (outputs to dist/)
npm run build

# preview the production build locally
npm run preview

# lint the codebase
npm run lint

# run the test suite
npm test

# run tests in watch mode
npm run test:watch

# run tests with coverage
npm run test:coverage
```

The dev server runs at `http://localhost:5173` by default. Vite will pick the next free port if 5173 is taken.

## Routes

| Path | Page |
| --- | --- |
| `/#/` | Landing page — hero + project showcase |
| `/#/projects` | Full project list (filter + search) |
| `/#/projects/:id` | Project detail / case study |
| `/#/about` | Studio / about |
| `/#/resources` | Tools & Resources |
| `/#/contact` | Contact form |
| `/#/add` | Add a new project |
| `/#/studio` | Content studio (admin) |

Filter and search state is stored in the URL query, e.g. `/#/projects?category=Brand%20Identity&q=lumen`.

## Deployment

The build is a static site — deploy the `dist/` folder to any static host.

- **Netlify / Vercel:** set build command `npm run build`, publish directory `dist`.
- **GitHub Pages:** run `npm run build`, then publish `dist/`. Because routing is hash-based, no server rewrite rules are needed.

## Troubleshooting

- **Port in use:** Vite auto-increments the port; check the terminal output for the actual URL.
- **Blank page after deploy:** confirm you deployed the `dist/` folder (not the project root) and that the base path matches your host.
- **Content looks reset:** content is stored in `localStorage` per browser. Use the Studio's **Data → Import** to restore an exported JSON backup.
- **Tests fail on `matchMedia`/`scrollTo`:** these are shimmed in `src/test/setup.js`; ensure that file is referenced in `jest.config.js`.

## Project Structure

```
src/
├── App.jsx                 # route table
├── main.jsx                # app entry + providers
├── index.css               # design system + all styles
├── components/             # shared UI (Navbar, Footer, ProjectCard, ProjectList, …)
├── context/                # theme context
├── hooks/                  # useHashRoute, useReveal, useDebouncedValue, useScrollProgress
├── pages/                  # Home, Projects, ProjectDetail, About, Resources, Contact, AddProject
│   └── studio/             # content studio (admin) + editors
├── store/                  # content store (context + seed data)
└── utils/                  # helpers (search highlighting)
```

## Editing Content

Open the **Studio** from the navbar (`/#/studio`) to manage projects and agency settings, or use the **+ Add project** button on the landing page. All changes persist in the browser and can be exported/imported as JSON from the Studio's Data tab.

## State Management

The app uses a clear three-tier state model:

1. **Global shared state** — `ContentProvider` (`src/store/`) is the single source of truth for all content (agency + projects). It exposes a memoized, immutable action surface (`addProject`, `updateProject`, `deleteProject`, …) consumed via the `useContent()` hook. `ThemeProvider` manages light/dark theme.
2. **URL state** — `useHashRoute` / `setQuery` keep the route, category filter, and search term in the URL, so views are shareable and survive back/forward.
3. **Local component state** — transient UI (form drafts, menu open/closed, debounced input) lives in the component that owns it via `useState`.

Shared data flows down through context; transient state stays local. No prop-drilling.

## License

MIT
