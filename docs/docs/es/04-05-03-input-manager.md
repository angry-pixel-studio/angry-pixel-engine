# InputManager

## Resumen

El `InputManager` gestiona todas las fuentes de entrada del jugador, incluyendo teclado, ratón, pantalla táctil y gamepads.  
Proporciona acceso a las entradas actuales y métodos de consulta para detectar interacciones del jugador de manera sencilla.

## Responsabilidades

-   Controlar el estado de las teclas del teclado (`Keyboard`).
-   Controlar el estado de los botones y la posición del ratón (`Mouse`).
-   Gestionar las entradas de pantalla táctil (`TouchScreen`).
-   Gestionar los controladores de gamepad (`GamepadController`).

## Ejemplos de uso

### Teclado

```typescript
// Pulsación simple
if (inputManager.keyboard.isPressed("KeyW")) {
    playerComponent.moveDirection.y = 1;
}

// Pulsación de varias teclas (OR)
if (inputManager.keyboard.orPressed(["KeyW", "ArrowUp"])) {
    playerComponent.moveDirection.y = 1;
}

// Pulsación combinada (AND)
if (inputManager.keyboard.andPressed(["ShiftLeft", "KeyW"])) {
    playerComponent.moveDirection.y = 1;
    playerComponent.running = true;
}

// Usar retorno de valor personalizado
playerComponent.speed = inputManager.keyboard.isPressedReturn("ShiftLeft", 10, 5);
```

### Ratón

```typescript
// Disparo con clic izquierdo
if (inputManager.mouse.leftButtonPressed) {
    weaponComponent.isFiring = true;
}

// Apuntar manteniendo clic derecho
if (inputManager.mouse.rightButtonPressed) {
    weaponComponent.isAiming = true;
}

// Posición actual del cursor en pantalla
playerComponent.cursorPosition = inputManager.mouse.positionInViewport;

// Movimiento del scroll (para cambiar de arma)
if (inputManager.mouse.wheelScroll.y > 0) {
    inventoryComponent.nextWeapon = true;
} else if (inputManager.mouse.wheelScroll.y < 0) {
    inventoryComponent.previousWeapon = true;
}
```

### Pantalla táctil

```typescript
// Detectar si se está tocando la pantalla
if (inputManager.touchScreen.touching) {
    const touch = inputManager.touchScreen.interactions[0];

    // Apuntar donde se toca
    aimComponent.targetPosition = touch.positionInViewport;

    // Marcar que se está tocando
    inputComponent.isTouching = true;
}
```

### Gamepad

```typescript
const gamepad = inputManager.gamepads[0];

if (gamepad) {
    // Movimiento con stick izquierdo
    playerComponent.moveDirection = gamepad.leftStickAxes;

    // Saltar con botón inferior
    playerComponent.isJumping = gamepad.bottomFace;

    // Rodar con botón superior
    playerComponent.isRolling = gamepad.topFace;

    // Disparar con gatillo derecho
    weaponComponent.isFiring = gamepad.rightTrigger;

    // Cambiar arma con D-pad
    inventoryComponent.previousWeapon = gamepad.dpadLeft;
    inventoryComponent.nextWeapon = gamepad.dpadRight;

    // Marcar que debe vibrar si fue dañado
    if (healthComponent.wasDamaged) {
        gamepad.vibrate(300, 0.4, 0.8);
    }
}
```

## Notas

-   Usa `orPressed` y `andPressed` para comprobar múltiples teclas fácilmente.
-   Los sticks y d-pad devuelven vectores normalizados (`Vector2`) entre -1 y 1.
-   Se soportan múltiples gamepads simultáneamente.
-   Las vibraciones se pueden configurar en duración e intensidad.
-   Los estados de entrada se actualizan cada frame y luego los sistemas procesan esos datos.
