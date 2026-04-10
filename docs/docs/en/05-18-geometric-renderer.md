## GeometricRenderer

The `GeometricRenderer` component draws **hollow** (outline-only) 2D shapes: closed polygons, line segments, and circle outlines.  
It uses the same WebGL path as internal debug geometry (`RenderDataType.Geometric`).

### Requirements

-   The entity must have a `Transform`.
-   Position comes from `Transform.localPosition` plus `offset` (offset is scaled by the transform’s scale, and rotates with the entity when both offset and rotation are non-trivial—same idea as `MaskRenderer`).
-   `Transform.localScale` scales polygon/line vertices; for circles, `radius` is multiplied by the larger of `|scale.x|` and `|scale.y|`.
-   Final rotation is `Transform.localRotation` plus the component’s `rotation`.

### Properties

| Property      | Type             | Description                                                                 |
| ------------- | ---------------- | --------------------------------------------------------------------------- |
| `shape`       | `GeometricShape` | `Polygon` (closed loop), `Line` (`GL_LINES`, pairs of vertices), or `Circumference`. |
| `color`       | `string`         | Stroke color (hex, e.g. `#RRGGBB`).                                       |
| `vertexModel` | `Vector2[]`      | Local-space vertices for `Polygon` / `Line`. Not used for `Circumference`.  |
| `radius`      | `number`         | Circle radius when `shape` is `Circumference`.                            |
| `offset`      | `Vector2`        | Offset from the entity position on X and Y.                               |
| `rotation`    | `number`         | Extra rotation in radians (added to the transform).                         |
| `layer`       | `string`         | Render layer; must be included in the `Camera` layer list.                  |

### Example: polygon outline

```typescript
const outline = new GeometricRenderer({
    shape: GeometricShape.Polygon,
    color: "#00FF88",
    layer: "Default",
    vertexModel: [
        new Vector2(-16, -16),
        new Vector2(16, -16),
        new Vector2(16, 16),
        new Vector2(-16, 16),
    ],
    offset: new Vector2(0, 0),
    rotation: 0,
});
```

### Example: line segments

`Line` uses pairs of points per segment (vertex count must be **even**).

```typescript
const segments = new GeometricRenderer({
    shape: GeometricShape.Line,
    color: "#FFFFFF",
    layer: "Default",
    vertexModel: [
        new Vector2(0, 0),
        new Vector2(100, 0), // one segment
        new Vector2(0, 20),
        new Vector2(80, 40), // second segment
    ],
    offset: new Vector2(0, 0),
    rotation: 0,
});
```

### Example: circle outline

```typescript
const ring = new GeometricRenderer({
    shape: GeometricShape.Circumference,
    color: "#FF6600",
    layer: "Default",
    radius: 32,
    offset: new Vector2(0, 0),
    rotation: 0,
});
```

### Notes

-   Nothing is drawn if geometry is invalid:
    -   `Circumference`: `radius` must be positive.
    -   `Polygon`: at least three vertices.
    -   `Line`: at least two vertices and an **even** count.
-   Circle outlines in the current WebGL implementation do not visually change under Z rotation (symmetric circle); polygon and line outlines use `rotation` as expected.
-   Import `GeometricShape` from the engine package (re-exported from `@angry-pixel/webgl`) alongside `GeometricRenderer`.
