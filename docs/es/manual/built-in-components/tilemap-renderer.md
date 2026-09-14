# TilemapRenderer

El componente `TilemapRenderer` renderiza un mapa basado en tiles. Usa una o más imágenes de tileset como origen de los tiles individuales, dispuestos según un array de IDs de tile. Usa el [`Transform`](transform.md) de la entidad para la posición. Consulta [Renderizado](../rendering.md) para una visión general.

Cada tile se referencia mediante un ID, donde `0` representa espacio vacío. Los datos de tiles pueden proporcionarse directamente, o rellenarse a partir de un mapa de Tiled con el componente [`TiledWrapper`](tiled-wrapper.md).

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `tilesets` | `Tileset[]` | `[]` | Los tilesets que proporcionan los tiles (ver más abajo). |
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
| `offset` | `Vector2` | `(0, 0)` | Desplazamiento en los ejes X-Y respecto de la posición de la entidad. |

### Tileset

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `image` | `HTMLImageElement \| string` | La imagen del tileset, o una cadena con la URL/nombre del recurso. |
| `tileWidth` | `number` | Ancho del tile en píxeles. |
| `tileHeight` | `number` | Alto del tile en píxeles. |
| `margin` | `number` | Espacio en píxeles entre los tiles y los cuatro bordes de la imagen. Por defecto `0`. |
| `spacing` | `number` | Espacio en píxeles entre tiles adyacentes. Por defecto `0`. |
| `firstgid` | `number` | El ID del primer tile del tileset. Por defecto `1`. |
| `tileCount` | `number` | La cantidad de tiles del tileset. Se obtiene de la imagen si no se define. |
| `animations` | `Map<number, TileAnimation>` | Tiles animados, indexados por el ID del tile a animar (ver más abajo). |

Para un tileset cuyos tiles están extruidos 1 píxel, la imagen tiene un margen de `1` y un espaciado de `2`:

```typescript
tilesets: [
    {
        image: this.assetManager.getImage("tileset.png"),
        tileWidth: 16,
        tileHeight: 16,
        margin: 1,
        spacing: 2,
    },
];
```

### Múltiples tilesets

Cada tileset es dueño de un rango de IDs de tile: comienza en su `firstgid` y abarca tantos tiles como tenga el tileset. Un tile lo dibuja el tileset cuyo rango contiene su ID, y los IDs que quedan fuera de todos los rangos no se dibujan. Es el mismo criterio que usa Tiled, por lo que los rangos de un mapa exportado desde Tiled coinciden con sus valores de `firstgid`.

El `firstgid` del primer tileset es `1` por defecto, y `tileCount` se obtiene de la imagen, dividiéndola por el tamaño de un tile. A un tileset de 72 tiles que empieza en `1` le sigue un tileset que empieza en `73`:

```typescript
tilesets: [
    { image: this.assetManager.getImage("ground.png"), tileWidth: 16, tileHeight: 16 },
    { image: this.assetManager.getImage("props.png"), tileWidth: 16, tileHeight: 16, firstgid: 73 },
];
```

Los tiles de cada tileset se renderizan en una pasada aparte, por lo que un mapa que usa varios tilesets cuesta una llamada de dibujo por tileset y chunk. Cuando el tilemap proviene de Tiled, el [`TiledWrapper`](tiled-wrapper.md) crea los tilesets a partir de los que están embebidos en el mapa, por lo que no hace falta declararlos.

### Animaciones de tiles

Un `TileAnimation` hace que un tile recorra una secuencia de IDs de tile del tileset. El mapa `animations` se define en el tileset y se indexa por el ID del tile que debe animarse: todos los tiles con ese ID reproducen la animación. Como las animaciones pertenecen al tileset, todos los tilemaps que lo usan las reproducen sincronizadas. Las animaciones siempre se repiten en bucle.

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `tiles` | `number[]` | `[]` | La secuencia de IDs de tile a recorrer. |
| `fps` | `number` | `12` | Cuadros por segundo. |

Cuando el tilemap proviene de Tiled, los tiles animados en el editor de mapas se mapean a este mapa automáticamente. Consulta [`TiledWrapper`](tiled-wrapper.md).

## Ejemplo

```typescript
import { Transform, TilemapRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TilemapRenderer({
        layer: "Default",
        tilesets: [
            {
                image: this.assetManager.getImage("tileset.png"),
                tileWidth: 16,
                tileHeight: 16,
            },
        ],
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
        tilesets: [
            {
                image: this.assetManager.getImage("tileset.png"),
                tileWidth: 16,
                tileHeight: 16,
                // Cada tile con ID 3 recorre 3, 4, 5 a 6 fps.
                animations: new Map([[3, new TileAnimation({ tiles: [3, 4, 5], fps: 6 })]]),
            },
        ],
        data: [1, 2, 3, 4],
        width: 2,
        height: 2,
    }),
]);
```

## Actualizar el tilemap en tiempo de ejecución

Los datos de los tiles se procesan una sola vez: el arreglo `data` y el arreglo `chunks` se generan uno a partir del otro, y se resuelve la altura del tilemap. Después de cambiar los datos en tiempo de ejecución, hay que llamar a `refresh` para que se procesen de nuevo.

`refresh` conserva el arreglo en el que se entregaron los tiles y vacía el que fue generado a partir de él, por lo que el cambio debe hacerse sobre el arreglo de origen: `data` para un tilemap definido con tiles, y `chunks` para un tilemap definido con chunks, que es el caso de los tilemaps infinitos de Tiled. Asignar `data` en un tilemap definido con chunks no tiene efecto, porque `data` se genera nuevamente a partir de los chunks.

```typescript
const tilemapRenderer = this.entityManager.getComponent(entity, TilemapRenderer);

// un tilemap definido con tiles
tilemapRenderer.data = newData;
// un tilemap definido con chunks
tilemapRenderer.chunks = newChunks;

tilemapRenderer.refresh();
```

Esta operación es costosa, no debe llamarse en cada frame. Cuando el tilemap proviene de Tiled, también hay que refrescar el [`TiledWrapper`](tiled-wrapper.md), y el [`TilemapCollider`](tilemap-collider.md) si la entidad tiene uno.
