# TilemapCollider

El componente `TilemapCollider` genera formas de colisión a partir de los bordes de un tilemap. Funciona junto con un [`TilemapRenderer`](tilemap-renderer.md) en la misma entidad. Consulta [Física](../physics.md) para una visión general.

Cuando `composite` es `false`, crea un colisionador rectangular individual por cada tile del borde. Cuando `composite` es `true`, genera segmentos de línea conectados que siguen los bordes exteriores del tilemap, lo cual es más eficiente.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `composite` | `boolean` | `true` | Genera segmentos de línea conectados a lo largo de los bordes exteriores en lugar de un colisionador por tile. |
| `offset` | `Vector2` | `(0, 0)` | Desplazamiento respecto a la posición de la entidad. |
| `layer` | `string` | `""` | La capa de colisión a la que pertenece el colisionador. |
| `physics` | `boolean` | `true` | Si es `true`, el colisionador interactúa con los cuerpos rígidos. |
| `ignoreCollisionsWithLayers` | `string[]` | `[]` | Capas que este colisionador ignora. |

> **Nota:** Las formas del colisionador se generan una sola vez. Para volver a generarlas después de que el tilemap cambie, hay que llamar a `refresh` (ver más abajo).

## Ejemplo

```typescript
import { Transform, TilemapRenderer, TilemapCollider } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TilemapRenderer({
        tileset: {
            image: this.assetManager.getImage("tileset.png"),
            tileWidth: 16,
            tileHeight: 16,
        },
    }),
    new TilemapCollider({ composite: true, layer: "Ground" }),
]);
```

## Actualizar los colliders en tiempo de ejecución

Las formas de los colliders se generan una sola vez, a partir de los datos de los tiles del [`TilemapRenderer`](tilemap-renderer.md). Después de que el tilemap cambie en tiempo de ejecución, hay que llamar a `refresh` para que se generen de nuevo.

```typescript
this.entityManager.getComponent(entity, TilemapCollider).refresh();
```

Esta operación es costosa, no debe llamarse en cada frame.
