# Physics

The engine includes a 2D physics system with collision detection. It runs in the physics phase of the [game loop](../welcome/architecture.md). Physics is built from three pieces:

- **Colliders** define an entity's collision shape and the layer it belongs to.
- **RigidBody** makes an entity move under velocity, acceleration, and gravity.
- **CollisionRepository** lets systems query which colliders are currently colliding.

## RigidBody

The [`RigidBody`](built-in-components/rigid-body.md) component enables physics movement for an entity. There are three body types:

| Type | Description |
|------|-------------|
| `RigidBodyType.Dynamic` | Affected by gravity and velocity, and moved by collisions with other bodies. For objects that need full physical behavior. |
| `RigidBodyType.Kinematic` | Moved by applied velocity, but unaffected by gravity or collisions from other bodies. For moving platforms or scripted movement. |
| `RigidBodyType.Static` | Immobile. Unaffected by velocity or gravity. For walls and level geometry. |

| Option | Type | Description |
|--------|------|-------------|
| `type` | `RigidBodyType` | The body type. Defaults to `Dynamic`. |
| `velocity` | `Vector2` | Velocity in pixels per second. For Dynamic and Kinematic bodies. |
| `acceleration` | `Vector2` | Acceleration in pixels per second squared. For Dynamic and Kinematic bodies. |
| `gravity` | `number` | Gravity in pixels per second squared. For Dynamic bodies only. |

A RigidBody works together with a collider on the same entity. To make an entity move and collide, add both a collider and a RigidBody:

```typescript
import { Transform, RigidBody, RigidBodyType, BoxCollider } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new BoxCollider({ width: 16, height: 16, layer: "Player" }),
    new RigidBody({ type: RigidBodyType.Dynamic, gravity: 1000 }),
]);
```

## Colliders

A collider defines a collision shape. The engine provides five collider components:

| Component | Shape |
|-----------|-------|
| [`BoxCollider`](built-in-components/box-collider.md) | Rectangle. |
| [`BallCollider`](built-in-components/ball-collider.md) | Circle. |
| [`PolygonCollider`](built-in-components/polygon-collider.md) | Convex polygon. |
| [`EdgeCollider`](built-in-components/edge-collider.md) | Connected line segments. |
| [`TilemapCollider`](built-in-components/tilemap-collider.md) | Colliders generated from a tilemap's edges. |

All colliders share these options:

| Option | Type | Description |
|--------|------|-------------|
| `layer` | `string` | The collision layer the collider belongs to. |
| `physics` | `boolean` | `true` if the collider interacts with rigid bodies. Defaults to `true`. |
| `offset` | `Vector2` | Offset from the entity's position. |
| `ignoreCollisionsWithLayers` | `string[]` | Layers this collider ignores. |

Each shape adds its own options — for example, [`BoxCollider`](built-in-components/box-collider.md) has `width`, `height`, and `rotation`; [`BallCollider`](built-in-components/ball-collider.md) has `radius`. See [Built-in Components](built-in-components/index.md) for the full options of each collider.

A collider can be added without a RigidBody when an entity only needs collision detection, such as a static wall:

```typescript
import { Transform, BoxCollider } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new BoxCollider({ width: 64, height: 16, layer: "Wall" }),
]);
```

When `physics` is `true`, the collider participates in physics resolution with rigid bodies. When `false`, it is only used for collision detection — useful for triggers and sensors that report overlaps without pushing other bodies.

## Collision layers

Each collider belongs to a layer. Which layers are allowed to collide is configured with the collision matrix in the game configuration. See [The Game Class](game-class.md).

```typescript
collisions: {
    collisionMatrix: [
        ["Player", "Enemy"],
        ["Player", "Wall"],
    ],
}
```

With this matrix, players collide with enemies and walls, but enemies and walls do not collide with each other.

A collider can also opt out of specific layers with `ignoreCollisionsWithLayers`.

## Querying collisions

The `CollisionRepository` reports the collisions detected in the current frame. In systems extending `GameSystem` it is available as `this.collisionRepository`. See [Custom Components and Systems](custom-components-and-systems.md).

| Method | Description |
|--------|-------------|
| `findCollisionsForCollider(collider)` | Collisions where the given collider is the local collider. |
| `findCollisionsForColliderAndLayer(collider, layer)` | Collisions with a remote collider on the given layer. |
| `findAll()` | All current collisions. |

```typescript
import { GameSystem, BoxCollider } from "angry-pixel";
import { Player } from "../component/Player";

export class PlayerCollisionSystem extends GameSystem {
    onUpdate() {
        this.entityManager.search(Player, (player, entity) => {
            const collider = this.entityManager.getComponent(entity, BoxCollider);
            const collisions = this.collisionRepository.findCollisionsForColliderAndLayer(collider, "Enemy");

            for (const collision of collisions) {
                // react to hitting an enemy
            }
        });
    }
}
```

Each `Collision` contains:

| Field | Type | Description |
|-------|------|-------------|
| `localEntity` | `Entity` | The entity the queried collider belongs to. |
| `localCollider` | `Collider` | The queried collider. |
| `remoteEntity` | `Entity` | The other entity in the collision. |
| `remoteCollider` | `Collider` | The other collider. |
| `resolution` | `CollisionResolution` | Collision data: `penetration` (overlap in pixels) and `direction` (`Vector2`). |
