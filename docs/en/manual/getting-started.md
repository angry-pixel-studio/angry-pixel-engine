# Getting Started

> **Note:** The **Tutorial** section walks you through building a game from scratch, step by step. The **Manual** is a reference: each page explains a key part of the engine, with examples. If you are new to Angry Pixel, start with the Tutorial; use the Manual to look things up.

> **Prerequisites:**
>
> - Familiarity with the terminal / command line.
> - Familiarity with JavaScript or TypeScript.
> - [Node.js](https://nodejs.org/) version 20 or higher installed.

## Installation

There are two ways to start a project: scaffold a new project from the official skeleton template, or install the engine manually into your own project.

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
