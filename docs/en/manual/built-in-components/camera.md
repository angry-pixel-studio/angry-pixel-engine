# Camera

The `Camera` component controls which layers are rendered to the screen. A camera is an entity with a `Camera` component and a [`Transform`](transform.md). A scene needs at least one camera, and nothing is drawn unless a camera renders the layer the content is on. See [Rendering](../rendering.md) for an overview.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `layers` | `string[]` | `["Default"]` | The layers this camera renders, drawn in the order listed. |
| `zoom` | `number` | `1` | Zoom level. |
| `depth` | `number` | `0` | With multiple cameras, the lower depth renders first. |
| `debug` | `boolean` | `false` | Renders debug data when `true`. |

## Example

```typescript
import { Transform, Camera } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new Camera({ layers: ["Default", "UI"], zoom: 1 }),
]);
```

Multiple cameras can be used together — for example, one for the game world and one for the UI — ordered by their `depth`.
