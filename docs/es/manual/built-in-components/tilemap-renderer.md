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
| `tileWidth` | `number` | Ancho del tile en píxeles. |
| `tileHeight` | `number` | Alto del tile en píxeles. |
| `margin` | `number` | Espacio en píxeles entre los tiles y los cuatro bordes de la imagen. Por defecto `0`. |
| `spacing` | `number` | Espacio en píxeles entre tiles adyacentes. Por defecto `0`. |
| `animations` | `Map<number, TileAnimation>` | Tiles animados, indexados por el ID del tile a animar (ver más abajo). |

Para un tileset cuyos tiles están extruidos 1 píxel, la imagen tiene un margen de `1` y un espaciado de `2`:

```typescript
tileset: {
    image: this.assetManager.getImage("tileset.png"),
    tileWidth: 16,
    tileHeight: 16,
    margin: 1,
    spacing: 2,
}
```

### Animaciones de tiles

Un `TileAnimation` hace que un tile recorra una secuencia de IDs de tile del tileset. El mapa `animations` se define en el tileset y se indexa por el ID del tile que debe animarse: todos los tiles con ese ID reproducen la animación. Como las animaciones pertenecen al tileset, todos los tilemaps que lo usan las reproducen sincronizadas. Las animaciones siempre se repiten en bucle.

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `tiles` | `number[]` | `[]` | La secuencia de IDs de tile a recorrer. |
| `fps` | `number` | `12` | Cuadros por segundo. |

## Ejemplo

```typescript
import { Transform, TilemapRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TilemapRenderer({
        layer: "Default",
        tileset: {
            image: this.assetManager.getImage("tileset.png"),
            tileWidth: 16,
            tileHeight: 16,
        },
        data: [1, 2, 3, 4],
        width: 2,
        height: 2,
    }),
]);
```

## Ejemplo de tiles animados

```typescript
import { Transform, TilemapRenderer, TileAnimation } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TilemapRenderer({
        tileset: {
            image: this.assetManager.getImage("tileset.png"),
            tileWidth: 16,
            tileHeight: 16,
            // Cada tile con ID 3 recorre 3, 4, 5 a 6 fps.
            animations: new Map([[3, new TileAnimation({ tiles: [3, 4, 5], fps: 6 })]]),
        },
        data: [1, 2, 3, 4],
        width: 2,
        height: 2,
    }),
]);
```
