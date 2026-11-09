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

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview

# lint
npm run lint

# run tests
npm test

# run tests in watch mode
npm run test:watch

# run tests with coverage
npm run test:coverage
```

The app runs at `http://localhost:5173` by default.

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

## License

MIT
