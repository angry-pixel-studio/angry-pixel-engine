# InputManager

## Overview

The `InputManager` manages all player input sources, including keyboard, mouse, touch screen, and gamepads.  
It provides access to the current input states and query methods to easily detect player interactions.

## Responsibilities

-   Monitor the state of keyboard keys (`Keyboard`).
-   Monitor mouse buttons and position (`Mouse`).
-   Manage touch screen input (`TouchScreen`).
-   Manage gamepad controllers (`GamepadController`).

## Usage Examples

### Keyboard

```typescript
// Single key press
if (inputManager.keyboard.isPressed("KeyW")) {
    playerComponent.moveDirection.y = 1;
}

// Multiple key press (OR)
if (inputManager.keyboard.orPressed(["KeyW", "ArrowUp"])) {
    playerComponent.moveDirection.y = 1;
}

// Combined key press (AND)
if (inputManager.keyboard.andPressed(["ShiftLeft", "KeyW"])) {
    playerComponent.moveDirection.y = 1;
    playerComponent.running = true;
}

// Using custom return value
playerComponent.speed = inputManager.keyboard.isPressedReturn("ShiftLeft", 10, 5);
```

### Mouse

```typescript
// Fire when left button is pressed
if (inputManager.mouse.leftButtonPressed) {
    weaponComponent.isFiring = true;
}

// Aim when right button is held
if (inputManager.mouse.rightButtonPressed) {
    weaponComponent.isAiming = true;
}

// Get current cursor position
playerComponent.cursorPosition = inputManager.mouse.positionInViewport;

// Scroll wheel to change weapons
if (inputManager.mouse.wheelScroll.y > 0) {
    inventoryComponent.nextWeapon = true;
} else if (inputManager.mouse.wheelScroll.y < 0) {
    inventoryComponent.previousWeapon = true;
}
```

### Touch Screen

```typescript
// Detect if the screen is being touched
if (inputManager.touchScreen.touching) {
    const touch = inputManager.touchScreen.interactions[0];

    // Aim at the touch position
    aimComponent.targetPosition = touch.positionInViewport;

    // Mark that the screen is being touched
    inputComponent.isTouching = true;
}
```

### Gamepad

```typescript
const gamepad = inputManager.gamepads[0];

if (gamepad) {
    // Move with the left stick
    playerComponent.moveDirection = gamepad.leftStickAxes;

    // Jump with bottom face button
    playerComponent.isJumping = gamepad.bottomFace;

    // Roll with top face button
    playerComponent.isRolling = gamepad.topFace;

    // Fire with right trigger
    weaponComponent.isFiring = gamepad.rightTrigger;

    // Change weapons using D-pad
    inventoryComponent.previousWeapon = gamepad.dpadLeft;
    inventoryComponent.nextWeapon = gamepad.dpadRight;

    // Trigger vibration when damaged
    if (healthComponent.wasDamaged) {
        gamepad.vibrate(300, 0.4, 0.8);
    }
}
```

## Notes

-   Use `orPressed` and `andPressed` to easily check multiple keys.
-   Sticks and D-pad return normalized vectors (`Vector2`) between -1 and 1.
-   Multiple gamepads are supported simultaneously.
-   Vibration can be configured for duration and intensity.
-   Input states are updated every frame, and systems process these data.
