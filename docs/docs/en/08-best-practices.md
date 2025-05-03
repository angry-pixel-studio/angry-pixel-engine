# Best Practices

This section collects recommendations and suggested patterns for working efficiently with the Angry Pixel Engine.

## Recommended directory structure

```plaintext
src
├── main.js / main.ts     (This is where you instantiate the Game)
├── config
│       ├── config.js / config.ts   (General game configuration)
│       ├── assets.js / assets.ts   (Asset list)
│       ├── layers.js / layers.ts   (Layer list for rendering and collisions)
│       └── other configuration files
├── component     (Custom components)
├── entity        (Archetypes or component array factories)
├── system        (Custom systems)
└── scene         (Game scenes)
```

## Optimizations

-   For repetitive operations, **reuse object instances** like `Vector2` or `Rectangle`.  
    Creating new instances every frame is costly and can create memory garbage.

-   Adjust the **physics engine frequency** according to the type of game and performance requirements.

-   In systems where a component will only have one instance, **caching the component** can avoid unnecessary lookups.  
    _Note:_ If the entity or component can be deleted or disabled at runtime, this may cause errors if not handled properly.

-   For games with many physics entities, consider **testing different broad phase methods**, such as **quadtree** or **spatial grid**.

-   Evaluate the collision detection type:
    -   **AABB**: very fast but limited to non-rotated rectangles and circles.
    -   **SAT**: more computationally expensive but supports collisions between arbitrary polygons.

## Performance limitations in web games

Due to the nature of browsers and the use of interpreted or JIT languages (like JavaScript/TypeScript), a web game **will never have the same performance** as a game developed in a compiled language such as C++ or Rust.  
This is due to:

-   Garbage collection overhead.
-   Threading and concurrency limitations in browsers.
-   Overhead from web APIs (such as WebGL vs. native graphics).
-   Security restrictions and sandboxing.

Still, with best practices and optimizations, excellent and scalable performance can be achieved for 2D games.
