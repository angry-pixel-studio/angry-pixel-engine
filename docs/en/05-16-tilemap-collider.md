## TilemapCollider

The `TilemapCollider` component automatically generates collision shapes for the edges of a `tilemap`.  
It can be used for both collision detection and physical interactions.  
It allows choosing between individual colliders for each tile or composite colliders that optimize performance by generating connected line segments along the outer edges.  
**For this component to work properly, the entity must also have a `TilemapRenderer` that provides the tilemap from which the collisions will be generated.**

**Limitations:** The collision shapes are generated once and cannot be modified after creation. To update the collision shapes, you must create a new instance of `TilemapCollider`.

### Properties

| Property                     | Type       | Description                                                                                                                                                         |
| ---------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `composite`                  | `boolean`  | If `true`, generates connected line segments along the outer edges of the tilemap. If `false`, creates individual rectangle colliders for each tile with collision. |
| `layer`                      | `string`   | Collision layer. Defines which other layers it can interact with.                                                                                                   |
| `ignoreCollisionsWithLayers` | `string[]` | List of layers this collider should ignore.                                                                                                                         |
| `offset`                     | `Vector2`  | Offset from the entity’s `Transform` origin.                                                                                                                        |
| `physics`                    | `boolean`  | If `true`, the collider will participate in physics simulations (requires the entity to have a `RigidBody`).                                                        |
| `shapes`                     | `Shape[]`  | **Internal use.** Geometric shapes used by the collision detection system.                                                                                          |

### Minimal example

```typescript
const tilemapCollider = new TilemapCollider({
    composite: true,
    layer: "ground",
});
```

### Full example

```typescript
const tilemapCollider = new TilemapCollider({
    composite: true,
    offset: new Vector2(0, 0),
    layer: "ground",
    physics: true,
    ignoreCollisionsWithLayers: ["ghost"],
});
```

### Example of querying collisions using `CollisionRepository`

```typescript
// Get all collisions for the tilemap
const collisions = collisionRepository.findCollisionsForCollider(tilemapCollider);

// Filter collisions with enemies only
const enemyCollisions = collisionRepository.findCollisionsForColliderAndLayer(tilemapCollider, "enemy");

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
-   When using `composite: true`, the collider generates fewer shapes and improves performance for large tilemaps.
-   The collision shapes **cannot be modified after creation**. To change the collision map, you must create a new `TilemapCollider`.
-   **Requires the entity to also have a `TilemapRenderer` that defines the tilemap used to generate the collisions.**
