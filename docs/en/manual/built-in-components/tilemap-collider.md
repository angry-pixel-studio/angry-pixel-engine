# TilemapCollider

The `TilemapCollider` component generates collision shapes from a tilemap's edges. It works together with a [`TilemapRenderer`](tilemap-renderer.md) on the same entity. See [Physics](../physics.md) for an overview.

When `composite` is `false`, it creates an individual rectangle collider for each edge tile. When `composite` is `true`, it generates connected line segments that follow the tilemap's outer edges, which is more efficient.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `composite` | `boolean` | `true` | Generate connected line segments along the outer edges instead of one collider per tile. |
| `offset` | `Vector2` | `(0, 0)` | Offset from the entity's position. |
| `layer` | `string` | `""` | The collision layer the collider belongs to. |
| `physics` | `boolean` | `true` | If `true`, the collider interacts with rigid bodies. |
| `ignoreCollisionsWithLayers` | `string[]` | `[]` | Layers this collider ignores. |

> **Note:** The collider shapes are generated once and cannot be modified afterwards. To change them, create a new `TilemapCollider`.

## Example

```typescript
import { Transform, TilemapRenderer, TilemapCollider } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TilemapRenderer({
        tileset: {
            image: this.assetManager.getImage("tileset.png"),
            width: 8,
            tileWidth: 16,
            tileHeight: 16,
        },
    }),
    new TilemapCollider({ composite: true, layer: "Ground" }),
]);
```
