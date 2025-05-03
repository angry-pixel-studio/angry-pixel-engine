## SpriteRenderer

The `SpriteRenderer` component renders 2D images (sprites) to the screen.  
It offers features such as image slicing, scaling, rotation, flipping, opacity, color masking, tinting, and assignment to specific render layers.  
Images can be rendered with custom dimensions, positioned with offsets, and even tiled across an area.

### Properties

| Property           | Type                           | Description                                                               |
| ------------------ | ------------------------------ | ------------------------------------------------------------------------- |
| `layer`            | `string`                       | Render layer where the sprite will be drawn.                              |
| `image`            | `HTMLImageElement` \| `string` | Image to render. Can be an image object or a file path string.            |
| `slice`            | `Slice`                        | Crops the image using coordinates starting from the top-left corner.      |
| `smooth`           | `boolean`                      | If `true`, applies pixel smoothing (not recommended for pixel art).       |
| `offset`           | `Vector2`                      | Offset on the X and Y axes relative to the entity’s center.               |
| `flipHorizontally` | `boolean`                      | If `true`, flips the image horizontally.                                  |
| `flipVertically`   | `boolean`                      | If `true`, flips the image vertically.                                    |
| `rotation`         | `number`                       | Image rotation in radians.                                                |
| `opacity`          | `number`                       | Image opacity, value between 0 and 1.                                     |
| `maskColor`        | `string`                       | Mask color to apply over the image.                                       |
| `maskColorMix`     | `number`                       | Mask color mix intensity, value between 0 and 1.                          |
| `tintColor`        | `string`                       | Color used to tint the image.                                             |
| `scale`            | `Vector2`                      | Scale of the image on the X and Y axes.                                   |
| `width`            | `number`                       | Custom width for the image (overrides the original width).                |
| `height`           | `number`                       | Custom height for the image (overrides the original height).              |
| `tiled`            | `Vector2`                      | Defines how many times the image will repeat horizontally and vertically. |

### Minimal example

```typescript
const spriteRenderer = new SpriteRenderer({
    image: "mySprite.png",
});
```

### Full example

```typescript
const spriteRenderer = new SpriteRenderer({
    image: this.assetManager.getImage("image.png"),
    width: 1920,
    height: 1080,
    offset: new Vector2(0, 0),
    flipHorizontally: false,
    flipVertically: false,
    rotation: 0,
    opacity: 1,
    maskColor: "#FF0000",
    maskColorMix: 0,
    tintColor: "#00FF00",
    layer: "Default",
    slice: { x: 0, y: 0, width: 1920, height: 1080 },
    scale: new Vector2(1, 1),
    tiled: new Vector2(1, 1),
    smooth: false,
});
```

### Notes

-   Render layers (`layer`) determine which cameras can see this sprite (according to each `Camera`’s configured layers).
-   Pixel smoothing (`smooth`) can improve vector graphics or high-resolution images but is not recommended for pixel art.
-   The `slice` property allows rendering only a specific portion of the image.
-   Rendering logic and the application of masks, tints, flips, and tiling are handled by the system that processes `SpriteRenderer` components. The component only defines visual properties.
