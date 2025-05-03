## DarknessRenderer & LightRenderer

The engine’s lighting system consists of two components that work together:  
`DarknessRenderer` and `LightRenderer`.

`DarknessRenderer` draws a darkness mask that can partially or fully cover an area of the screen.  
`LightRenderer` defines light sources that illuminate specific areas within the darkness mask.

### DarknessRenderer

The `DarknessRenderer` component creates a rectangular darkness mask.  
It can be configured with color, opacity, dimensions, and render layer.

#### Properties

| Property  | Type     | Description                            |
| --------- | -------- | -------------------------------------- |
| `width`   | `number` | Width of the darkness area in pixels.  |
| `height`  | `number` | Height of the darkness area in pixels. |
| `color`   | `string` | Color of the darkness.                 |
| `opacity` | `number` | Opacity between 0 and 1.               |
| `layer`   | `string` | Render layer.                          |

#### Example

```typescript
const darknessRenderer = new DarknessRenderer({
    width: 100,
    height: 50,
    color: "#000000",
    opacity: 0.5,
    layer: "Default",
});
```

---

### LightRenderer

The `LightRenderer` component defines a circular light source.  
These lights visually affect `DarknessRenderer` instances that share the same layer.

#### Properties

| Property    | Type      | Description                                             |
| ----------- | --------- | ------------------------------------------------------- |
| `radius`    | `number`  | Radius of the light.                                    |
| `smooth`    | `boolean` | If `true`, softens the edges of the light.              |
| `layer`     | `string`  | Render layer (must match the `DarknessRenderer` layer). |
| `intensity` | `number`  | Light intensity between 0 and 1.                        |

#### Example

```typescript
const lightRenderer = new LightRenderer({
    radius: 100,
    smooth: true,
    layer: "Default",
    intensity: 0.8,
});
```

---

### Combined example

```typescript
const darkness = new DarknessRenderer({
    width: 500,
    height: 500,
    color: "#000000",
    opacity: 0.7,
    layer: "Game",
});

const light = new LightRenderer({
    radius: 120,
    smooth: true,
    layer: "Game",
    intensity: 1,
});
```

---

### Notes

-   For a light to affect a darkness mask, both components must share the same `layer` value.
-   Multiple `LightRenderer` components can illuminate a single `DarknessRenderer`.
-   The `smooth` parameter in `LightRenderer` enables smooth transitions between light and shadow.
-   The `intensity` controls how strongly the light affects the darkness.
-   All lighting calculations (mixing lights with darkness) are handled by the rendering system. The components only define visual attributes.
