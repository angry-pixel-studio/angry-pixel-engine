# SpriteRenderer

The `SpriteRenderer` component renders an image (sprite) to the screen. It supports slicing, scaling, rotation, flipping, opacity, color masking, tinting, and tiling. It uses the entity's [`Transform`](transform.md) for position. See [Rendering](../rendering.md) for an overview.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `image` | `HTMLImageElement \| string` | — | The image to render, or an asset URL/name string. |
| `layer` | `string` | `"Default"` | The render layer. |
| `slice` | `Slice` | — | Region of the image to draw (`{ x, y, width, height }`). |
| `width` | `number` | — | Overrides the rendered width. |
| `height` | `number` | — | Overrides the rendered height. |
| `scale` | `Vector2` | `(1, 1)` | Scales the image. |
| `offset` | `Vector2` | `(0, 0)` | Offset from the entity's position. |
| `rotation` | `number` | `0` | Rotation in radians. |
| `flipHorizontally` | `boolean` | `false` | Flips the image horizontally. |
| `flipVertically` | `boolean` | `false` | Flips the image vertically. |
| `opacity` | `number` | `1` | Opacity between `0` and `1`. |
| `tintColor` | `string` | — | Color used to tint the image. |
| `maskColor` | `string` | — | Mask color applied to the image. |
| `maskColorMix` | `number` | — | Mask color opacity between `0` and `1`. |
| `tiled` | `Vector2` | — | Tiles the image across the given number of columns and rows. |
| `smooth` | `boolean` | `false` | Smooths pixels. Not recommended for pixel art. |

## Example

```typescript
import { Transform, SpriteRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new SpriteRenderer({
        image: this.assetManager.getImage("player.png"),
        layer: "Default",
    }),
]);
```

The image is loaded through the [asset manager](../asset-manager.md), typically in the scene's `loadAssets` method. Animated sprites are driven by the [`Animator`](animator.md) component.
