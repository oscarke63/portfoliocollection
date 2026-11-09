# Northlight Studio — Creative Agency Portfolio

## Project Report

A single-page application (SPA) built with React 19 and Vite that showcases a creative agency's work, with a built-in content studio for dynamic project management.

---

## Task 1: Define the Problem

### 1.1 Background

Creative agencies and independent studios depend on their portfolio as their primary sales tool. Prospective clients and collaborators judge a studio almost entirely on the work they can see and how easily they can explore it. Yet many small studios manage their web presence through static, hand-coded pages or rigid site builders that make updating a portfolio slow, error-prone, and dependent on a developer.

### 1.2 Problem Statement

A creative agency needs a modern, responsive web presence that showcases its completed projects and lets the team **dynamically add and update work as new projects are completed — without editing code or redeploying the site.** Visitors must be able to navigate projects effortlessly, search and filter the body of work, and learn each project's details through clear, well-structured case studies.

### 1.3 Core Problems to Solve

1. **Static content is a maintenance burden.** A hard-coded portfolio requires a developer to edit source, rebuild, and redeploy for every new project.
2. **Poor discoverability of work.** As a portfolio grows, a flat list becomes hard to navigate; visitors need search and category filtering.
3. **Insufficient project detail.** A thumbnail and title don't communicate value; clients need client, services, outcomes, and story.
4. **Inconsistent experience across devices.** Clients browse on phones, tablets, and desktops.
5. **No clear path to conversion.** A showcase must guide interested visitors toward contact.

### 1.4 Objectives

- Build a **single-page application (SPA)** presenting the agency's work as the centerpiece of the landing page.
- Provide a **content management layer** (a "Studio") letting non-technical users create, edit, publish, reorder, and delete projects, with changes reflected immediately and persisted across sessions.
- Implement **search and category filtering** across all relevant project fields.
- Deliver **detailed project pages** with structured case-study content.
- Ensure a **fully responsive, accessible** experience from small phones to large desktops.
- Provide a **clear conversion path** via a validated contact form.

### 1.5 Scope

**In scope:** public site (landing showcase, project list, project detail, about, tools & resources, contact); content studio (project CRUD, publish/feature toggles, reordering, agency settings, JSON import/export); client-side persistence (`localStorage`); responsive design and dark/light theming.

**Out of scope (this iteration):** server-side database and multi-user auth; real image uploads; a live backend for the contact form; payment, analytics, or CMS integrations.

### 1.6 Target Users

- **Prospective clients** — evaluating the studio's work and credibility.
- **Collaborators / partners** — assessing fit and past work.
- **Studio staff (editors)** — non-technical users who add and update projects without touching code.

### 1.7 Success Criteria

- A new project can be added through the UI and appears on the public site **without any code change or redeploy**.
- Visitors can find a specific project via search or category filter in a few interactions.
- Every project has a complete, readable detail page.
- The site is usable and legible from 360px to desktop width.
- The contact form validates input and confirms submission.

---

## Task 2: Determine the Design

### 2.1 Design Approach

The application is a **single-page application (SPA)** using React 19 and Vite. The guiding principle is **separation of content from presentation**: the public site and the content studio both read from a single shared content store, so any change an editor makes is reflected everywhere instantly. The stack is deliberately dependency-light (no CSS framework, no routing library) to keep the codebase small and maintainable.

### 2.2 System Architecture

```
┌─────────────────────────────────────────────┐
│  Presentation (pages + components)           │
├─────────────────────────────────────────────┤
│  Shared UI (Navbar, Footer, ProjectList, …)  │
├─────────────────────────────────────────────┤
│  State (ContentProvider, ThemeProvider)      │
├─────────────────────────────────────────────┤
│  Hooks & Utils (useHashRoute, useReveal, …)  │
├─────────────────────────────────────────────┤
│  Data (seed content) + localStorage          │
└─────────────────────────────────────────────┘
```

**Key decisions:**

- **Single content store.** `ContentProvider` holds all agency and project data and exposes CRUD actions; both the public site and the Studio consume it via `useContent()`.
- **Client-side persistence.** Content is serialized to `localStorage` on every change and rehydrated on load.
- **Hash-based routing.** A custom `useHashRoute` hook provides deep-linkable routes and query-param support without React Router.
- **Reusable list component.** `ProjectList` encapsulates filtering, search, and rendering, shared by the landing page and the projects route.

### 2.3 Data Model

**Agency** (single object): `name`, `initials`, `tagline`, `intro`, `about`, `email`, `phone`, `location`, `availability`, `founded`, `socials[]`, `services[]`, `team[]`, `stats[]`, `toolGroups[]`, `resources[]`.

**Project** (array): `id`, `title`, `client`, `tagline`, `description`, `category`, `year`, `services[]`, `cover`, `featured`, `published`, `links{live, caseStudy}`, `highlights[]`.

A `normalizeProject()` function fills in missing fields on every write, so the UI never guards against `undefined`.

