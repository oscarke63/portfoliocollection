# My Portfolio

A simple React project that shows a list of projects. You can search the list and add new projects with a form.

This is a beginner-friendly project built with React and Vite.

## Features

- Shows a list of projects
- Search projects by title
- Add a new project with a form

## Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build
```

The app runs at `http://localhost:5173`.

## Project Structure

```
src/
├── App.jsx              # main component, holds all the state
├── App.css              # styles
├── main.jsx             # entry point
├── projects.js          # the starting list of projects
└── components/
    ├── ProjectCard.jsx  # shows one project
    └── ProjectForm.jsx  # form to add a project
```

## How It Works

- `App.jsx` keeps the list of projects in state with `useState`.
- The search box filters the list as you type.
- The "Add Project" button shows a form. When you submit the form, the new project is added to the list.
- `ProjectCard` receives a `project` prop and displays it.
- `ProjectForm` receives an `onAdd` prop (a function) and calls it when the form is submitted.
