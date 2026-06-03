# The Input Manager

The input manager reads input from four sources: keyboard, mouse, touch screen, and gamepads. It is read inside systems, usually in `onUpdate`.

In systems extending `GameSystem` it is available as `this.inputManager`. See [Custom Components and Systems](custom-components-and-systems.md).

```typescript
import { GameSystem } from "angry-pixel";

export class InputSystem extends GameSystem {
    onUpdate() {
        if (this.inputManager.keyboard.isPressed("Space")) {
            // jump
        }
    }
}
```

The manager exposes one object per source:

| Property | Source |
|----------|--------|
| `keyboard` | Keyboard |
| `mouse` | Mouse |
| `touchScreen` | Touch screen |
| `gamepads` | Connected gamepads (array) |

> **Note:** Input is disabled in headless mode.

## Keyboard

Keys are identified by their [`KeyboardEvent.code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) value, such as `"Space"`, `"KeyW"`, or `"ArrowUp"`.

| Member | Description |
|--------|-------------|
| `pressedKeys` | Array of the codes currently pressed. |
| `isPressed(code)` | `true` if the key is pressed. |
| `orPressed(codes)` | `true` if any of the keys is pressed. |
| `andPressed(codes)` | `true` if all of the keys are pressed. |
| `isPressedReturn(code, ifTrue, ifFalse)` | Returns one of two values depending on whether the key is pressed. |
| `orPressedReturn(codes, ifTrue, ifFalse)` | Like `isPressedReturn`, for any of the keys. |
| `andPressedReturn(codes, ifTrue, ifFalse)` | Like `isPressedReturn`, for all of the keys. |

```typescript
const { keyboard } = this.inputManager;

if (keyboard.isPressed("ArrowRight")) {
    // move right
}

if (keyboard.andPressed(["ControlLeft", "KeyC"])) {
    // both keys held together
}
```

## Mouse

| Member | Type | Description |
|--------|------|-------------|
| `leftButtonPressed` | `boolean` | Left button state. |
| `scrollButtonPressed` | `boolean` | Scroll (middle) button state. |
| `rightButtonPressed` | `boolean` | Right button state. |
| `positionInViewport` | `Vector2` | Cursor position in the viewport. |
| `hasMoved` | `boolean` | Whether the mouse moved this frame. |
| `wheelScroll` | `Vector2` | Wheel scroll amount. |

```typescript
const { mouse } = this.inputManager;

if (mouse.leftButtonPressed) {
    const position = mouse.positionInViewport;
    // act at the cursor position
}
```

## Touch screen

| Member | Type | Description |
|--------|------|-------------|
| `touching` | `boolean` | Whether the screen is being touched. |
| `interactions` | `TouchInteraction[]` | Active touch points. |

Each `TouchInteraction` has a `positionInViewport` (`Vector2`) and a `radius` (`Vector2`, the area of the touch).

```typescript
const { touchScreen } = this.inputManager;

if (touchScreen.touching) {
    const touch = touchScreen.interactions[0];
    // handle touch at touch.positionInViewport
}
```

## Gamepads

`gamepads` is an array of connected controllers. Access one by index, and guard against it being absent:

```typescript
const gamepad = this.inputManager.gamepads[0];

if (gamepad?.bottomFace) {
    // bottom face button (A on Xbox, B on Nintendo, X on PlayStation)
}

const move = gamepad?.leftStickAxes;
```

A controller exposes the following members:

| Member | Type | Description |
|--------|------|-------------|
| `connected` | `boolean` | Whether the controller is connected. |
| `id` | `string` | Controller identifier. |
| `index` | `number` | Controller index. |
| `bottomFace` / `rightFace` / `leftFace` / `topFace` | `boolean` | Face buttons. |
| `dpadUp` / `dpadDown` / `dpadLeft` / `dpadRight` | `boolean` | D-pad buttons. |
| `dpadAxes` | `Vector2` | D-pad as an axis. |
| `leftShoulder` / `rightShoulder` | `boolean` | Shoulder buttons. |
| `leftTrigger` / `rightTrigger` | `boolean` | Trigger buttons. |
| `back` / `start` | `boolean` | Back and start buttons. |
| `leftStickButton` / `rightStickButton` | `boolean` | Stick press buttons. |
| `leftStickAxes` / `rightStickAxes` | `Vector2` | Stick positions. |
| `leftStickHorizontal` / `leftStickVertical` | `number` | Left stick axis values. |
| `rightStickHorizontal` / `rightStickVertical` | `number` | Right stick axis values. |
| `anyButtonPressed` | `boolean` | Whether any button is pressed. |
| `buttons` | `Map<number, boolean>` | Raw button states. |
| `axes` | `Map<number, number>` | Raw axis values. |
| `vibrate(duration, weakMagnitude, strongMagnitude)` | — | Triggers vibration, if supported. |

```typescript
gamepad?.vibrate(200, 0.5, 0.5);
```
