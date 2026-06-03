# Button

El componente `Button` crea un área interactiva que puede pulsarse o presionarse. Admite formas rectangulares o circulares e informa de su estado mediante manejadores de eventos. Usa el [`Transform`](transform.md) de la entidad para la posición.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `shape` | `ButtonShape` | — | `ButtonShape.Rectangle` o `ButtonShape.Circumference`. |
| `width` | `number` | `0` | Ancho en píxeles. Solo para forma rectangular. |
| `height` | `number` | `0` | Alto en píxeles. Solo para forma rectangular. |
| `radius` | `number` | `0` | Radio en píxeles. Solo para forma circular. |
| `touchEnabled` | `boolean` | `true` | Habilita la interacción con pantallas táctiles. |
| `offset` | `Vector2` | `(0, 0)` | Desplazamiento respecto a la posición de la entidad. |
| `onClick` | `() => void` | — | Se llama cuando se hace clic en el botón. |
| `onPressed` | `() => void` | — | Se llama mientras el botón está presionado. |

## Propiedades de solo lectura

| Propiedad | Tipo | Descripción |
|----------|------|-------------|
| `pressed` | `boolean` | `true` mientras el botón está presionado. |
| `mouseOver` | `boolean` | `true` mientras el cursor está sobre el botón. |

## Ejemplo

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
