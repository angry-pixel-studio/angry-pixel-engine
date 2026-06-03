# Audio

The engine plays audio in two ways: the [`AudioPlayer`](built-in-components/audio-player.md) component, for background music and longer tracks with pause and resume, and the `playSfx` utility, for one-shot sound effects.

## Loading audio files

Audio files are loaded through the [asset manager](asset-manager.md) with `loadAudio`, typically in a scene's `loadAssets` method. Once loaded, an audio asset is retrieved with `getAudio`.

```typescript
import { Scene } from "angry-pixel";

export class MainScene extends Scene {
    loadAssets() {
        this.assetManager.loadAudio("audio/music/theme.ogg");
        this.assetManager.loadAudio("audio/sfx/coin.ogg");
    }
}
```

## Playing music

For background music, add an [`AudioPlayer`](built-in-components/audio-player.md) component to an entity. It uses the Web Audio API, supports looping and pause/resume, and honors the browser autoplay policy.

```typescript
import { AudioPlayer } from "angry-pixel";

this.entityManager.createEntity([
    new AudioPlayer({ audioSource: "audio/music/theme.ogg", volume: 0.5, loop: true }),
]);
```

The component's `play`, `pause`, and `stop` methods control playback. See [`AudioPlayer`](built-in-components/audio-player.md) for the full API.

## Playing sound effects

For one-shot sound effects like coins, impacts, or UI feedback, use the `playSfx` utility. It plays the sound from the beginning, even if it is already playing, and is typically called from a system.

```typescript
import { GameSystem, playSfx } from "angry-pixel";

export class CoinSystem extends GameSystem {
    onUpdate() {
        const coin = this.assetManager.getAudio("audio/sfx/coin.ogg");
        playSfx({ audioSource: coin });
    }
}
```

`playSfx` accepts the following options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `audioSource` | `AudioSource` | — | The audio asset to play, obtained from `getAudio`. |
| `volume` | `number` | `1` | Playback volume. |
| `loop` | `boolean` | `false` | Whether the sound repeats. |

`stopSfx` stops a sound effect, pausing it and resetting it to the beginning. This is useful for interrupting a looped effect.

```typescript
import { stopSfx } from "angry-pixel";

const coin = this.assetManager.getAudio("audio/sfx/coin.ogg");
stopSfx(coin);
```

> **Note:** Use `playSfx` for short, frequent sound effects and the [`AudioPlayer`](built-in-components/audio-player.md) component for music and longer tracks that need pause and resume.
