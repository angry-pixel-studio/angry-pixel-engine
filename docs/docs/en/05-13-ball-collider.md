## BallCollider

The `BallCollider` component defines a circular collision shape for an entity.  
It can be used for both collision detection and physical interactions.  
It allows specifying the radius and offset of the collider, as well as which layers it should or should not interact with.

### Properties

| Property                     | Type       | Description                                                                                                  |
| ---------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| `radius`                     | `number`   | Radius of the circle (in pixels or world units).                                                             |
| `offset`                     | `Vector2`  | Offset from the entity’s `Transform` origin.                                                                 |
| `layer`                      | `string`   | Collision layer. Defines which other layers it can interact with.                                            |
| `physics`                    | `boolean`  | If `true`, the collider will participate in physics simulations (requires the entity to have a `RigidBody`). |
| `ignoreCollisionsWithLayers` | `string[]` | List of layers this collider should ignore.                                                                  |
| `shapes`                     | `Shape[]`  | **Internal use.** Geometric shapes used by the collision detection system.                                   |

### Minimal example

```typescript
const ballCollider = new BallCollider({
    radius: 16,
    layer: "player",
});
```

### Full example

```typescript
const ballCollider = new BallCollider({
    radius: 16,
    offset: new Vector2(0, 0),
    layer: "player",
    physics: true,
    ignoreCollisionsWithLayers: ["friendlyProjectiles"],
});
```

### Example of querying collisions using `CollisionRepository`

```typescript
// Get all collisions for the player
const collisions = collisionRepository.findCollisionsForCollider(ballCollider);

// Filter collisions with enemies only
const enemyCollisions = collisionRepository.findCollisionsForColliderAndLayer(ballCollider, "enemy");

for (const collision of enemyCollisions) {
    console.log(`Collided with entity ID: ${collision.remoteEntity}`);
    console.log(`Collision direction: ${collision.resolution.direction}`);
    console.log(`Penetration depth: ${collision.resolution.penetration}`);
}
```

### Notes

-   If `physics` is `false`, the collider will only be used for collision detection and will not move the entity upon penetration.
-   The `physics` property **only has an effect if the entity also has a `RigidBody`**.
-   The `ignoreCollisionsWithLayers` property allows dynamically excluding entire collision layers without modifying the physics system logic.
