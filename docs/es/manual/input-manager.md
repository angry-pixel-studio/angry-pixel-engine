# El Input Manager

El Input Manager lee la entrada de cuatro fuentes: teclado, ratón, pantalla táctil y gamepads. Se lee dentro de los sistemas, normalmente en `onUpdate`.

En los sistemas que extienden `GameSystem` está disponible como `this.inputManager`. Consulta [Componentes y sistemas personalizados](custom-components-and-systems.md).

```typescript
import { GameSystem } from "angry-pixel";

export class InputSystem extends GameSystem {
    onUpdate() {
        if (this.inputManager.keyboard.isPressed("Space")) {
            // saltar
        }
    }
}
```

El Input Manager expone un objeto por cada fuente:

| Propiedad | Fuente |
|----------|--------|
| `keyboard` | Teclado |
| `mouse` | Ratón |
| `touchScreen` | Pantalla táctil |
| `gamepads` | Gamepads conectados (array) |

> **Nota:** La entrada está desactivada en modo headless.

## Teclado

Las teclas se identifican por su valor [`KeyboardEvent.code`](https://developer.mozilla.org/es/docs/Web/API/KeyboardEvent/code), como `"Space"`, `"KeyW"` o `"ArrowUp"`.

| Miembro | Descripción |
|--------|-------------|
| `pressedKeys` | Array de los códigos pulsados actualmente. |
| `isPressed(code)` | `true` si la tecla está pulsada. |
| `orPressed(codes)` | `true` si alguna de las teclas está pulsada. |
| `andPressed(codes)` | `true` si todas las teclas están pulsadas. |
| `isPressedReturn(code, ifTrue, ifFalse)` | Devuelve uno de dos valores según si la tecla está pulsada. |
| `orPressedReturn(codes, ifTrue, ifFalse)` | Como `isPressedReturn`, para cualquiera de las teclas. |
| `andPressedReturn(codes, ifTrue, ifFalse)` | Como `isPressedReturn`, para todas las teclas. |

```typescript
const { keyboard } = this.inputManager;

if (keyboard.isPressed("ArrowRight")) {
    // moverse a la derecha
}

if (keyboard.andPressed(["ControlLeft", "KeyC"])) {
    // ambas teclas pulsadas a la vez
}
```

## Ratón

| Miembro | Tipo | Descripción |
|--------|------|-------------|
| `leftButtonPressed` | `boolean` | Estado del botón izquierdo. |
| `scrollButtonPressed` | `boolean` | Estado del botón de scroll (central). |
| `rightButtonPressed` | `boolean` | Estado del botón derecho. |
| `positionInViewport` | `Vector2` | Posición del cursor en el viewport. |
| `hasMoved` | `boolean` | Si el ratón se movió en este frame. |
| `wheelScroll` | `Vector2` | Cantidad de desplazamiento de la rueda. |

```typescript
const { mouse } = this.inputManager;

if (mouse.leftButtonPressed) {
    const position = mouse.positionInViewport;
    // actuar en la posición del cursor
}
```

## Pantalla táctil

| Miembro | Tipo | Descripción |
|--------|------|-------------|
| `touching` | `boolean` | Si se está tocando la pantalla. |
| `interactions` | `TouchInteraction[]` | Puntos de contacto activos. |

Cada `TouchInteraction` tiene un `positionInViewport` (`Vector2`) y un `radius` (`Vector2`, el área del contacto).

```typescript
const { touchScreen } = this.inputManager;

if (touchScreen.touching) {
    const touch = touchScreen.interactions[0];
    // gestionar el contacto en touch.positionInViewport
}
```

## Gamepads

`gamepads` es un array de mandos conectados. Accede a uno por su índice, y protégete frente a que no exista:

```typescript
const gamepad = this.inputManager.gamepads[0];

if (gamepad?.bottomFace) {
    // botón inferior (A en Xbox, B en Nintendo, X en PlayStation)
}

const move = gamepad?.leftStickAxes;
```

Un mando expone los siguientes miembros:

| Miembro | Tipo | Descripción |
|--------|------|-------------|
| `connected` | `boolean` | Si el mando está conectado. |
| `id` | `string` | Identificador del mando. |
| `index` | `number` | Índice del mando. |
| `bottomFace` / `rightFace` / `leftFace` / `topFace` | `boolean` | Botones frontales. |
| `dpadUp` / `dpadDown` / `dpadLeft` / `dpadRight` | `boolean` | Botones del pad direccional. |
| `dpadAxes` | `Vector2` | Pad direccional como eje. |
| `leftShoulder` / `rightShoulder` | `boolean` | Botones superiores (shoulder). |
| `leftTrigger` / `rightTrigger` | `boolean` | Gatillos. |
| `back` / `start` | `boolean` | Botones back y start. |
| `leftStickButton` / `rightStickButton` | `boolean` | Botones de pulsación de los sticks. |
| `leftStickAxes` / `rightStickAxes` | `Vector2` | Posiciones de los sticks. |
| `leftStickHorizontal` / `leftStickVertical` | `number` | Valores de los ejes del stick izquierdo. |
| `rightStickHorizontal` / `rightStickVertical` | `number` | Valores de los ejes del stick derecho. |
| `anyButtonPressed` | `boolean` | Si hay algún botón pulsado. |
| `buttons` | `Map<number, boolean>` | Estados de botones sin procesar. |
| `axes` | `Map<number, number>` | Valores de ejes sin procesar. |
| `vibrate(duration, weakMagnitude, strongMagnitude)` | — | Activa la vibración, si es compatible. |

```typescript
gamepad?.vibrate(200, 0.5, 0.5);
```
