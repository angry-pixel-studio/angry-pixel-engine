# LightRenderer

The `LightRenderer` component renders a circular light source. It works by illuminating areas within a darkness mask, so it requires a [`DarknessRenderer`](darkness-renderer.md) in the scene to have any effect. It uses the entity's [`Transform`](transform.md) for position. See [Rendering](../rendering.md) for an overview.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `radius` | `number` | `0` | Light radius. |
| `intensity` | `number` | `1` | Light intensity between `0` and `1`. |
| `smooth` | `boolean` | `false` | Softens the light's edge. |
| `steps` | `number` | `0` | Number of opacity rings of a smooth light. `0` means a continuous fade. |
| `layer` | `string` | `"Default"` | The darkness layer this light affects. |
| `color` | `string` | `undefined` | Glow color in hexadecimal (`#RRGGBB`), added over the lit area. Its strength is set by `intensity`. No glow if not set. |

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
        color: "#FF9900",
    }),
]);
```

The `layer` must match the layer of the [`DarknessRenderer`](darkness-renderer.md) it illuminates.

## Light pixels

The light is calculated once per world unit, so with a camera zoom of `4` each light pixel covers 4×4 screen pixels. Light centers are snapped to whole world units. With `smooth` enabled and `steps` greater than `0`, the light fades out in that many rings, each one drawn with whole light pixels. The `color` glow follows the same falloff, rings and pixels.

Each `DarknessRenderer` draws up to 256 on-screen lights; GPUs with less uniform space allow fewer. Lights outside the screen are skipped and do not count.
