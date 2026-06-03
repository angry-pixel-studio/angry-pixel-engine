# Transform

El componente `Transform` define la posición, escala y rotación de una entidad en el mundo del juego. Puede anidarse bajo un transform padre: los transforms hijos combinan sus valores con los del padre, y un hijo puede ignorar selectivamente partes del transform del padre.

La mayoría de las entidades tienen un `Transform`: los componentes de renderizado y física lo usan para situar la entidad en el mundo.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `position` | `Vector2` | `(0, 0)` | Posición relativa al origen del mundo, o al padre si la entidad tiene uno. |
| `scale` | `Vector2` | `(1, 1)` | Escala en los ejes x e y. |
| `rotation` | `number` | `0` | Rotación en radianes. |
| `ignoreParentPosition` | `boolean` | `false` | Si es `true`, se ignora la posición del padre. |
| `ignoreParentScale` | `boolean` | `false` | Si es `true`, se ignora la escala del padre. |
| `ignoreParentRotation` | `boolean` | `false` | Si es `true`, se ignora la rotación del padre. |

## Propiedades de solo lectura

Cuando una entidad tiene un padre, `position`, `scale` y `rotation` son relativas a él. Los valores resueltos en el espacio del mundo se exponen como propiedades de solo lectura:

| Propiedad | Tipo | Descripción |
|----------|------|-------------|
| `localPosition` | `Vector2` | Posición resuelta en el mundo. Igual a `position` cuando no hay padre. |
| `localScale` | `Vector2` | Escala resuelta en el mundo. Igual a `scale` cuando no hay padre. |
| `localRotation` | `number` | Rotación resuelta en el mundo. Igual a `rotation` cuando no hay padre. |

## Ejemplo

```typescript
import { Transform, Vector2 } from "angry-pixel";

this.entityManager.createEntity([
    new Transform({
        position: new Vector2(100, 100),
        scale: new Vector2(2, 2),
        rotation: Math.PI / 4,
    }),
]);
```

Consulta [Agregar entidades a la escena](../adding-entities-to-the-scene.md) para las jerarquías de entidades padre-hijo.
