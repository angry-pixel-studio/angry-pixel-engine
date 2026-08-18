# Getting Started

> **Note:** The **Tutorial** section walks you through building a game from scratch, step by step. The **Manual** is a reference: each page explains a key part of the engine, with examples. If you are new to Angry Pixel, start with the Tutorial; use the Manual to look things up.

> **Prerequisites:**
>
> - Familiarity with the terminal / command line.
> - Familiarity with JavaScript or TypeScript.
> - [Node.js](https://nodejs.org/) version 20 or higher installed.

## Installation

There are three ways to start a project: scaffold a new project from the official skeleton template, install the engine manually into your own project, or load the builds directly from the CDN.

### Official skeleton template

The [official skeleton](https://github.com/angry-pixel-studio/angry-pixel-skeleton) provides a preconfigured project structure ready to use. It is a monorepo (npm workspaces) where the game lives in a single codebase and is built for web, desktop, and mobile from there. It ships built-in commands to export to each platform — for example `npm run build` (web), `npm run build:desktop` (desktop via Electron), and `npm run build:android` (Android). See the skeleton's `README.md` for the full list of commands and details.

Scaffold a new project from it and install its dependencies:

```bash
npx degit angry-pixel-studio/angry-pixel-skeleton my-game
cd my-game
npm install
```

### Manual installation

Recommended for existing projects, or for experienced developers who want to set up their own project from scratch. Install the engine from npm:

```bash
npm install angry-pixel
```

The engine ships its own type definitions, so no additional packages are required for TypeScript.

> **Note:** We recommend setting up your project with a bundler such as [Vite](https://vite.dev/), which provides a development server with hot reloading and a production build.

### Using the engine from a CDN

The engine builds are also published to `https://cdn.angrypixel.gg/engine/`, so they can be loaded directly by the browser without installing anything or setting up a build step.

Every release is published under its version number, and `latest` points to the most recent stable release:

```
https://cdn.angrypixel.gg/engine/latest/index.js
https://cdn.angrypixel.gg/engine/2.3.5/index.js
```

| File | Format | Loaded with |
| ---- | ------ | ----------- |
| `index.js` | UMD | `<script src="...">` |
| `index.esm.js` | ES module | `<script type="module">` |

> **Note:** Pin a specific version in anything you publish. The contents of `latest` change with every release.

#### Classic script

The UMD build exposes the engine as the global `angry-pixel`. Because the name contains a hyphen it is accessed with bracket notation:

```html
<div id="app"></div>

<script src="https://cdn.angrypixel.gg/engine/latest/index.js"></script>
<script>
    const { Game, Scene, Transform, Camera, MaskRenderer, MaskShape } = window["angry-pixel"];

    class MainScene extends Scene {
        createEntities() {
            // camera
            this.entityManager.createEntity([new Transform(), new Camera()]);

            // a square in the center of the screen
            this.entityManager.createEntity([
                new Transform(),
                new MaskRenderer({
                    shape: MaskShape.Rectangle,
                    width: 128,
                    height: 128,
                    color: "#D9008F",
                }),
            ]);
        }
    }

    const game = new Game({
        containerNode: document.getElementById("app"),
        width: 800,
        height: 600,
        canvasColor: "#00D9D9",
    });

    game.addScene(MainScene, "MainScene", true);
    game.start();
</script>
```

#### ES module

The ESM build is imported by URL inside a module script. No global is created:

```html
<div id="app"></div>

<script type="module">
    import { Game, Scene, Transform, Camera, MaskRenderer, MaskShape } from "https://cdn.angrypixel.gg/engine/latest/index.esm.js";

    class MainScene extends Scene {
        createEntities() {
            // camera
            this.entityManager.createEntity([new Transform(), new Camera()]);

            // a square in the center of the screen
            this.entityManager.createEntity([
                new Transform(),
                new MaskRenderer({
                    shape: MaskShape.Rectangle,
                    width: 128,
                    height: 128,
                    color: "#D9008F",
                }),
            ]);
        }
    }

    const game = new Game({
        containerNode: document.getElementById("app"),
        width: 800,
        height: 600,
        canvasColor: "#00D9D9",
    });

    game.addScene(MainScene, "MainScene", true);
    game.start();
</script>
```

> **Note:** Loading from the CDN is meant for quick tests, demos, and single-file examples. There are no type definitions available this way: for a TypeScript project, install the engine from npm as described above.

## Suggested folder structure

The following structure is a convention for organizing a project. The skeleton template follows it, and it is the layout used throughout this manual.

```
my-game/
├── src/
│   ├── main.ts        # Initializes the Game instance, loads scenes, and runs the game
│   ├── component/     # Component files
│   ├── config/        # Configuration and parameter files
│   ├── entity/        # Entity definition files
│   ├── scene/         # Scene files
│   └── system/        # System files
└── public/            # Assets: images, sound files, map editor exports, etc.
```
