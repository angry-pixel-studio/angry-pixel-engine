## SpriteRenderer

El componente `SpriteRenderer` renderiza imágenes 2D (sprites) en pantalla.  
Ofrece funcionalidades como recorte de imagen (_slice_), escalado, rotación, volteo, opacidad, enmascaramiento de color, tintado y renderizado en capas específicas.  
Las imágenes pueden renderizarse con dimensiones personalizadas, desplazarse con un offset e incluso repetirse (tiled) en un área.

### Propiedades

| Propiedad          | Tipo                           | Descripción                                                                  |
| ------------------ | ------------------------------ | ---------------------------------------------------------------------------- |
| `layer`            | `string`                       | Capa de renderizado donde se dibujará el sprite.                             |
| `image`            | `HTMLImageElement` \| `string` | Imagen a renderizar. Puede ser un objeto de imagen o una ruta de archivo.    |
| `slice`            | `Slice`                        | Recorte de la imagen usando coordenadas desde la esquina superior izquierda. |
| `smooth`           | `boolean`                      | Si es `true`, aplica suavizado de píxeles (no recomendado para pixel art).   |
| `offset`           | `Vector2`                      | Desplazamiento en los ejes X e Y respecto al centro de la entidad.           |
| `flipHorizontally` | `boolean`                      | Si es `true`, voltea la imagen horizontalmente.                              |
| `flipVertically`   | `boolean`                      | Si es `true`, voltea la imagen verticalmente.                                |
| `rotation`         | `number`                       | Rotación de la imagen en radianes.                                           |
| `opacity`          | `number`                       | Opacidad de la imagen, valor entre 0 y 1.                                    |
| `maskColor`        | `string`                       | Color de máscara que se aplicará sobre la imagen.                            |
| `maskColorMix`     | `number`                       | Intensidad de la mezcla de la máscara, valor entre 0 y 1.                    |
| `tintColor`        | `string`                       | Color con el que se tintará la imagen.                                       |
| `scale`            | `Vector2`                      | Escala de la imagen en los ejes X e Y.                                       |
| `width`            | `number`                       | Ancho personalizado de la imagen (sobrescribe el ancho original).            |
| `height`           | `number`                       | Alto personalizado de la imagen (sobrescribe el alto original).              |
| `tiled`            | `Vector2`                      | Define cuántas veces se repetirá la imagen horizontal y verticalmente.       |

### Ejemplo mínimo

```typescript
const spriteRenderer = new SpriteRenderer({
    image: "miSprite.png",
});
```

### Ejemplo completo

```typescript
const spriteRenderer = new SpriteRenderer({
    image: this.assetManager.getImage("image.png"),
    width: 1920,
    height: 1080,
    offset: new Vector2(0, 0),
    flipHorizontally: false,
    flipVertically: false,
    rotation: 0,
    opacity: 1,
    maskColor: "#FF0000",
    maskColorMix: 0,
    tintColor: "#00FF00",
    layer: "Default",
    slice: { x: 0, y: 0, width: 1920, height: 1080 },
    scale: new Vector2(1, 1),
    tiled: new Vector2(1, 1),
    smooth: false,
});
```

### Notas

-   Las capas de renderizado (`layer`) determinan qué cámaras pueden ver este sprite (según las capas configuradas en cada `Camera`).
-   El suavizado de píxeles (`smooth`) puede mejorar gráficos vectoriales o imágenes de alta resolución, pero no es recomendable para pixel art.
-   La propiedad `slice` permite renderizar solo una porción específica de la imagen.
-   La lógica de renderizado y aplicación de máscaras, tintes, flip y tileo es gestionada por el sistema que procesa los componentes `SpriteRenderer`. El componente únicamente define las propiedades visuales.
