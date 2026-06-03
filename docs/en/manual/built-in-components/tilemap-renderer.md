# TilemapRenderer

The `TilemapRenderer` component renders a tile-based map. It uses a tileset image as the source for individual tiles, arranged according to an array of tile IDs. It uses the entity's [`Transform`](transform.md) for position. See [Rendering](../rendering.md) for an overview.

Each tile is referenced by an ID, where `0` represents empty space. The tile data can be provided directly, or populated from a Tiled map with the [`TiledWrapper`](tiled-wrapper.md) component.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tileset` | `Tileset` | — | The tileset that provides the tiles (see below). |
| `data` | `number[]` | `[]` | Array of tile IDs. `0` is empty space. |
| `chunks` | `Chunk[]` | `[]` | Tile data split into chunks, for large maps. |
| `width` | `number` | `0` | Map width in tiles. |
| `height` | `number` | `0` | Map height in tiles. |
| `tileWidth` | `number` | — | Rendered tile width. |
| `tileHeight` | `number` | — | Rendered tile height. |
| `layer` | `string` | `"Default"` | The render layer. |
| `opacity` | `number` | `1` | Opacity between `0` and `1`. |
| `tintColor` | `string` | — | Color used to tint the tiles. |
| `maskColor` | `string` | — | Mask color applied to the tiles. |
| `maskColorMix` | `number` | — | Mask color opacity between `0` and `1`. |
| `smooth` | `boolean` | `false` | Smooths pixels. Not recommended for pixel art. |

### Tileset

| Field | Type | Description |
|-------|------|-------------|
| `image` | `HTMLImageElement \| string` | The tileset image, or an asset URL/name string. |
| `width` | `number` | Tileset width in tiles. |
| `tileWidth` | `number` | Tile width in pixels. |
| `tileHeight` | `number` | Tile height in pixels. |
| `margin` | `Vector2` | Optional margin (top and left) in pixels. |
| `spacing` | `Vector2` | Optional spacing (bottom and right) in pixels. |

## Example

```typescript
import { Transform, TilemapRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TilemapRenderer({
        layer: "Default",
        tileset: {
            image: this.assetManager.getImage("tileset.png"),
            width: 8,
            tileWidth: 16,
            tileHeight: 16,
        },
        data: [1, 2, 3, 4],
        width: 2,
        height: 2,
    }),
]);
```
