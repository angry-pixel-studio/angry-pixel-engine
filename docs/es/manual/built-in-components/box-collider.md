# BoxCollider

El componente `BoxCollider` define una forma de colisión rectangular. Puede usarse para interacciones físicas y para la detección de colisiones. Consulta [Física](../physics.md) para una visión general.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `width` | `number` | `0` | Ancho del rectángulo. |
| `height` | `number` | `0` | Alto del rectángulo. |
| `rotation` | `number` | `0` | Rotación en radianes. |
| `offset` | `Vector2` | `(0, 0)` | Desplazamiento respecto a la posición de la entidad. |
| `layer` | `string` | `""` | La capa de colisión a la que pertenece el colisionador. |
| `physics` | `boolean` | `true` | Si es `true`, el colisionador interactúa con los cuerpos rígidos. |
| `ignoreCollisionsWithLayers` | `string[]` | `[]` | Capas que este colisionador ignora. |

## Ejemplo

```typescript
import { Transform, BoxCollider } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new BoxCollider({ width: 16, height: 16, layer: "Player" }),
]);
```

Agrega un [`RigidBody`](rigid-body.md) a la misma entidad para que se mueva y responda a la física.
