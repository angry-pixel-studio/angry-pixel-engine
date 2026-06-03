# PolygonCollider

El componente `PolygonCollider` define una forma de colisión de polígono convexo a partir de una lista de vértices. Puede usarse para interacciones físicas y para la detección de colisiones. Consulta [Física](../physics.md) para una visión general.

Solo se admiten polígonos convexos. Las formas cóncavas deben dividirse en varios polígonos convexos.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `vertexModel` | `Vector2[]` | `[]` | Los vértices que forman el polígono. |
| `rotation` | `number` | `0` | Rotación en radianes. |
| `offset` | `Vector2` | `(0, 0)` | Desplazamiento respecto a la posición de la entidad. |
| `layer` | `string` | `""` | La capa de colisión a la que pertenece el colisionador. |
| `physics` | `boolean` | `true` | Si es `true`, el colisionador interactúa con los cuerpos rígidos. |
| `ignoreCollisionsWithLayers` | `string[]` | `[]` | Capas que este colisionador ignora. |

## Ejemplo

```typescript
import { Transform, PolygonCollider, Vector2 } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new PolygonCollider({
        vertexModel: [new Vector2(0, 16), new Vector2(16, 16), new Vector2(16, 0), new Vector2(0, 0)],
        layer: "Ground",
    }),
]);
```

Agrega un [`RigidBody`](rigid-body.md) a la misma entidad para que se mueva y responda a la física.
