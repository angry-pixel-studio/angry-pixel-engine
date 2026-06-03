# BoxCollider

The `BoxCollider` component defines a rectangular collision shape. It can be used for physics interactions and collision detection. See [Physics](../physics.md) for an overview.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | `number` | `0` | Width of the rectangle. |
| `height` | `number` | `0` | Height of the rectangle. |
| `rotation` | `number` | `0` | Rotation in radians. |
| `offset` | `Vector2` | `(0, 0)` | Offset from the entity's position. |
| `layer` | `string` | `""` | The collision layer the collider belongs to. |
| `physics` | `boolean` | `true` | If `true`, the collider interacts with rigid bodies. |
| `ignoreCollisionsWithLayers` | `string[]` | `[]` | Layers this collider ignores. |

## Example

```typescript
import { Transform, BoxCollider } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new BoxCollider({ width: 16, height: 16, layer: "Player" }),
]);
```

Add a [`RigidBody`](rigid-body.md) to the same entity to make it move and respond to physics.
