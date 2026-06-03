# The Asset Manager

The asset manager loads and retrieves game assets: images, audio, fonts, videos, and JSON data. It loads assets asynchronously and reports when they have finished loading.

Inside a scene it is available as `this.assetManager`. In systems it is obtained through dependency injection. See [Custom Components and Systems](custom-components-and-systems.md).

## Loading assets

Assets are typically loaded in a scene's `loadAssets` method. The engine waits until all requested assets have finished loading before creating the scene's entities.

```typescript
import { Scene } from "angry-pixel";

export class MainScene extends Scene {
    loadAssets() {
        this.assetManager.loadImage("player.png");
        this.assetManager.loadAudio("music.ogg");
        this.assetManager.loadFont("custom-font", "custom-font.ttf");
        this.assetManager.loadVideo("intro.mp4");
        this.assetManager.loadJson("level.json");
    }
}
```

The load methods are:

| Method | Parameters | Returns |
|--------|-----------|---------|
| `loadImage` | `url`, `name?` | `HTMLImageElement` |
| `loadAudio` | `url`, `name?` | `AudioSource \| null` |
| `loadFont` | `family`, `url` | `FontFace` |
| `loadVideo` | `url`, `name?` | `HTMLVideoElement` |
| `loadJson<T>` | `url`, `name?` | `Promise<T>` |

Each asset is identified by its `url`. Image, audio, video, and JSON assets also accept an optional `name`, which can be used to retrieve them later instead of the URL. Fonts are identified by their `family` name.

## Retrieving assets

Once loaded, assets are retrieved by their URL (or by the `name` given when loading them). Fonts are retrieved by their family name.

```typescript
const playerImage = this.assetManager.getImage("player.png");
const music = this.assetManager.getAudio("music.ogg");
const font = this.assetManager.getFont("custom-font");
const intro = this.assetManager.getVideo("intro.mp4");
const level = this.assetManager.getJson("level.json");
```

The retrieval methods are:

| Method | Parameters | Returns |
|--------|-----------|---------|
| `getImage` | `url` or `name` | `HTMLImageElement` |
| `getAudio` | `url` or `name` | `AudioSource` |
| `getFont` | `family` | `FontFace` |
| `getVideo` | `url` or `name` | `HTMLVideoElement` |
| `getJson<T>` | `url` or `name` | `T` |

### Audio assets

`loadAudio` and `getAudio` work with an `AudioSource`, which holds both a decoded `AudioBuffer` and an `HTMLAudioElement`:

```typescript
interface AudioSource {
    buffer?: AudioBuffer;
    element: HTMLAudioElement;
}
```

The `buffer` is populated asynchronously once decoding finishes. In headless mode (no audio context) `loadAudio` returns `null`.

## Checking load status

`getAssetsLoaded` returns `true` when every requested asset has finished loading.

```typescript
if (this.assetManager.getAssetsLoaded()) {
    // all assets are ready
}
```

A scene uses this internally: its `createEntities` method runs only after `getAssetsLoaded` returns `true`.
