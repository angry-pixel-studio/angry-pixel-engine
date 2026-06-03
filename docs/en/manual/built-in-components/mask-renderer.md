# MaskRenderer

The `MaskRenderer` component renders a filled shape: a rectangle, a circle, or a polygon. It is useful for UI elements, visual effects, or masking other content. It uses the entity's [`Transform`](transform.md) for position. See [Rendering](../rendering.md) for an overview.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `shape` | `MaskShape` | — | `MaskShape.Rectangle`, `MaskShape.Circumference`, or `MaskShape.Polygon`. |
| `width` | `number` | `0` | Width in pixels. Rectangle only. |
| `height` | `number` | `0` | Height in pixels. Rectangle only. |
| `radius` | `number` | `0` | Radius in pixels. Circumference only. |
| `vertexModel` | `Vector2[]` | `[]` | Polygon vertices. Polygon only. |
| `color` | `string` | `"#000000"` | Fill color. |
| `offset` | `Vector2` | `(0, 0)` | Offset from the entity's position. |
| `rotation` | `number` | `0` | Rotation in radians. |
| `opacity` | `number` | `1` | Opacity between `0` and `1`. |
| `layer` | `string` | `"Default"` | The render layer. |

## Example

```typescript
import { Transform, MaskRenderer, MaskShape } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new MaskRenderer({
        shape: MaskShape.Rectangle,
        width: 32,
        height: 32,
        color: "#000000",
        layer: "UI",
    }),
]);
```
