# TextRenderer

The `TextRenderer` component renders text to the screen. It works with web-safe and imported fonts, and works optimally with bitmap fonts. It uses the entity's [`Transform`](transform.md) for position. See [Rendering](../rendering.md) for an overview.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `text` | `string` | `"Hello World!"` | The text to render. |
| `color` | `string` | `"#000000"` | The text color. |
| `font` | `FontFace \| string` | `"Arial"` | The font family. |
| `fontSize` | `number` | `16` | Font size in pixels. |
| `width` | `number` | `192` | Width of the box the text is rendered in. |
| `height` | `number` | `16` | Height of the box the text is rendered in. |
| `layer` | `string` | `"Default"` | The render layer. |
| `alignment` | `TextAlignment` | `TextAlignment.Center` | Text alignment: `Left`, `Center`, or `Right`. |
| `lineHeight` | `number` | font size | Line height in pixels. |
| `letterSpacing` | `number` | `0` | Space between characters in pixels. |
| `offset` | `Vector2` | `(0, 0)` | Offset from the entity's position. |
| `rotation` | `number` | `0` | Rotation in radians. |
| `opacity` | `number` | `1` | Opacity between `0` and `1`. |
| `flipHorizontally` | `boolean` | `false` | Flips the text horizontally. |
| `flipVertically` | `boolean` | `false` | Flips the text vertically. |
| `smooth` | `boolean` | `false` | Smooths pixels. Not recommended for bitmap fonts. |
| `shadow` | `{ color: string; offset: Vector2; opacity: number }` | — | Optional text shadow. |
| `textureAtlas` | `{ charRanges?: number[]; fontSize?: number; spacing?: number }` | `charRanges: [32, 132, 161, 255]`, `fontSize: 64`, `spacing: 8` | Configuration of the generated character atlas. |

The `textureAtlas.charRanges` option defines, as pairs of Unicode code points, the inclusive ranges of characters the component can render. The default `[32, 132, 161, 255]` covers Basic Latin (letters, digits and punctuation) and the Latin-1 Supplement (accented letters and symbols used by Western European languages). Additional pairs can be appended to render other alphabets, for example `[0x3040, 0x309F]` for Japanese Hiragana or `[0x0400, 0x04FF]` for Cyrillic. The code-point range of every alphabet can be found in the official [Unicode Character Code Charts](https://www.unicode.org/charts/):

```typescript
textureAtlas: {
    charRanges: [32, 132, 161, 255, 0x3040, 0x309f],
}
```

## Example

```typescript
import { Transform, TextRenderer, TextAlignment } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TextRenderer({
        text: "Score: 0",
        color: "#FFFFFF",
        fontSize: 24,
        layer: "UI",
        alignment: TextAlignment.Left,
    }),
]);
```

Imported fonts are loaded through the [asset manager](../asset-manager.md) with `loadFont`.
