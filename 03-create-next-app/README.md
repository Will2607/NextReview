# create-next-app

## Overview

`create-next-app` is the official CLI for creating a new Next.js application. It automates the initial project setup and installs the required dependencies so you can start from a working project instead of wiring every file by hand.

You can use it interactively (answering prompts) or through command-line options (flags).

## Why create-next-app Exists

Manually creating a framework project would require developers to configure several files and dependencies: package metadata, scripts, TypeScript settings, linting, framework defaults, and more.

`create-next-app` provides a standardized starting point. Conceptual benefits include:

- faster project initialization;
- consistent configuration;
- dependency installation;
- development scripts;
- framework defaults aligned with current Next.js recommendations.

This lesson focuses on initializing a project—not on advanced Next.js architecture.

## Basic Command

```bash
npx create-next-app@latest
```

Conceptually:

- `npx` executes the package without requiring a global install first;
- `create-next-app` is the CLI that generates the project;
- `@latest` requests the current published version of the CLI.

## Project Name

A project name can be supplied directly:

```bash
npx create-next-app@latest my-app
```

The CLI creates a project directory using that name (for example, `my-app/`) and places the generated files inside it.

## Interactive Setup

When run without enough flags, `create-next-app` can ask configuration questions. Current versions may present options such as:

- recommended defaults;
- TypeScript;
- linter;
- React Compiler;
- Tailwind CSS;
- `src/` directory;
- App Router;
- import alias.

These technologies are only *configured* at generation time. This lesson does not teach them. They are studied separately where the roadmap covers them.

## Recommended Defaults

`create-next-app` provides recommended defaults. Current recommended defaults may include technologies such as:

- TypeScript;
- ESLint;
- Tailwind CSS;
- App Router;
- Turbopack.

Those individual technologies will be studied separately where appropriate. For this lesson’s demo, some defaults were overridden (for example, Tailwind CSS was disabled) to keep the generated app minimal.

## Interactive vs Flags

The CLI can either:

- ask questions interactively; or
- receive options as command-line flags.

Introductory flag examples:

```bash
npx create-next-app@latest my-app --typescript
npx create-next-app@latest my-app --javascript
npx create-next-app@latest my-app --yes
```

CLI options can change over time. Consult the current official documentation for the complete list.

## The --yes Option

`--yes` skips interactive prompts and uses saved preferences or default configuration for options you did not explicitly provide. Combining `--yes` with specific flags is a common way to create a reproducible project setup.

## Generated Project

`create-next-app` creates a complete project directory. Generated content typically falls into categories such as:

- `package.json` (project metadata, dependencies, scripts);
- source directories (application code);
- configuration files (Next.js, TypeScript, ESLint, and related tooling);
- public assets (static files served as-is);
- dependency metadata (`package-lock.json` and `node_modules` after install).

This lesson does not explain individual routing files in depth. The generated app is a starting point to inspect, not a routing tutorial.

## package.json

`package.json` describes the project, its dependencies, and its scripts. It is the npm entry point for day-to-day commands.

Commonly generated scripts include:

- `dev` — start the development server;
- `build` — create a production build;
- `start` — run the production server for a previous build;
- `lint` — run the configured linter, when ESLint (or another linter) was selected.

## Development Script

```bash
npm run dev
```

This starts the Next.js development server so you can work on the app locally with fast feedback. Turbopack may be involved in current Next.js versions; its internals are out of scope for this lesson.

## Production Build

```bash
npm run build
```

This creates a production build and also acts as an important validation step: TypeScript checks, compilation, and build-time preparation must succeed. Deployment is not covered here.

## Production Server

```bash
npm run start
```

This starts a previously built production application. A production build must exist first (`npm run build`). This is not a deployment infrastructure lesson—only the local production start script.

## Inspecting the Generated Project

Before modifying a new project, inspect what the generator created:

- `package.json` — name, dependencies, scripts;
- scripts — how you run development, build, start, and lint;
- dependencies — Next.js, React, and tooling packages;
- configuration files — Next.js, TypeScript, ESLint;
- source directory — application entry files created by the template;
- `public/` — static assets.

Do not assume every file must be rewritten immediately. Understanding the starting point comes first.

## create-next-app Is a Generator

`create-next-app` is primarily used to initialize the project. After generation, developers normally work with the generated Next.js application rather than repeatedly running `create-next-app` inside the same project.

## Generated Structure (demo-app)

This lesson includes a real app generated with `create-next-app` at `03-create-next-app/demo-app/`.

Configuration used for this demo:

- TypeScript: Yes
- Linter: ESLint
- React Compiler: No
- Tailwind CSS: No
- `src/` directory: No
- App Router: Yes (CLI structure only; not taught here)
- Customize import alias: No (default `@/*`)

Simplified tree of generated project files (excluding `node_modules/` and `.next/`):

```text
demo-app/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.module.css
│   └── page.tsx
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

`node_modules/` is created when dependencies are installed. `.next/` appears after development or build commands run.

## Key Takeaways

1. `create-next-app` is the official CLI for creating a Next.js application.
2. It exists to standardize and speed up project initialization.
3. You invoke it with `npx create-next-app@latest`.
4. Setup can be interactive or driven by command-line flags.
5. It creates and configures a Next.js project directory.
6. It installs project dependencies.
7. The resulting application includes development and production scripts.
8. `npm run dev` starts development.
9. `npm run build` creates a production build (and validates the project).
10. The generated project is only the starting point for later Next.js topics.

## Commands

### Create

From `03-create-next-app/`:

```bash
npx create-next-app@latest demo-app --typescript --eslint --no-tailwind --no-src-dir --app --no-react-compiler --use-npm --import-alias "@/*" --disable-git --yes
```

### Development

```bash
cd demo-app
npm run dev
```

### Validate

```bash
npm run build
```

### Production

```bash
npm run start
```

### Lint

```bash
npm run lint
```
