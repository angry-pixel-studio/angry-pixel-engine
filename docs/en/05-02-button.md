## Button

The `Button` component creates an interactive button that can be clicked or pressed.  
It supports rectangular or circular shapes and can be configured with dimensions, position offset, touch input support, and functions to execute when the button is clicked or pressed.

### Properties

| Property                  | Type          | Description                                                                                     |
| ------------------------- | ------------- | ----------------------------------------------------------------------------------------------- |
| `shape`                   | `ButtonShape` | The shape of the button: `Rectangle` or `Circumference`.                                        |
| `width`                   | `number`      | Width in pixels (only for rectangular buttons).                                                 |
| `height`                  | `number`      | Height in pixels (only for rectangular buttons).                                                |
| `radius`                  | `number`      | Radius in pixels (only for circular buttons).                                                   |
| `touchEnabled`            | `boolean`     | If `true`, enables interaction with touch screens.                                              |
| `offset`                  | `Vector2`     | Offset on the X and Y axes relative to the entity’s center.                                     |
| `pressed` _(read-only)_   | `boolean`     | Returns `true` if the button is currently pressed.                                              |
| `mouseOver` _(read-only)_ | `boolean`     | Returns `true` if the mouse cursor is over the button.                                          |
| `onClick`                 | `() => void`  | Function to execute when the button is clicked.                                                 |
| `onPressed`               | `() => void`  | Function to execute when the button is pressed (maintains the pressed state while interacting). |

### Example

```typescript
const button = new Button({
    shape: ButtonShape.Rectangle,
    width: 100,
    height: 50,
    offset: new Vector2(0, 0),
    touchEnabled: true,
    onClick: () => console.log("Button clicked!"),
    onPressed: () => console.log("Button pressed!"),
});
```

### Notes

-   The `onClick` and `onPressed` functions are executed in response to user interactions.
-   The component supports both mouse and touch input (`touchEnabled`).
-   Interaction detection and the execution of the callback functions are handled by the system responsible for processing `Button` components. The component itself only defines the properties and callbacks and does not perform interaction logic directly.