### 2.4 Component Design

**Pages:** `Home`, `Projects`, `ProjectDetail`, `About`, `Resources`, `Contact`, `AddProject`, `Studio`, `NotFound`.

**Shared components:** `Layout`, `Navbar`, `Footer`, `ProjectList`, `ProjectCard`, `Reveal`, `SectionHeading`, `ReadingProgress`, `BackToTop`.

**Studio components:** `Studio` (shell + tabs), `ProjectEditor`, `AgencyEditor`.

### 2.5 Routing Design

| Route | Page |
| --- | --- |
| `/#/` | Home — hero + project showcase |
| `/#/projects` | Full project list |
| `/#/projects/:id` | Project detail |
| `/#/about` | Studio / about |
| `/#/resources` | Tools & Resources |
| `/#/contact` | Contact |
| `/#/add` | Add a project |
| `/#/studio` | Content studio (admin) |

Filter/search state lives in the URL query (`?category=…&q=…`), making views shareable and preserving state across navigation.

### 2.6 State Management Design

- **`ContentProvider`** — single source of truth; exposes CRUD actions; persists to `localStorage`.
- **`ThemeProvider`** — light/dark theme, persisted and initialized from system preference.
- **Local component state** — transient UI (form drafts, menu open/closed, debounced input).

### 2.7 UI / UX Design

- **Landing page leads with the work** — compact hero followed immediately by the project showcase.
- **Design system** — token-based CSS with light/dark themes via custom properties.
- **Discoverability** — category chips, debounced live search, match highlighting, clear empty state.
- **Effortless navigation** — breadcrumbs, prev/next project links, related work, reading-progress bar, back-to-top.
- **Responsive** — breakpoints at 1024/900/768/720/480/360px; fluid typography; touch-friendly targets.
- **Accessibility** — semantic landmarks, ARIA labels, keyboard shortcuts (`/`, `Ctrl/Cmd+K`), visible focus, `prefers-reduced-motion`.

### 2.8 Technology Choices

| Concern | Choice | Rationale |
| --- | --- | --- |
| UI library | React 19 | Component model, hooks, ecosystem |
| Build tool | Vite | Fast dev server, optimized builds |
| Styling | Plain CSS + tokens | No framework overhead; full control |
| Routing | Custom hash router | Zero dependencies, deep-linkable |
| State | React Context + hooks | Sufficient for app scale |
| Persistence | `localStorage` | No backend required |
| Testing | Jest + React Testing Library | Standard, behavior-focused |

### 2.9 Design Trade-offs

- **`localStorage` over a database** — dynamic editing with no backend, but content is per-browser.
- **Hash routing over React Router** — small bundle, trivial deployment, less ecosystem tooling.
- **Color-block covers over image uploads** — avoids file storage while keeping the design cohesive.

---

## Task 3: Develop the Code

### 3.1 Project Structure

```
src/
├── App.jsx                 # route table
├── main.jsx                # entry + providers
├── index.css               # design system + all styles
├── components/             # Navbar, Footer, ProjectCard, ProjectList, Reveal, …
├── context/                # theme context
├── hooks/                  # useHashRoute, useReveal, useDebouncedValue, useScrollProgress
├── pages/                  # Home, Projects, ProjectDetail, About, Resources, Contact, AddProject
│   └── studio/             # Studio shell + ProjectEditor + AgencyEditor
├── store/                  # ContentProvider (context) + seed data
└── utils/                  # highlight helper
```

### 3.2 The Content Store (dynamic updates)

`ContentProvider` holds all content in state, persists to `localStorage` on every change, and exposes CRUD actions. New projects are prepended so they appear first.

```jsx
export function ContentProvider({ children }) {
  const [content, setContent] = useState(loadContent)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    } catch { /* keep working in memory */ }
  }, [content])

  const addProject = useCallback((draft) => {
    setContent((c) => {
      const id = uniqueId(draft.title || 'untitled', c.projects)
      const project = normalizeProject({ ...draft, id })
      return { ...c, projects: [project, ...c.projects] }
    })
  }, [])
}
```

### 3.3 Routing

```js
export function useHashRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash))
  useEffect(() => {
    const onHashChange = () => {
      setRoute(parse(window.location.hash))
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  return route
}
```

### 3.4 Search & Filtering

`ProjectList` filters published projects by category and a debounced search term, and highlights matches.

```jsx
const filtered = useMemo(() => {
  const q = urlSearch.trim().toLowerCase()
  return published.filter((p) => {
    const matchesCategory = active === 'All' || p.category === active
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.services.some((s) => s.toLowerCase().includes(q)) ||
      p.highlights.some((h) => h.toLowerCase().includes(q))
    return matchesCategory && matchesQuery
  })
}, [published, active, urlSearch])
```

### 3.5 The Add-Project Form

The public `/add` route reuses the same `ProjectEditor` form as the Studio.

