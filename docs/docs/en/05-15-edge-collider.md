## EdgeCollider

The `EdgeCollider` component defines a collision shape made up of connected line segments.  
It can be used for both collision detection and physical interactions.  
The shape is determined by a series of vertices that create edges between them.  
It allows applying offset and rotation, and specifying collision layers.  
**Unlike other colliders, the `EdgeCollider` allows defining concave collision areas.**

### Properties

| Property                     | Type        | Description                                                                                                  |
| ---------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| `vertexModel`                | `Vector2[]` | Collection of vertices defining the points to be connected by line segments (edges).                         |
| `offset`                     | `Vector2`   | Offset from the entity’s `Transform` origin.                                                                 |
| `rotation`                   | `number`    | Rotation of the segments in radians.                                                                         |
| `layer`                      | `string`    | Collision layer. Defines which other layers it can interact with.                                            |
| `physics`                    | `boolean`   | If `true`, the collider will participate in physics simulations (requires the entity to have a `RigidBody`). |
| `ignoreCollisionsWithLayers` | `string[]`  | List of layers this collider should ignore.                                                                  |
| `shapes`                     | `Shape[]`   | **Internal use.** Geometric shapes used by the collision detection system.                                   |

### Minimal example

```typescript
const edgeCollider = new EdgeCollider({
    vertexModel: [new Vector2(0, 16), new Vector2(16, 16)],
    layer: "ground",
});
```

### Full example

```typescript
const edgeCollider = new EdgeCollider({
    vertexModel: [new Vector2(0, 16), new Vector2(16, 16)],
    rotation: 0,
    offset: new Vector2(0, 0),
    layer: "ground",
    physics: true,
    ignoreCollisionsWithLayers: ["ghost"],
});
```

### Example of querying collisions using `CollisionRepository`

```typescript
// Get all collisions for the player
const collisions = collisionRepository.findCollisionsForCollider(edgeCollider);

// Filter collisions with enemies only
const enemyCollisions = collisionRepository.findCollisionsForColliderAndLayer(edgeCollider, "enemy");

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
-   This collider type is ideal for defining floors, platforms, walls, or map boundaries using line segments instead of solid areas.
-   **Allows defining concave collision areas**, unlike the `PolygonCollider` which only supports convex polygons.
