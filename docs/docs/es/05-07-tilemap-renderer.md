## TilemapRenderer

El componente `TilemapRenderer` renderiza mapas 2D basados en _tiles_ (baldosas) en pantalla.  
Utiliza una imagen de tileset como fuente para las baldosas individuales, que se organizan según un array de IDs de tile proporcionado.  
Admite características como tintado, enmascaramiento, control de opacidad y dimensiones personalizadas de tiles.  
Los mapas pueden renderizarse en _chunks_ para mejorar el rendimiento con mapas grandes. Cada tile se referencia mediante un ID, donde el valor 0 representa espacio vacío.

### Propiedades

| Propiedad      | Tipo       | Descripción                                                                |
| -------------- | ---------- | -------------------------------------------------------------------------- |
| `layer`        | `string`   | Capa de renderizado donde se dibujará el tilemap.                          |
| `tileset`      | `Tileset`  | Configuración del tileset utilizado para renderizar los tiles.             |
| `data`         | `number[]` | Array de IDs de tiles. El ID 0 representa espacio vacío.                   |
| `chunks`       | `Chunk[]`  | Datos de tiles divididos en chunks. Útil para mapas grandes.               |
| `width`        | `number`   | Ancho del tilemap en cantidad de tiles.                                    |
| `height`       | `number`   | Alto del tilemap en cantidad de tiles.                                     |
| `tileWidth`    | `number`   | Ancho de cada tile (en píxeles).                                           |
| `tileHeight`   | `number`   | Alto de cada tile (en píxeles).                                            |
| `tintColor`    | `string`   | Color con el que se tintarán las tiles.                                    |
| `maskColor`    | `string`   | Color de máscara que se aplicará sobre el tilemap.                         |
| `maskColorMix` | `number`   | Intensidad de la mezcla de la máscara (entre 0 y 1).                       |
| `opacity`      | `number`   | Opacidad del tilemap (valor entre 0 y 1).                                  |
| `smooth`       | `boolean`  | Si es `true`, aplica suavizado de píxeles (no recomendado para pixel art). |

### Ejemplo mínimo

```typescript
const tilemapRenderer = new TilemapRenderer({
    layer: "Default",
    tileset: {
        image: this.assetManager.getImage("tileset.png"),
        width: 10,
        tileWidth: 32,
        tileHeight: 32,
    },
    data: [1, 2, 3, 4],
    width: 2,
    height: 2,
    tileWidth: 32,
    tileHeight: 32,
});
```

### Ejemplo completo usando `data`

```typescript
const tilemapRenderer = new TilemapRenderer({
    layer: "Default",
    tileset: {
        image: this.assetManager.getImage("tileset.png"),
        width: 10,
        tileWidth: 32,
        tileHeight: 32,
        margin: new Vector2(0, 0),
        spacing: new Vector2(0, 0),
    },
    data: [1, 2, 3, 4],
    chunks: [],
    width: 2,
    height: 2,
    tileWidth: 32,
    tileHeight: 32,
    tintColor: "#FFFFFF",
    maskColor: "#FF0000",
    maskColorMix: 0,
    opacity: 1,
    smooth: false,
});
```

### Ejemplo completo usando `chunks`

```typescript
const tilemapRenderer = new TilemapRenderer({
    layer: "Default",
    tileset: {
        image: this.assetManager.getImage("tileset.png"),
        width: 10,
        tileWidth: 32,
        tileHeight: 32,
    },
    chunks: [
        {
            data: [1, 2, 3, 4],
            x: 0,
            y: 0,
            width: 2,
            height: 2,
        },
    ],
    width: 2,
    height: 2,
    tileWidth: 32,
    tileHeight: 32,
    tintColor: "#FFFFFF",
    maskColor: "#0000FF",
    maskColorMix: 0.5,
    opacity: 1,
    smooth: false,
});
```

### Notas

-   Los tiles con ID `0` son considerados espacio vacío y no se renderizan.
-   Para mapas muy grandes, es recomendable utilizar `chunks` para mejorar el rendimiento.
-   El tileset debe definir el tamaño del tile y la imagen fuente. El margen y espaciado son opcionales y se utilizan si la imagen tiene separaciones entre tiles.
-   El suavizado (`smooth`) puede mejorar gráficos vectoriales o tiles de alta resolución, pero no es recomendable para pixel art.
-   **Después de crearse el `TilemapRenderer`, un sistema procesará sus datos.**
    -   Si los datos se cargaron en la propiedad `data`, el sistema creará `chunks` automáticamente.
    -   Si se cargaron `chunks`, la propiedad `data` será actualizada para reflejar todos los tiles que componen los `chunks`.
    -   Esto permite tener acceso de lectura a ambos formatos, aunque internamente el sistema de renderizado **siempre utiliza los `chunks` para dibujar**.
-   La lógica de renderizado y procesado de tiles es gestionada por el sistema que procesa los componentes `TilemapRenderer`. El componente únicamente define las propiedades visuales.
