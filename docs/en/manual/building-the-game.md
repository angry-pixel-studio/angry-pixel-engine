# Building the Game

Angry Pixel games are web games: a build produces a set of static files (HTML, JavaScript, and assets) that run in the browser. Building for the **web** is straightforward. Targeting **desktop** or **mobile** is also possible, but relies on third-party solutions that wrap the web build in a native shell.

> **Note:** Consoles are not contemplated. Console platforms do not allow just-in-time (JIT) compiled applications, which rules out running a JavaScript/web game on them.

## Building with the skeleton

The official skeleton (see [Getting Started](getting-started.md)) is a monorepo that builds a single game codebase for several platforms, with built-in commands. The desktop and mobile builds wrap the web build rather than reimplementing the game, so the same codebase runs everywhere.

It relies on the following third-party tools:

| Platform | Command | Tool |
|----------|---------|------|
| Web | `npm run build` | [Vite](https://vite.dev/) (static build) |
| Desktop (Windows, macOS, Linux) | `npm run build:desktop` | [Electron](https://www.electronjs.org/) |
| Mobile (Android) | `npm run build:android` | [Expo](https://expo.dev/) / EAS Build |

See the skeleton's `README.md` for setup details and requirements for each platform.

## Custom build setups

The engine itself only needs a bundler that can produce a web build; it does not depend on the skeleton. Experienced developers can use whatever toolchain they prefer — for example [webpack](https://webpack.js.org/) or [Vite](https://vite.dev/) for the web build, and a native wrapper such as [Electron](https://www.electronjs.org/) or [Tauri](https://tauri.app/) for desktop. The engine has no special build requirements beyond a standard JavaScript/TypeScript bundler.
