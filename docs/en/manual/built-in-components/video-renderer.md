# VideoRenderer

The `VideoRenderer` component renders video content to the screen. It supports scaling, rotation, flipping, opacity, color masking, tinting, slicing, looping, and volume control, and playback can be controlled programmatically. It uses the entity's [`Transform`](transform.md) for position. See [Rendering](../rendering.md) for an overview.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `video` | `HTMLVideoElement \| string` | — | The video to render, or an asset URL/name string. |
| `layer` | `string` | `"Default"` | The render layer. |
| `width` | `number` | — | Overrides the rendered width. |
| `height` | `number` | — | Overrides the rendered height. |
| `slice` | `Slice` | — | Region of the video to draw (`{ x, y, width, height }`). |
| `offset` | `Vector2` | `(0, 0)` | Offset from the entity's position. |
| `rotation` | `number` | `0` | Rotation in radians. |
| `flipHorizontally` | `boolean` | — | Flips the video horizontally. |
| `flipVertically` | `boolean` | — | Flips the video vertically. |
| `opacity` | `number` | — | Opacity between `0` and `1`. |
| `tintColor` | `string` | — | Color used to tint the video. |
| `maskColor` | `string` | — | Mask color applied to the video. |
| `maskColorMix` | `number` | — | Mask color opacity between `0` and `1`. |
| `volume` | `number` | `1` | Volume between `0` and `1`. |
| `loop` | `boolean` | `false` | Whether the video repeats. |
| `fixedToTimeScale` | `boolean` | `false` | Whether the playback rate follows the time scale. |

## Read-only properties

| Property | Type | Description |
|----------|------|-------------|
| `playing` | `boolean` | `true` while the video is playing. |

## Methods

| Method | Description |
|--------|-------------|
| `play(video?)` | Plays the video. An optional video overrides `video`. |
| `pause()` | Pauses playback. |
| `stop()` | Stops playback. |

## Example

```typescript
import { Transform, VideoRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new VideoRenderer({
        video: this.assetManager.getVideo("intro.mp4"),
        width: 1920,
        height: 1080,
        layer: "Default",
    }),
]);
```

The video is loaded through the [asset manager](../asset-manager.md), typically in the scene's `loadAssets` method.
