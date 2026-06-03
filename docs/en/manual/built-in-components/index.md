# Built-in Components

The engine ships a set of built-in components for common game features. They are attached to entities the same way as custom components, through the entity manager or archetypes. See [Adding Entities to the Scene](../adding-entities-to-the-scene.md).

The components are grouped into three categories.

## General purpose

| Component | Description |
|-----------|-------------|
| [`Transform`](transform.md) | Defines an entity's position, scale, and rotation in the game world. |
| [`Animator`](animator.md) | Manages sprite animations through a map of named animations. |
| [`AudioPlayer`](audio-player.md) | Plays, pauses, and stops audio sources. |
| [`Button`](button.md) | An interactive button that can be clicked or pressed. |
| [`TiledWrapper`](tiled-wrapper.md) | Wraps a Tiled map editor tilemap for use with tilemap components. |

## Physics

See [Physics](../physics.md) for how these components work together.

| Component | Description |
|-----------|-------------|
| [`RigidBody`](rigid-body.md) | Enables physics movement under velocity, acceleration, and gravity. |
| [`BoxCollider`](box-collider.md) | Rectangular collision shape. |
| [`BallCollider`](ball-collider.md) | Circular collision shape. |
| [`PolygonCollider`](polygon-collider.md) | Convex polygon collision shape. |
| [`EdgeCollider`](edge-collider.md) | Collision shape made of connected line segments. |
| [`TilemapCollider`](tilemap-collider.md) | Collision shapes generated from a tilemap's edges. |

## Rendering

See [Rendering](../rendering.md) for how cameras, layers, and render components work together.

| Component | Description |
|-----------|-------------|
| [`Camera`](camera.md) | Controls which layers are rendered to the screen. |
| [`SpriteRenderer`](sprite-renderer.md) | Renders images (sprites). |
| [`TextRenderer`](text-renderer.md) | Renders text. |
| [`TilemapRenderer`](tilemap-renderer.md) | Renders tile-based maps from a tileset image. |
| [`MaskRenderer`](mask-renderer.md) | Renders filled shapes (rectangle, circle, polygon). |
| [`GeometricRenderer`](geometric-renderer.md) | Renders hollow (stroke-only) shapes and lines. |
| [`LightRenderer`](light-renderer.md) | Renders a circular light source. Requires a `DarknessRenderer` in the scene. |
| [`DarknessRenderer`](darkness-renderer.md) | Renders a darkness mask, affected by light renderers. |
| [`VideoRenderer`](video-renderer.md) | Renders video content. |
