# AudioPlayer

The `AudioPlayer` component plays, pauses, and stops audio sources. It controls volume and looping, and can optionally sync playback speed with the game's time scale.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `audioSource` | `AudioSource \| string` | — | The audio to play: an `AudioSource` (from `AssetManager.getAudio`) or an asset URL/name string. |
| `volume` | `number` | `1` | Playback volume. |
| `loop` | `boolean` | `false` | Whether the audio repeats. |
| `loopStart` | `number` | `0` | Time mark (seconds) where looping starts. Only has effect when `loop` is `true` and `loopEnd` is greater than zero. |
| `loopEnd` | `number` | `0` | Time mark (seconds) where looping ends. When `loop` is `true` and this is greater than zero, the audio loops between `loopStart` and `loopEnd`; otherwise the whole track loops. |
| `startAt` | `number` | `0` | Time mark (seconds) where playback starts from when playing from a stopped state. |
| `stopOnSceneTransition` | `boolean` | `true` | Whether the audio stops when a new scene loads. |
| `fixedToTimeScale` | `boolean` | `false` | Whether the playback rate follows the time scale. |

## Read-only properties

| Property | Type | Description |
|----------|------|-------------|
| `state` | `"stopped" \| "playing" \| "paused"` | The current playback state. |
| `playing` | `boolean` | `true` while playing. |
| `paused` | `boolean` | `true` while paused. |
| `stopped` | `boolean` | `true` while stopped. |
| `currentTime` | `number` | The current playback time mark in seconds (with decimals), updated each frame. |

## Methods

| Method | Description |
|--------|-------------|
| `play(audioSource?)` | Plays the audio. An optional source overrides `audioSource`. |
| `pause()` | Pauses playback. |
| `stop()` | Stops playback. |

## Example

```typescript
import { AudioPlayer } from "angry-pixel";

this.entityManager.createEntity([
    new AudioPlayer({ audioSource: "music.ogg", volume: 0.5, loop: true }),
]);
```

The audio file is loaded through the [asset manager](../asset-manager.md), typically in the scene's `loadAssets` method.

> **Note:** Browsers block audio from starting until the user interacts with the page. The component honors this autoplay policy: if playback is requested before any user interaction, it waits and starts automatically on the first user input (a click, key press, or touch).
