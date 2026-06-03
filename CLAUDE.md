# Angry Pixel Engine

**Angry Pixel** is a **2D game engine** in **TypeScript** built around **Entity–Component–System (ECS)**. Prefer extending the engine via **components** and **systems** rather than ad-hoc globals.

## Monorepo layout

| Area | Path | Role |
|------|------|------|
| Library source | `packages/` | Private workspaces `@angry-pixel/*` — engine core lives here |
| Published npm bundle | `bundles/angry-pixel/` | Build output for the public package **`angry-pixel`** (versioned here) |
| Documentation | `docs/` | Plain `.md` files parsed by the website (`en/`, later `es/`). Old MkDocs docs kept in `docs-old/` for reference only |
| Demo game | `demos/platformer/` | Integration testbed and example usage |

## Packages (`packages/`)

Workspaces compose the engine; **`@angry-pixel/engine`** references **`ecs`**, **`math`**, **`collisions`**, **`webgl`**, **`ioc`**.

- **`ecs`** — entity manager, components, systems.
- **`engine`** — game loop, scenes, built-in components/systems, rendering pipeline; uses path aliases like `@component/*`, `@system/*`, `@manager/*` (see `packages/engine/tsconfig.json`).

Change engine behavior in **`packages/`**; the bundle in **`bundles/angry-pixel/`** is the packaged artifact, not the primary edit surface.

## Common commands (repo root)

- `yarn build` — builds `@angry-pixel/engine` (tsc project refs + Rollup).
- `yarn demo:start` — runs **`demos/platformer`** via webpack dev server.
- `yarn docs` — builds the old MkDocs site (now in `docs-old/`; requires Python + mkdocs). The new `docs/` is consumed directly by the website.

## Docs and API

User-facing docs live in **`docs/`** as plain `.md` files (no MkDocs) parsed by the website. The previous MkDocs docs are preserved in **`docs-old/`** as reference only — don't edit them. API reference is generated (`yarn api-docs` uses TypeDoc from the engine package).

Docs layout (English first, Spanish `es/` mirrors later):

```
docs/en/
  manual/      # e.g. welcome/{introduction,architecture,getting-started}.md
  tutorial/
  api-docs/
```

Three top-level categories: **Manual**, **Tutorial**, **Api Docs**. Pages are written one at a time, English first; Spanish translation comes after.

### Docs writing style

- **Concise and factual.** State what the engine *is* and *does* (ECS, Scenes, etc.). Lead with concrete facts.
- **No filler / marketing fluff.** Avoid subjective benefit claims like "designed to simplify game development" or "flexible and highly modular structure" — these depend on the developer, not the engine.
- **Nothing invented.** Only describe behavior backed by the engine's code or existing docs. Verify the public API against `packages/` and existing usage in **`demos/platformer/`** before writing.
- **Code examples in TypeScript.** All code examples in the new docs are written in TypeScript.

When unsure of a public API or pattern, check **`docs-old/`**, the source in **`packages/`**, and existing usage in **`demos/platformer/`** before inventing new patterns.