```jsx
const handleSave = (draft) => {
  addProject({ ...draft, published: true })
  setCreated(draft.title)
  window.setTimeout(() => navigate('/projects'), 900)
}
```

### 3.6 The Content Studio (admin)

`Studio.jsx` provides a tabbed admin panel: **Projects** (list with reorder/publish/feature/duplicate/delete + edit), **Agency** (settings form), and **Data** (JSON export/import/reset).

### 3.7 Responsive Design

Token-based CSS with light/dark themes; breakpoints at 1024/900/768/720/480/360px; fluid typography; collapsing grid; mobile hamburger; horizontal-scroll guards; touch-friendly targets.

### 3.8 Testing

Jest + React Testing Library — 24 tests across 4 suites covering utilities, hooks, the store, and the project list.

### 3.9 Build & Quality Gates

| Command | Result |
| --- | --- |
| `npm run lint` | Clean |
| `npm test` | 24/24 passing |
| `npm run build` | Succeeds (~82 KB gzipped JS) |

---

## Task 4: Test and Debug

### 4.1 Testing Strategy

Behavior-focused testing with **Jest** and **React Testing Library**, targeting the highest-value logic.

| Layer | What is tested | Tool |
| --- | --- | --- |
| Pure utilities | Match splitting, regex escaping | Jest |
| Hooks | Debounce timing | Jest + fake timers |
| State store | CRUD, persistence, import/export | RTL `renderHook` |
| Components | Filtering, search, empty state, highlighting | RTL + `user-event` |

### 4.2 Test Coverage

**24 tests across 4 suites — all passing.**

| Suite | Tests | Focus |
| --- | --- | --- |
| `utils/highlight.test.js` | 5 | Match splitting, case-insensitivity, regex-special chars |
| `hooks/useDebouncedValue.test.js` | 3 | Initial value, delay, timer reset |
| `store/ContentContext.test.jsx` | 10 | Seed boot, CRUD, unique IDs, persistence, import/export |
| `components/ProjectList.test.jsx` | 6 | Published-only, count, filter, search, empty state, highlight |

### 4.3 Bugs Found and Fixed

1. **Async state read in add-project flow** — read `projects[0]` before state committed; fixed by using the submitted draft title.
2. **Search fired a URL update per keystroke** — fixed with `useDebouncedValue` (200ms).
3. **`setState` inside `useEffect`** — refactored navbar to derive menu state from path; lazy-initialized reveal hook.
4. **Fast-refresh lint errors** — split hooks/helpers into separate modules.
5. **Project grid overflowed on phones** — added responsive breakpoints + overflow guards.
6. **Search tests failed against real data flow** — rewrote tests to drive through a router harness.

### 4.4 Final Quality Gates

| Gate | Command | Result |
| --- | --- | --- |
| Linting | `npm run lint` | Clean |
| Tests | `npm test` | 24/24 passing |
| Build | `npm run build` | Succeeds |

### 4.5 Known Limitations

- Content is per-browser (`localStorage`), not shared across users/devices.
- Contact form submission is simulated.
- Projects use color-block covers, not uploaded images.
- No end-to-end (browser) tests yet.

---

## Task 5: Document and Maintain

### 5.1 Documentation Strategy

| Audience | Where | What they find |
| --- | --- | --- |
| New developers | `README.md` | Setup, scripts, routes, structure, deployment |
| Content editors | README + Studio UI | How to add/update projects without code |
| Maintainers | Inline comments + this report | Design rationale, data model, limitations |

### 5.2 The README

Covers overview, features, tech stack, getting started (prerequisites + all scripts), routes, deployment, troubleshooting, project structure, editing content, and license.

### 5.3 Inline Documentation

Module-level JSDoc on hooks and utilities; comments on non-obvious logic; self-documenting naming.

### 5.4 Version Control

Maintained in its own Git repository with descriptive, atomic commits and a clean `.gitignore` (only source tracked).

### 5.5 Maintenance Practices

- **Quality gates on every change:** `lint` → `test` → `build`.
- **Dependency updates:** `npm outdated` / `npm update`, tested against the suite.
- **Content backup:** Studio Data → Export/Import (JSON).
- **Extensibility:** add pages in `pages/` + a route; extend `normalizeProject()` for new fields.

### 5.6 Roadmap

| Priority | Enhancement |
| --- | --- |
| High | Server-backed content store (API + database) |
| High | Real contact-form endpoint |
| Medium | Image uploads for covers |
| Medium | End-to-end tests (Playwright) |
| Low | Migrate to React Router |
| Low | Per-project SEO/meta |

### 5.7 Handover Checklist

- [x] README documents setup, scripts, routes, deployment, troubleshooting.
- [x] All npm scripts verified working.
- [x] Test suite in place (24 passing).
- [x] Git history clean with descriptive commits.
- [x] Known limitations documented.
- [x] Roadmap defined.

---

## Appendix: Running the Project

```bash
npm install       # install dependencies
npm run dev       # dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run lint      # lint
npm test          # run tests
```
