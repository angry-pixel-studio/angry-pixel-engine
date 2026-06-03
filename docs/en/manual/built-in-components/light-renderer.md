# LightRenderer

The `LightRenderer` component renders a circular light source. It works by illuminating areas within a darkness mask, so it requires a [`DarknessRenderer`](darkness-renderer.md) in the scene to have any effect. It uses the entity's [`Transform`](transform.md) for position. See [Rendering](../rendering.md) for an overview.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `radius` | `number` | `0` | Light radius. |
| `intensity` | `number` | `1` | Light intensity between `0` and `1`. |
| `smooth` | `boolean` | `false` | Softens the light's edge. |
| `layer` | `string` | `"Default"` | The darkness layer this light affects. |

## Example

```typescript
import { Transform, LightRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new LightRenderer({
        radius: 100,
        intensity: 0.8,
        smooth: true,
        layer: "Darkness",
    }),
]);
```

The `layer` must match the layer of the [`DarknessRenderer`](darkness-renderer.md) it illuminates.
