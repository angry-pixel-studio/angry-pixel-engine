## TilemapRenderer

The `TilemapRenderer` component renders 2D tile-based maps to the screen.  
It uses a tileset image as a source for individual tiles, which are arranged according to a provided array of tile IDs.  
It supports features like tinting, masking, opacity control, and custom tile dimensions.  
Maps can be rendered in _chunks_ to improve performance when dealing with large tilemaps. Each tile is referenced by an ID, where `0` represents empty space.

### Properties

| Property       | Type       | Description                                                         |
| -------------- | ---------- | ------------------------------------------------------------------- |
| `layer`        | `string`   | Render layer where the tilemap will be drawn.                       |
| `tileset`      | `Tileset`  | Tileset configuration used to render the tiles.                     |
| `data`         | `number[]` | Array of tile IDs. ID `0` represents empty space.                   |
| `chunks`       | `Chunk[]`  | Tile data divided into chunks. Useful for large maps.               |
| `width`        | `number`   | Width of the tilemap (in tiles).                                    |
| `height`       | `number`   | Height of the tilemap (in tiles).                                   |
| `tileWidth`    | `number`   | Width of each tile (in pixels).                                     |
| `tileHeight`   | `number`   | Height of each tile (in pixels).                                    |
| `tintColor`    | `string`   | Color used to tint the tiles.                                       |
| `maskColor`    | `string`   | Mask color applied over the tilemap.                                |
| `maskColorMix` | `number`   | Opacity of the mask color (between `0` and `1`).                    |
| `opacity`      | `number`   | Opacity of the tilemap (value between `0` and `1`).                 |
| `smooth`       | `boolean`  | If `true`, applies pixel smoothing (not recommended for pixel art). |

### Minimal example

```typescript
const tilemapRenderer = new TilemapRenderer({
    layer: "Default",
    tileset: {
        image: this.assetManager.getImage("tileset.png"),
        width: 10,
        tileWidth: 32,
        tileHeight: 32,
    },
    data: [1, 2, 3, 4],
    width: 2,
    height: 2,
    tileWidth: 32,
    tileHeight: 32,
});
```

### Full example using `data`

```typescript
const tilemapRenderer = new TilemapRenderer({
    layer: "Default",
    tileset: {
        image: this.assetManager.getImage("tileset.png"),
        width: 10,
        tileWidth: 32,
        tileHeight: 32,
        margin: new Vector2(0, 0),
        spacing: new Vector2(0, 0),
    },
    data: [1, 2, 3, 4],
    chunks: [],
    width: 2,
    height: 2,
    tileWidth: 32,
    tileHeight: 32,
    tintColor: "#FFFFFF",
    maskColor: "#FF0000",
    maskColorMix: 0,
    opacity: 1,
    smooth: false,
});
```

### Full example using `chunks`

```typescript
const tilemapRenderer = new TilemapRenderer({
    layer: "Default",
    tileset: {
        image: this.assetManager.getImage("tileset.png"),
        width: 10,
        tileWidth: 32,
        tileHeight: 32,
    },
    chunks: [
        {
            data: [1, 2, 3, 4],
            x: 0,
            y: 0,
            width: 2,
            height: 2,
        },
    ],
    width: 2,
    height: 2,
    tileWidth: 32,
    tileHeight: 32,
    tintColor: "#FFFFFF",
    maskColor: "#0000FF",
    maskColorMix: 0.5,
    opacity: 1,
    smooth: false,
});
```

### Notes

-   Tiles with ID `0` are considered empty space and will not be rendered.
-   For large maps, using `chunks` is recommended to improve performance.
-   The tileset must define the tile size and source image. Margin and spacing are optional and should be used if the image contains gaps between tiles.
-   Smoothing (`smooth`) may improve vector graphics or high-resolution tiles but is not recommended for pixel art.
-   **After the `TilemapRenderer` is created, a system will process its data:**
    -   If the tile data was loaded into the `data` property, the system will automatically create `chunks`.
    -   If `chunks` were loaded, the `data` property will be updated to reflect all tiles contained in the chunks.
    -   This allows read access to both formats, but internally the rendering system **always uses the `chunks` for drawing**.
-   The rendering and tile processing logic is handled by the system that processes `TilemapRenderer` components. The component only defines visual properties.
