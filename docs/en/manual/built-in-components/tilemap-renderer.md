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
| `tileWidth` | `number` | Tile width in pixels. |
| `tileHeight` | `number` | Tile height in pixels. |
| `margin` | `number` | Space in pixels between the tiles and the four edges of the image. Defaults to `0`. |
| `spacing` | `number` | Space in pixels between adjacent tiles. Defaults to `0`. |
| `animations` | `Map<number, TileAnimation>` | Animated tiles, keyed by the tile ID to animate (see below). |

For a tileset whose tiles are extruded by 1 pixel, the image has a margin of `1` and a spacing of `2`:

```typescript
tileset: {
    image: this.assetManager.getImage("tileset.png"),
    tileWidth: 16,
    tileHeight: 16,
    margin: 1,
    spacing: 2,
}
```

### Tile animations

A `TileAnimation` cycles a tile through a sequence of tileset tile IDs. The `animations` map is defined in the tileset and is keyed by the tile ID that should animate: every tile with that ID plays the animation. Since the animations belong to the tileset, every tilemap using that tileset plays them in sync. Animations always loop.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tiles` | `number[]` | `[]` | The sequence of tile IDs to cycle through. |
| `fps` | `number` | `12` | Frames per second. |

## Example

```typescript
import { Transform, TilemapRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TilemapRenderer({
        layer: "Default",
        tileset: {
            image: this.assetManager.getImage("tileset.png"),
            tileWidth: 16,
            tileHeight: 16,
        },
        data: [1, 2, 3, 4],
        width: 2,
        height: 2,
    }),
]);
```

## Animated tiles example

```typescript
import { Transform, TilemapRenderer, TileAnimation } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TilemapRenderer({
        tileset: {
            image: this.assetManager.getImage("tileset.png"),
            tileWidth: 16,
            tileHeight: 16,
            // Every tile with ID 3 cycles through 3, 4, 5 at 6 fps.
            animations: new Map([[3, new TileAnimation({ tiles: [3, 4, 5], fps: 6 })]]),
        },
        data: [1, 2, 3, 4],
        width: 2,
        height: 2,
    }),
]);
```
