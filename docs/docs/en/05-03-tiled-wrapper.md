## TiledWrapper

The `TiledWrapper` component links a tilemap created in the Tiled map editor with the engine.  
It handles interpreting the Tiled map format and specifies which tile layer should be rendered.

### Properties

| Property        | Type                       | Description                                                                |
| --------------- | -------------------------- | -------------------------------------------------------------------------- |
| `tilemap`       | `TiledTilemap` \| `string` | The Tiled map. Can be either a pre-parsed object or a path to a JSON file. |
| `layerToRender` | `string`                   | The name of the tile layer to render from the map.                         |

### Example

```typescript
const tiledWrapper = new TiledWrapper({
    tilemap: "tilemap.json",
    layerToRender: "Ground",
});

// It can also be used with a preloaded map
const tiledWrapper = new TiledWrapper({
    tilemap: assetManager.getJson("tilemap.json"),
    layerToRender: "Ground",
});
```

### Notes

-   This component **only supports tile layers**. Object layers defined in the map will be ignored.
-   To render the tilemap, **the entity must also include a `TilemapRenderer` component**.
-   For compatibility reasons, the tileset suggested in the Tiled export file will be ignored. **The tileset must be defined in the `TilemapRenderer` component**.
-   The `TiledWrapper` component only specifies which map and which layer to use. Rendering logic is handled by the system responsible for processing `TilemapRenderer` components.
