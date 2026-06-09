# Angry Pixel Engine

**Angry Pixel** is a **2D game engine** in **TypeScript** built around **Entity–Component–System (ECS)**. Prefer extending the engine via **components** and **systems** rather than ad-hoc globals.

## Monorepo layout

| Area                 | Path                   | Role                                                                                                                 |
| -------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Library source       | `packages/`            | Private workspaces `@angry-pixel/*` — engine core lives here                                                         |
| Published npm bundle | `bundles/angry-pixel/` | Build output for the public package **`angry-pixel`** (versioned here)                                               |
| Documentation        | `docs/`                | Plain `.md` files parsed by the website (`en/`, later `es/`). Old MkDocs docs kept in `docs-old/` for reference only |
| Demo games           | `demos/`               | Integration testbed and example usage                                                                                |

## Packages (`packages/`)

Workspaces compose the engine; **`@angry-pixel/engine`** references **`ecs`**, **`math`**, **`collisions`**, **`webgl`**, **`ioc`**.

-   **`ecs`** — entity manager, components, systems.
-   **`engine`** — game loop, scenes, built-in components/systems, rendering pipeline; uses path aliases like `@component/*`, `@system/*`, `@manager/*` (see `packages/engine/tsconfig.json`).

Change engine behavior in **`packages/`**; the bundle in **`bundles/angry-pixel/`** is the packaged artifact, not the primary edit surface.

## Common commands (repo root)

-   `yarn build` — builds `@angry-pixel/engine` (tsc project refs + Rollup).
-   `yarn demo:dev` — runs **`demos/dev`** via vite dev server.

## Docs and API

User-facing docs live in **`docs/`** as plain `.md` files (no MkDocs) parsed by the website. API reference is generated (`yarn api-docs` uses TypeDoc from the engine package).

Two language trees, `docs/en/` and `docs/es/`, with identical structure. Each language has a `nav.json` defining its menu (array of `{ title, file }`, optionally nested via `children`); add every new page there. Paths in `nav.json` are relative to the language root (e.g. `manual/getting-started.md`).

```
docs/<lang>/
  nav.json
  welcome/      # introduction, architecture
  manual/       # getting-started, building-the-game, the managers, physics, rendering, audio,
                # built-in-components/ (index + one page per component), maths/, best-practices
  tutorial/     # index only (under construction)
  api-docs/     # index only (under construction)
```

Four top-level categories: **Welcome**, **Manual**, **Tutorial**, **Api Docs**. The English Manual + Welcome are complete; `docs/es/` mirrors them. When adding/editing a page, update both languages and both `nav.json` files.

### Docs writing style

-   **Concise and factual.** State what the engine _is_ and _does_ (ECS, Scenes, etc.). Lead with concrete facts.
-   **No filler / marketing fluff.** Avoid subjective benefit claims like "designed to simplify game development" or "flexible and highly modular structure" — these depend on the developer, not the engine.
-   **Nothing invented.** Only describe behavior backed by the engine's code or existing docs. Verify the public API against `packages/` and existing usage in **`demos/`** before writing.
-   **Code examples in TypeScript.** All code examples in the new docs are written in TypeScript.
-   **Spanish manager names stay in English.** In `docs/es/`, keep engine manager names in English with the Spanish article (e.g. "El gestor de entidades" → "El Entity Manager"); "La clase Game" stays. Code identifiers, file paths, and links are never translated.

When unsure of a public API or pattern, check the source in **`packages/`** and existing usage in **`demos/`** before inventing new patterns.
