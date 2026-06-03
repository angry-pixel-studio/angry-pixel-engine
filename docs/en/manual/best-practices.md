# Best Practices

## Optimizations

- For repetitive operations, reuse object instances like [`Vector2`](maths/vector2.md) or [`Rectangle`](maths/rectangle.md). Creating new instances every frame is costly and produces memory garbage. The static [`Vector2`](maths/vector2.md) operations support this directly: methods like `Vector2.add(out, a, b)` write the result into an output vector you provide, so the same vector can be reused instead of allocating a new one each frame.
- In per-frame loops, prefer the callback form of `entityManager.search`. It iterates the entities directly without allocating an intermediate array, unlike the form that returns a collection. See [The Entity Manager](entity-manager.md).
- Disable entities and components instead of destroying and recreating them. Disabled entities are skipped by systems, so toggling them is cheaper than repeatedly creating and removing entities (a form of object pooling).
- Adjust the physics engine frequency (`physicsFramerate`) according to the type of game and its performance requirements. See [The Game Class](game-class.md).
- In systems where a component will only ever have one instance, caching the component can avoid unnecessary lookups.

  > **Note:** If the entity or component can be deleted or disabled at runtime, a cached reference may cause errors if it is not handled properly.

- Prefer `Static` and `Kinematic` rigid bodies over `Dynamic` when full physics simulation is not needed. `Static` bodies are the most efficient, and `Kinematic` bodies are more efficient than `Dynamic` ones. See [Physics](physics.md).
- Limit collision checks by configuring the collision matrix and using `ignoreCollisionsWithLayers`. Fewer layer pairs means fewer checks. See [Physics](physics.md).
- For tilemaps used as collision geometry, set `composite: true` on the [`TilemapCollider`](built-in-components/tilemap-collider.md) to generate connected edge segments instead of one collider per tile. For rendering large tilemaps, use the [`TilemapRenderer`](built-in-components/tilemap-renderer.md) `chunks` option.
- For games with many physics entities, test different broad phase methods, such as quad tree or spatial grid. See [Physics](physics.md).
- Evaluate the collision detection method:
    - **AABB:** very fast, but limited to non-rotated rectangles and circles.
    - **SAT:** more computationally expensive, but supports collisions between arbitrary polygons.

## Performance limitations in web games

Due to the nature of browsers and the use of interpreted or JIT-compiled languages (such as JavaScript and TypeScript), a web game will never reach the same performance as a game developed in a compiled language like C++ or Rust. This is due to:

- Garbage collection overhead.
- Threading and concurrency limitations in browsers.
- Overhead from web APIs (such as WebGL compared to native graphics).

Even so, with good practices and optimizations, excellent and scalable performance can be achieved for 2D games.
