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

> **Nota:** Las formas del colisionador se generan una sola vez y no pueden modificarse después. Para cambiarlas, crea un nuevo `TilemapCollider`.

## Ejemplo

```typescript
import { Transform, TilemapRenderer, TilemapCollider } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TilemapRenderer({
        tileset: {
            image: this.assetManager.getImage("tileset.png"),
            width: 8,
            tileWidth: 16,
            tileHeight: 16,
        },
    }),
    new TilemapCollider({ composite: true, layer: "Ground" }),
]);
```
