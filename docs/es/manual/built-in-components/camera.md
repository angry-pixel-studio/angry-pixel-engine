# Camera

El componente `Camera` controla qué capas se renderizan en la pantalla. Una cámara es una entidad con un componente `Camera` y un [`Transform`](transform.md). Una escena necesita al menos una cámara, y no se dibuja nada a menos que una cámara renderice la capa en la que está el contenido. Consulta [Renderizado](../rendering.md) para una visión general.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `layers` | `string[]` | `["Default"]` | Las capas que renderiza esta cámara, dibujadas en el orden indicado. |
| `zoom` | `number` | `1` | Nivel de zoom. |
| `depth` | `number` | `0` | Con varias cámaras, la de menor profundidad se renderiza primero. |
| `debug` | `boolean` | `false` | Renderiza datos de depuración cuando es `true`. |

## Ejemplo

```typescript
import { Transform, Camera } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new Camera({ layers: ["Default", "UI"], zoom: 1 }),
]);
```

Se pueden usar varias cámaras a la vez —por ejemplo, una para el mundo del juego y otra para la interfaz—, ordenadas por su `depth`.
