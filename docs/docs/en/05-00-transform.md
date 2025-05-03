## Transform

The `Transform` component defines an entity’s position, scale, and rotation in the game world.  
It supports hierarchical relationships, allowing a transform to be parented to another, so child transforms inherit and combine with their parent's transformations.

This component provides both local and world-space values and allows selectively ignoring parent transformations for position, scale, and rotation.

### Properties

| Property                      | Type      | Description                                                                                 |
| ----------------------------- | --------- | ------------------------------------------------------------------------------------------- |
| `position`                    | `Vector2` | Position relative to the simulated world’s origin, or relative to the parent if one exists. |
| `scale`                       | `Vector2` | Scale factors along the X and Y axes.                                                       |
| `rotation`                    | `number`  | Rotation expressed in radians.                                                              |
| `ignoreParentPosition`        | `boolean` | If `true`, ignores the parent’s position.                                                   |
| `ignoreParentScale`           | `boolean` | If `true`, ignores the parent’s scale.                                                      |
| `ignoreParentRotation`        | `boolean` | If `true`, ignores the parent’s rotation.                                                   |
| `localPosition` _(read-only)_ | `Vector2` | Actual world position (same as `position` if there’s no parent).                            |
| `localScale` _(read-only)_    | `Vector2` | Actual world scale (same as `scale` if there’s no parent).                                  |
| `localRotation` _(read-only)_ | `number`  | Actual world rotation (same as `rotation` if there’s no parent).                            |

### Example

```typescript
const transform = new Transform({
    position: new Vector2(100, 100),
    scale: new Vector2(2, 2),
    rotation: Math.PI / 4,
});
```

### Notes

-   Hierarchical transforms allow powerful parent-child relationships for grouping entities.
-   The `ignoreParent*` properties provide flexibility to override inherited transformations.
