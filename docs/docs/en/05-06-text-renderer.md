## TextRenderer

The `TextRenderer` component renders text to the screen with extensive customization options.  
It supports both web-safe and imported fonts but works optimally with bitmap fonts.  
Under the hood, it generates a _texture atlas_ containing all the characters needed for rendering.  
The atlas can be configured with custom character ranges, font sizes, and spacing.

Text can be customized with font family, color, size, orientation, shadows, letter spacing, line height, opacity, smoothing, and positioning. The text can also be rotated, flipped, and assigned to specific render layers.

### Properties

| Property           | Type                                                          | Description                                                   |
| ------------------ | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `color`            | `string`                                                      | Text color.                                                   |
| `flipHorizontally` | `boolean`                                                     | If `true`, flips the text horizontally.                       |
| `flipVertically`   | `boolean`                                                     | If `true`, flips the text vertically.                         |
| `font`             | `FontFace` \| `string`                                        | Font family to use.                                           |
| `fontSize`         | `number`                                                      | Font size in pixels.                                          |
| `height`           | `number`                                                      | Height of the invisible box where the text is rendered.       |
| `layer`            | `string`                                                      | Render layer where the text will be drawn.                    |
| `letterSpacing`    | `number`                                                      | Space between characters in pixels.                           |
| `lineHeight`       | `number`                                                      | Line height in pixels. Default value equals the font size.    |
| `offset`           | `Vector2`                                                     | Offset on the X and Y axes relative to the entity’s center.   |
| `opacity`          | `number`                                                      | Text opacity (value between 0 and 1).                         |
| `orientation`      | `TextOrientation`                                             | Direction in which the text will be rendered.                 |
| `rotation`         | `number`                                                      | Text rotation in radians.                                     |
| `smooth`           | `boolean`                                                     | Pixel smoothing (not recommended for bitmap fonts).           |
| `shadow`           | `{ color: string, offset: Vector2, opacity: number }`         | Text shadow configuration.                                    |
| `text`             | `string`                                                      | Text to render.                                               |
| `textureAtlas`     | `{ charRanges: number[], fontSize: number, spacing: number }` | Configuration of the texture atlas containing the characters. |
| `width`            | `number`                                                      | Width of the invisible box where the text is rendered.        |

### Minimal example

```typescript
const textRenderer = new TextRenderer({
    text: "Hello world!",
    fontSize: 24,
    font: "Arial",
});
```

### Full example

```typescript
const textRenderer = new TextRenderer({
    text: "Hello World!",
    color: "#FFFFFF",
    fontSize: 24,
    width: 1920,
    height: 32,
    opacity: 1,
    layer: "TextLayer",
    orientation: TextOrientation.RightCenter,
    shadow: {
        color: "#00FF00",
        offset: new Vector2(3, -3),
        opacity: 0.5,
    },
    textureAtlas: {
        charRanges: [32, 126, 161, 255, 0x3040, 0x309f],
        fontSize: 64,
        spacing: 4,
    },
    font: "Arial",
    flipHorizontally: false,
    flipVertically: false,
    letterSpacing: 0,
    lineHeight: 24,
    offset: new Vector2(0, 0),
    rotation: 0,
    smooth: false,
});
```

### Notes

-   While it supports any type of font, the best performance and visual quality are achieved using bitmap fonts.
-   The `charRanges` property allows including custom characters, for example, symbols or non-Latin language characters.
-   The `smooth` property can improve vector or high-resolution text but is not recommended for bitmap fonts.
-   Rendering logic and texture atlas generation are handled by the system responsible for processing `TextRenderer` components. The component only defines visual properties.
