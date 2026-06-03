# DarknessRenderer

The `DarknessRenderer` component renders a rectangular darkness mask. It works together with [`LightRenderer`](light-renderer.md) components: lights that intersect the mask carve illuminated areas into it. It uses the entity's [`Transform`](transform.md) for position. See [Rendering](../rendering.md) for an overview.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | `number` | `0` | Width of the darkness rectangle. |
| `height` | `number` | `0` | Height of the darkness rectangle. |
| `color` | `string` | `"#000000"` | Darkness color. |
| `opacity` | `number` | `1` | Opacity between `0` and `1`. |
| `layer` | `string` | `"Default"` | The render layer. |

## Example

```typescript
import { Transform, DarknessRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new DarknessRenderer({
        width: 1920,
        height: 1080,
        color: "#000000",
        opacity: 1,
        layer: "Darkness",
    }),
]);
```

[`LightRenderer`](light-renderer.md) components on the same layer illuminate this mask.
