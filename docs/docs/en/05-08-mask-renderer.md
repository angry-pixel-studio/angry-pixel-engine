## MaskRenderer

The `MaskRenderer` component renders filled shapes such as rectangles, circles, or polygons.  
It supports different shape types with configurable dimensions, colors, positioning, and rotation.  
Shapes can be rendered with variable opacity and assigned to specific render layers.  
This component is useful for creating UI elements, visual effects, or masking other rendered content.

### Properties

| Property      | Type        | Description                                                 |
| ------------- | ----------- | ----------------------------------------------------------- |
| `shape`       | `MaskShape` | Shape type: `Rectangle`, `Circumference`, or `Polygon`.     |
| `width`       | `number`    | Width of the mask in pixels (only for rectangles).          |
| `height`      | `number`    | Height of the mask in pixels (only for rectangles).         |
| `radius`      | `number`    | Radius of the mask in pixels (only for circumferences).     |
| `vertexModel` | `Vector2[]` | Polygon vertices (only for polygons).                       |
| `color`       | `string`    | Mask color.                                                 |
| `offset`      | `Vector2`   | Offset on the X and Y axes relative to the entity’s center. |
| `rotation`    | `number`    | Mask rotation in radians.                                   |
| `opacity`     | `number`    | Mask opacity (value between 0 and 1).                       |
| `layer`       | `string`    | Render layer where the mask will be drawn.                  |

### Example with **rectangle**

```typescript
const maskRenderer = new MaskRenderer({
    shape: MaskShape.Rectangle,
    width: 32,
    height: 32,
    color: "#000000",
    offset: new Vector2(0, 0),
    rotation: 0,
    opacity: 1,
    layer: "Default",
});
```

### Example with **circumference**

```typescript
const maskRenderer = new MaskRenderer({
    shape: MaskShape.Circumference,
    radius: 16,
    color: "#000000",
    offset: new Vector2(0, 0),
    opacity: 1,
    layer: "Default",
});
```

### Example with **polygon**

```typescript
const maskRenderer = new MaskRenderer({
    shape: MaskShape.Polygon,
    vertexModel: [new Vector2(0, 0), new Vector2(32, 0), new Vector2(32, 32), new Vector2(0, 32)],
    color: "#000000",
    offset: new Vector2(0, 0),
    opacity: 1,
    layer: "Default",
});
```

### Notes

-   Each shape requires different properties:
    -   `Rectangle`: requires `width` and `height`.
    -   `Circumference`: requires `radius`.
    -   `Polygon`: requires `vertexModel`.
-   Rotation (`rotation`) only affects rectangles and polygons.
-   The `opacity` value allows creating semi-transparent masks if set below 1.
-   The rendering system applies visual properties and positioning. The component only defines the mask attributes.
