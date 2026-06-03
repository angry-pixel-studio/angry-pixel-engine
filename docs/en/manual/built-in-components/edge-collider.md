# EdgeCollider

The `EdgeCollider` component defines a collision shape made of connected line segments, formed from a list of vertices. It can be used for physics interactions and collision detection. See [Physics](../physics.md) for an overview.

It is ideal for irregular surfaces, slopes, and concave shapes, which a single [`PolygonCollider`](polygon-collider.md) cannot represent.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `vertexModel` | `Vector2[]` | `[]` | The vertices that form the connected edges. |
| `rotation` | `number` | `0` | Rotation in radians. |
| `offset` | `Vector2` | `(0, 0)` | Offset from the entity's position. |
| `layer` | `string` | `""` | The collision layer the collider belongs to. |
| `physics` | `boolean` | `true` | If `true`, the collider interacts with rigid bodies. |
| `ignoreCollisionsWithLayers` | `string[]` | `[]` | Layers this collider ignores. |

## Example

```typescript
import { Transform, EdgeCollider, Vector2 } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new EdgeCollider({
        vertexModel: [new Vector2(0, 0), new Vector2(16, 0), new Vector2(32, 8)],
        layer: "Ground",
    }),
]);
```

Add a [`RigidBody`](rigid-body.md) to the same entity to make it move and respond to physics.
