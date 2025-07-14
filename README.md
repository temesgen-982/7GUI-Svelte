# Svelte Feature Showcase

A SvelteKit project demonstrating various interactive UI components and features, styled with Tailwind CSS.

This project implements the [7GUIs](https://eugenkiss.github.io/7guis/) benchmark tasks, a set of classic GUI programming challenges. See the 7GUIs website for more information about these tasks.

## Features

- **Counter**: Simple increment button.
- **Temperature Converter**: Convert between Celsius and Fahrenheit.
- **Flight Booker**: Book one-way or return flights with date selection.
- **Timer**: Adjustable timer with progress bar.
- **CRUD**: Basic Create, Read, Update, Delete operations for a list of persons.
- **Circle Drawer**: Draw, select, and resize circles on an SVG canvas.
- **Cells**: (Not implemented yet)
- **Comments**: View a post and add comments (demo, not persistent; _not part of the 7GUIs challenges_).

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) (v2)
- [Svelte 5](https://svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) for code quality

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

- `src/routes/` — Each subfolder is a feature route (e.g., `/Counter`, `/CRUD`, `/CircleDrawer`, etc.)
- `src/app.css` — Tailwind CSS and typography plugin
- `src/lib/` — Shared library code (if any)
- `static/` — Static assets

---

Built by [@temesgen-982](https://github.com/temesgen-982)
