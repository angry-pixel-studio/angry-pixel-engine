# RigidBody

The `RigidBody` component enables physics movement for an entity, making it move under velocity, acceleration, and gravity. It works together with a collider on the same entity. See [Physics](../physics.md) for an overview.

## Body types

| Type | Description |
|------|-------------|
| `RigidBodyType.Dynamic` | Affected by gravity and velocity, and moved by collisions with other bodies. For objects that need full physical behavior. |
| `RigidBodyType.Kinematic` | Moved by applied velocity, but unaffected by gravity or collisions from other bodies. For moving platforms or scripted movement. |
| `RigidBodyType.Static` | Immobile. Unaffected by velocity or gravity. For walls and level geometry. |

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `RigidBodyType` | `Dynamic` | The body type. |
| `velocity` | `Vector2` | `(0, 0)` | Velocity in pixels per second. For Dynamic and Kinematic bodies. |
| `acceleration` | `Vector2` | `(0, 0)` | Acceleration in pixels per second squared. For Dynamic and Kinematic bodies. |
| `gravity` | `number` | `0` | Gravity in pixels per second squared. For Dynamic bodies only. |

## Example

```typescript
import { Transform, BoxCollider, RigidBody, RigidBodyType } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new BoxCollider({ width: 16, height: 16, layer: "Player" }),
    new RigidBody({ type: RigidBodyType.Dynamic, gravity: 1000 }),
]);
```
