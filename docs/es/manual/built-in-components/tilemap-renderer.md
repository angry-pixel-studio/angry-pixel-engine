# TilemapRenderer

El componente `TilemapRenderer` renderiza un mapa basado en tiles. Usa una imagen de tileset como origen de los tiles individuales, dispuestos según un array de IDs de tile. Usa el [`Transform`](transform.md) de la entidad para la posición. Consulta [Renderizado](../rendering.md) para una visión general.

Cada tile se referencia mediante un ID, donde `0` representa espacio vacío. Los datos de tiles pueden proporcionarse directamente, o rellenarse a partir de un mapa de Tiled con el componente [`TiledWrapper`](tiled-wrapper.md).

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `tileset` | `Tileset` | — | El tileset que proporciona los tiles (ver más abajo). |
| `data` | `number[]` | `[]` | Array de IDs de tile. `0` es espacio vacío. |
| `chunks` | `Chunk[]` | `[]` | Datos de tiles divididos en chunks, para mapas grandes. |
| `width` | `number` | `0` | Ancho del mapa en tiles. |
| `height` | `number` | `0` | Alto del mapa en tiles. |
| `tileWidth` | `number` | — | Ancho del tile renderizado. |
| `tileHeight` | `number` | — | Alto del tile renderizado. |
| `layer` | `string` | `"Default"` | La capa de renderizado. |
| `opacity` | `number` | `1` | Opacidad entre `0` y `1`. |
| `tintColor` | `string` | — | Color usado para tintar los tiles. |
| `maskColor` | `string` | — | Color de máscara aplicado a los tiles. |
| `maskColorMix` | `number` | — | Opacidad del color de máscara entre `0` y `1`. |
| `smooth` | `boolean` | `false` | Suaviza los píxeles. No recomendado para pixel art. |

### Tileset

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `image` | `HTMLImageElement \| string` | La imagen del tileset, o una cadena con la URL/nombre del recurso. |
| `width` | `number` | Ancho del tileset en tiles. |
| `tileWidth` | `number` | Ancho del tile en píxeles. |
| `tileHeight` | `number` | Alto del tile en píxeles. |
| `margin` | `Vector2` | Margen opcional (arriba e izquierda) en píxeles. |
| `spacing` | `Vector2` | Espaciado opcional (abajo y derecha) en píxeles. |

## Ejemplo

```typescript
import { Transform, TilemapRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TilemapRenderer({
        layer: "Default",
        tileset: {
            image: this.assetManager.getImage("tileset.png"),
            width: 8,
            tileWidth: 16,
            tileHeight: 16,
        },
        data: [1, 2, 3, 4],
        width: 2,
        height: 2,
    }),
]);
```
