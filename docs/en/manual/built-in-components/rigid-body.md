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
| `staticForLayers` | `string[]` | `[]` | Collision layers for which this body behaves as static (see below). |

## Static for layers

When two Dynamic bodies collide, both are repositioned by half the penetration. When a Dynamic body collides with a Static one, only the Dynamic body is repositioned.

`staticForLayers` lets a Dynamic body behave as static toward specific layers. When a Dynamic body whose collider layer is listed in `staticForLayers` collides with this body, only the other body is repositioned — this one stays in place, as if it were static. For every other collision, the body still behaves as its own type.

For example, a moving platform that should push the player but never be pushed back can list the player's collision layer:

```typescript
new RigidBody({ type: RigidBodyType.Dynamic, staticForLayers: ["Player"] });
```

## Example

```typescript
import { Transform, BoxCollider, RigidBody, RigidBodyType } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new BoxCollider({ width: 16, height: 16, layer: "Player" }),
    new RigidBody({ type: RigidBodyType.Dynamic, gravity: 1000 }),
]);
```
