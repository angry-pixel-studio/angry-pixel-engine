# Getting Started

> **Note:** The **Tutorial** section walks you through building a game from scratch, step by step. The **Manual** is a reference: each page explains a key part of the engine, with examples. If you are new to Angry Pixel, start with the Tutorial; use the Manual to look things up.

## Installation

There are two ways to start a project: install the engine manually into your own project, or scaffold a new project from the official skeleton template.

### Manual installation

Create a project folder and install the engine from npm:

```bash
mkdir my-game
cd my-game
npm install angry-pixel
```

The engine ships its own type definitions, so no additional packages are required for TypeScript.

> **Note:** We recommend setting up your project with a bundler such as [Vite](https://vite.dev/), which provides a development server with hot reloading and a production build.

### Official skeleton template

The [official skeleton](https://github.com/angry-pixel-studio/angry-pixel-app-skeleton) provides a preconfigured project structure ready to use. Scaffold a new project from it and install its dependencies:

```bash
npx degit angry-pixel-studio/angry-pixel-app-skeleton my-game
cd my-game
npm install
```

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
