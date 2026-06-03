# GeometricRenderer

The `GeometricRenderer` component draws hollow (stroke-only) geometry: polygon outlines, lines, and circle outlines. It uses the entity's [`Transform`](transform.md) for position, scale, and rotation. See [Rendering](../rendering.md) for an overview.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `shape` | `GeometricShape` | `GeometricShape.Polygon` | `GeometricShape.Polygon`, `GeometricShape.Line`, or `GeometricShape.Circumference`. |
| `color` | `string` | `"#FFFFFF"` | Stroke color. |
| `vertexModel` | `Vector2[]` | `[]` | Vertices in local space. For `Polygon`, at least three points (drawn as a closed loop). For `Line`, an even number of points (pairs). Ignored for `Circumference`. |
| `radius` | `number` | `0` | Radius in pixels. Circumference only. |
| `offset` | `Vector2` | `(0, 0)` | Offset from the entity's position. |
| `rotation` | `number` | `0` | Rotation in radians, added to the Transform's rotation. |
| `layer` | `string` | `"Default"` | The render layer. |

Nothing is drawn if the geometry is invalid: a circumference needs `radius > 0`, a polygon needs at least three vertices, and a line needs at least two vertices and an even count.

## Example

```typescript
import { Transform, GeometricRenderer, GeometricShape, Vector2 } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new GeometricRenderer({
        shape: GeometricShape.Circumference,
        color: "#00FF88",
        radius: 32,
        layer: "Default",
    }),
]);
```
