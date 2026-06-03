# Animator

The `Animator` component plays sprite animations. It holds a map of named animations and controls which one is playing, its speed, and its playback state. It works together with a [`SpriteRenderer`](sprite-renderer.md) on the same entity.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `animations` | `Map<string, Animation>` | empty | Named animations available to the component. |
| `animation` | `string` | — | The name of the animation to play. |
| `speed` | `number` | `1` | Playback speed multiplier. |
| `playing` | `boolean` | `false` | Whether the animation is playing. |
| `ignoreTimeScale` | `boolean` | `false` | If `true`, playback ignores the time scale. |

## Read-only properties

| Property | Type | Description |
|----------|------|-------------|
| `currentFrame` | `number` | The current frame of the playing animation. |
| `currentTime` | `number` | The elapsed time of the playing animation. |

## Methods

| Method | Description |
|--------|-------------|
| `play(animation?)` | Plays the animation. If a name is given, switches to it and resets. |
| `pause()` | Pauses playback, keeping the current frame. |
| `stop()` | Stops playback and resets to the first frame. |

## Animation

Each entry in `animations` is an `Animation`, which describes the source image and frame sequence:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `image` | `HTMLImageElement \| HTMLImageElement[] \| string \| string[]` | — | The source image(s) or asset name(s). |
| `slice` | `{ size: Vector2; offset?: Vector2; padding?: Vector2 }` | — | How to cut frames out of a sprite sheet. |
| `frames` | `number[]` | `[]` | The sequence of frame indices to play. |
| `fps` | `number` | `12` | Frames per second. |
| `loop` | `boolean` | `false` | Whether the animation repeats. |

## Example

```typescript
import { Transform, SpriteRenderer, Animator, Animation, Vector2 } from "angry-pixel";

const idle = new Animation({
    image: "player.png",
    slice: { size: new Vector2(32, 32) },
    frames: [0, 1, 2, 3],
    fps: 10,
    loop: true,
});

this.entityManager.createEntity([
    new Transform(),
    new SpriteRenderer(),
    new Animator({
        animations: new Map([["idle", idle]]),
        animation: "idle",
        playing: true,
    }),
]);
```
