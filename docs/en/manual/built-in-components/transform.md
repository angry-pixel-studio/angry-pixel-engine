# Transform

The `Transform` component defines an entity's position, scale, and rotation in the game world. It can be nested under a parent transform: child transforms combine with their parent's values, and a child can selectively ignore parts of the parent transform.

Most entities have a `Transform` — render and physics components use it to place the entity in the world.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | `Vector2` | `(0, 0)` | Position relative to the world origin, or to the parent if the entity has one. |
| `scale` | `Vector2` | `(1, 1)` | Scale on the x and y axes. |
| `rotation` | `number` | `0` | Rotation in radians. |
| `ignoreParentPosition` | `boolean` | `false` | If `true`, the parent's position is ignored. |
| `ignoreParentScale` | `boolean` | `false` | If `true`, the parent's scale is ignored. |
| `ignoreParentRotation` | `boolean` | `false` | If `true`, the parent's rotation is ignored. |

## Read-only properties

When an entity has a parent, `position`, `scale`, and `rotation` are relative to it. The resolved world-space values are exposed as read-only properties:

| Property | Type | Description |
|----------|------|-------------|
| `localPosition` | `Vector2` | Resolved world position. Equals `position` when there is no parent. |
| `localScale` | `Vector2` | Resolved world scale. Equals `scale` when there is no parent. |
| `localRotation` | `number` | Resolved world rotation. Equals `rotation` when there is no parent. |

## Example

```typescript
import { Transform, Vector2 } from "angry-pixel";

this.entityManager.createEntity([
    new Transform({
        position: new Vector2(100, 100),
        scale: new Vector2(2, 2),
        rotation: Math.PI / 4,
    }),
]);
```

See [Adding Entities to the Scene](../adding-entities-to-the-scene.md) for parent-child entity hierarchies.
