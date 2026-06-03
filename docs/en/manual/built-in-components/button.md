# Button

The `Button` component creates an interactive area that can be clicked or pressed. It supports rectangular or circular shapes and reports its state through event handlers. It uses the entity's [`Transform`](transform.md) for position.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `shape` | `ButtonShape` | — | `ButtonShape.Rectangle` or `ButtonShape.Circumference`. |
| `width` | `number` | `0` | Width in pixels. Rectangle shape only. |
| `height` | `number` | `0` | Height in pixels. Rectangle shape only. |
| `radius` | `number` | `0` | Radius in pixels. Circumference shape only. |
| `touchEnabled` | `boolean` | `true` | Enables interaction with touch screens. |
| `offset` | `Vector2` | `(0, 0)` | Offset from the entity's position. |
| `onClick` | `() => void` | — | Called when the button is clicked. |
| `onPressed` | `() => void` | — | Called while the button is pressed. |

## Read-only properties

| Property | Type | Description |
|----------|------|-------------|
| `pressed` | `boolean` | `true` while the button is pressed. |
| `mouseOver` | `boolean` | `true` while the cursor is over the button. |

## Example

```typescript
import { Transform, Button, ButtonShape } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new Button({
        shape: ButtonShape.Rectangle,
        width: 100,
        height: 50,
        onClick: () => console.log("clicked"),
    }),
]);
```
