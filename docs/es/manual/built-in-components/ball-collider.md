# BallCollider

El componente `BallCollider` define una forma de colisión circular. Puede usarse para interacciones físicas y para la detección de colisiones. Consulta [Física](../physics.md) para una visión general.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `radius` | `number` | `0` | Radio del círculo. |
| `offset` | `Vector2` | `(0, 0)` | Desplazamiento respecto a la posición de la entidad. |
| `layer` | `string` | `""` | La capa de colisión a la que pertenece el colisionador. |
| `physics` | `boolean` | `true` | Si es `true`, el colisionador interactúa con los cuerpos rígidos. |
| `ignoreCollisionsWithLayers` | `string[]` | `[]` | Capas que este colisionador ignora. |

## Ejemplo

```typescript
import { Transform, BallCollider } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new BallCollider({ radius: 8, layer: "Ball" }),
]);
```

Agrega un [`RigidBody`](rigid-body.md) a la misma entidad para que se mueva y responda a la física.
