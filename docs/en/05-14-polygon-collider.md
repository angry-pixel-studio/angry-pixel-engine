## PolygonCollider

The `PolygonCollider` component defines a convex polygon-shaped collision area for an entity.  
It can be used for both collision detection and physical interactions.  
The shape is determined by a series of vertices forming a closed convex polygon.  
Note: Only convex polygons are supported. Concave shapes must be divided into multiple convex polygons.

### Properties

| Property                     | Type        | Description                                                                                                  |
| ---------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| `vertexModel`                | `Vector2[]` | Collection of vertices defining the polygon's outline.                                                       |
| `offset`                     | `Vector2`   | Offset from the entity’s `Transform` origin.                                                                 |
| `rotation`                   | `number`    | Rotation of the edges in radians.                                                                            |
| `layer`                      | `string`    | Collision layer. Defines which other layers it can interact with.                                            |
| `physics`                    | `boolean`   | If `true`, the collider will participate in physics simulations (requires the entity to have a `RigidBody`). |
| `ignoreCollisionsWithLayers` | `string[]`  | List of layers this collider should ignore.                                                                  |
| `shapes`                     | `Shape[]`   | **Internal use.** Geometric shapes used by the collision detection system.                                   |

### Minimal example

```typescript
const polygonCollider = new PolygonCollider({
    vertexModel: [new Vector2(0, 16), new Vector2(16, 16), new Vector2(16, 0), new Vector2(0, 0)],
    layer: "player",
});
```

### Full example

```typescript
const polygonCollider = new PolygonCollider({
    vertexModel: [new Vector2(0, 16), new Vector2(16, 16), new Vector2(16, 0), new Vector2(0, 0)],
    rotation: 0,
    offset: new Vector2(0, 0),
    layer: "player",
    physics: true,
    ignoreCollisionsWithLayers: ["friendlyProjectiles"],
});
```

### Example of querying collisions using `CollisionRepository`

```typescript
// Get all collisions for the player
const collisions = collisionRepository.findCollisionsForCollider(polygonCollider);

// Filter collisions with enemies only
const enemyCollisions = collisionRepository.findCollisionsForColliderAndLayer(polygonCollider, "enemy");

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
-   Only **convex polygons** are supported. Concave shapes must be split into multiple convex polygons if needed.
