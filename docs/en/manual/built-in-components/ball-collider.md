# BallCollider

The `BallCollider` component defines a circular collision shape. It can be used for physics interactions and collision detection. See [Physics](../physics.md) for an overview.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `radius` | `number` | `0` | Radius of the circle. |
| `offset` | `Vector2` | `(0, 0)` | Offset from the entity's position. |
| `layer` | `string` | `""` | The collision layer the collider belongs to. |
| `physics` | `boolean` | `true` | If `true`, the collider interacts with rigid bodies. |
| `ignoreCollisionsWithLayers` | `string[]` | `[]` | Layers this collider ignores. |

## Example

```typescript
import { Transform, BallCollider } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new BallCollider({ radius: 8, layer: "Ball" }),
]);
```

Add a [`RigidBody`](rigid-body.md) to the same entity to make it move and respond to physics.
