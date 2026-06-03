# TiledWrapper

The `TiledWrapper` component wraps a tilemap exported from the [Tiled](https://www.mapeditor.org/) map editor and selects which layer to render. It works together with a [`TilemapRenderer`](tilemap-renderer.md) on the same entity, which draws the tiles using a tileset.

> **Note:** Only orthogonal Tiled maps are supported.

## Options

| Option | Type | Description |
|--------|------|-------------|
| `tilemap` | `TiledTilemap \| string` | The Tiled map data, as a parsed object or an asset URL/name string of a loaded JSON. |
| `layerToRender` | `string` | The name of the Tiled layer to render. |

## Example

```typescript
import { Transform, TiledWrapper, TilemapRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TiledWrapper({ tilemap: "map.json", layerToRender: "Ground" }),
    new TilemapRenderer({
        layer: "Foreground",
        tileset: {
            image: this.assetManager.getImage("tileset.png"),
            width: 8,
            tileWidth: 16,
            tileHeight: 16,
        },
    }),
]);
```

The Tiled JSON is loaded through the [asset manager](../asset-manager.md) with `loadJson`, typically in the scene's `loadAssets` method. See [`TilemapRenderer`](tilemap-renderer.md) for the tileset configuration.
