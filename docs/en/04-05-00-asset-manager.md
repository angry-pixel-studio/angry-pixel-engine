# AssetManager

## Overview

The `AssetManager` is responsible for loading and managing all types of game assets, including images, audio, fonts, videos, and JSON data.  
It provides convenient methods to asynchronously load assets and retrieve them by their URL or by a user-defined name.

## Responsibilities

-   Load and track images, audio, fonts, videos, and JSON files.
-   Provide access to loaded assets by URL or name.
-   Track the loading status of all assets.
-   Automatically manage asset caching to prevent duplicate loads.

## Usage Example

"""typescript
// Load assets
this.assetManager.loadImage("player.png");
this.assetManager.loadAudio("explosion.ogg");
this.assetManager.loadFont("my-font", "font.ttf");
this.assetManager.loadJson("level-data.json");

// Retrieve assets
const image = this.assetManager.getImage("player.png");
const audio = this.assetManager.getAudio("explosion.ogg");
const font = this.assetManager.getFont("my-font");
const data = this.assetManager.getJson("level-data.json");

// Check if all assets are loaded
if (this.assetManager.getAssetsLoaded()) {
// All assets are ready
}
"""

## Supported Asset Types

| Type  | Methods                     |
| ----- | --------------------------- |
| Image | `loadImage()`, `getImage()` |
| Audio | `loadAudio()`, `getAudio()` |
| Font  | `loadFont()`, `getFont()`   |
| Video | `loadVideo()`, `getVideo()` |
| JSON  | `loadJson()`, `getJson()`   |

## Notes

-   Each asset can be retrieved either by its URL or by a custom name specified at the time of loading.
-   Fonts are automatically added to `document.fonts` and can be used immediately in rendering contexts.
