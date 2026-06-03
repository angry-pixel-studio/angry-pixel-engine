# PolygonCollider

The `PolygonCollider` component defines a convex polygon collision shape from a list of vertices. It can be used for physics interactions and collision detection. See [Physics](../physics.md) for an overview.

Only convex polygons are supported. Concave shapes must be split into multiple convex polygons.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `vertexModel` | `Vector2[]` | `[]` | The vertices that form the polygon. |
| `rotation` | `number` | `0` | Rotation in radians. |
| `offset` | `Vector2` | `(0, 0)` | Offset from the entity's position. |
| `layer` | `string` | `""` | The collision layer the collider belongs to. |
| `physics` | `boolean` | `true` | If `true`, the collider interacts with rigid bodies. |
| `ignoreCollisionsWithLayers` | `string[]` | `[]` | Layers this collider ignores. |

## Example

```typescript
import { Transform, PolygonCollider, Vector2 } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new PolygonCollider({
        vertexModel: [new Vector2(0, 16), new Vector2(16, 16), new Vector2(16, 0), new Vector2(0, 0)],
        layer: "Ground",
    }),
]);
```

Add a [`RigidBody`](rigid-body.md) to the same entity to make it move and respond to physics.
