## Camera

The `Camera` component controls which layers and objects are rendered to the screen.  
It allows configuring multiple render layers, adjusting the zoom level, and setting the rendering order (depth) when using multiple cameras.  
It can also enable the display of debug information for development purposes.

### Properties

| Property | Type       | Description                                                                                        |
| -------- | ---------- | -------------------------------------------------------------------------------------------------- |
| `layers` | `string[]` | Layers to be rendered by this camera. Layers are rendered in ascending order.                      |
| `zoom`   | `number`   | Camera zoom level. Default value is `1`.                                                           |
| `depth`  | `number`   | When using multiple cameras, determines which camera is rendered first. Lower values render first. |
| `debug`  | `boolean`  | If `true`, allows this camera to render debug information. Default is `false`.                     |

### Example

```typescript
const camera = new Camera({
    layers: ["Default", "UI", "Background"],
    zoom: 1.5,
    depth: 0,
    debug: true,
});
```

### Notes

-   The `layers` property determines which entities and render components will be visible to this camera.
-   If multiple cameras are used, their rendering order is controlled by the `depth` property.
-   The `debug` option enables displaying additional information useful during development (such as colliders or camera bounds).
-   The component only defines the camera’s properties. Rendering logic and position updates are handled by the system responsible for processing cameras.
