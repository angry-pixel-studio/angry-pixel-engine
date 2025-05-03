## TextRenderer

El componente `TextRenderer` renderiza texto en pantalla con amplias opciones de personalización.  
Admite tanto fuentes web estándar como fuentes importadas, aunque funciona de forma óptima con fuentes bitmap.  
Internamente, genera un _texture atlas_ que contiene todos los caracteres necesarios para el renderizado.  
El atlas puede configurarse con rangos de caracteres personalizados, tamaños de fuente y espaciado.

El texto puede personalizarse en cuanto a fuente, color, tamaño, orientación, sombras, espaciado entre letras, altura de línea, opacidad, suavizado y posición. Además, el texto puede rotarse, voltearse y asignarse a capas de renderizado específicas.

### Propiedades

| Propiedad          | Tipo                                                          | Descripción                                                                 |
| ------------------ | ------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `color`            | `string`                                                      | Color del texto.                                                            |
| `flipHorizontally` | `boolean`                                                     | Si es `true`, voltea el texto horizontalmente.                              |
| `flipVertically`   | `boolean`                                                     | Si es `true`, voltea el texto verticalmente.                                |
| `font`             | `FontFace` \| `string`                                        | Familia tipográfica a usar.                                                 |
| `fontSize`         | `number`                                                      | Tamaño de la fuente en píxeles.                                             |
| `height`           | `number`                                                      | Altura de la caja invisible donde se renderiza el texto.                    |
| `layer`            | `string`                                                      | Capa de renderizado donde se dibujará el texto.                             |
| `letterSpacing`    | `number`                                                      | Espacio entre caracteres en píxeles.                                        |
| `lineHeight`       | `number`                                                      | Altura de la línea en píxeles. Valor por defecto igual al tamaño de fuente. |
| `offset`           | `Vector2`                                                     | Desplazamiento en los ejes X e Y respecto al centro de la entidad.          |
| `opacity`          | `number`                                                      | Opacidad del texto (valor entre 0 y 1).                                     |
| `orientation`      | `TextOrientation`                                             | Dirección en la que se renderizará el texto.                                |
| `rotation`         | `number`                                                      | Rotación del texto en radianes.                                             |
| `smooth`           | `boolean`                                                     | Suavizado de píxeles (no recomendado para fuentes bitmap).                  |
| `shadow`           | `{ color: string, offset: Vector2, opacity: number }`         | Configuración de sombra para el texto.                                      |
| `text`             | `string`                                                      | Texto a renderizar.                                                         |
| `textureAtlas`     | `{ charRanges: number[], fontSize: number, spacing: number }` | Configuración del atlas de textura que contiene los caracteres.             |
| `width`            | `number`                                                      | Ancho de la caja invisible donde se renderiza el texto.                     |

### Ejemplo mínimo

```typescript
const textRenderer = new TextRenderer({
    text: "Hola mundo!",
    fontSize: 24,
    font: "Arial",
});
```

### Ejemplo completo

```typescript
const textRenderer = new TextRenderer({
    text: "Hello World!",
    color: "#FFFFFF",
    fontSize: 24,
    width: 1920,
    height: 32,
    opacity: 1,
    layer: "TextLayer",
    orientation: TextOrientation.RightCenter,
    shadow: {
        color: "#00FF00",
        offset: new Vector2(3, -3),
        opacity: 0.5,
    },
    textureAtlas: {
        charRanges: [32, 126, 161, 255, 0x3040, 0x309f],
        fontSize: 64,
        spacing: 4,
    },
    font: "Arial",
    flipHorizontally: false,
    flipVertically: false,
    letterSpacing: 0,
    lineHeight: 24,
    offset: new Vector2(0, 0),
    rotation: 0,
    smooth: false,
});
```

### Notas

-   Aunque soporta cualquier tipo de fuente, el mejor rendimiento y calidad visual se obtienen utilizando fuentes bitmap.
-   Los rangos de caracteres (`charRanges`) permiten incluir caracteres personalizados, por ejemplo, símbolos o caracteres de idiomas no latinos.
-   La propiedad `smooth` puede ser útil para mejorar texto vectorial o de alta resolución, pero no es recomendable para fuentes bitmap.
-   La lógica de renderizado y generación del _texture atlas_ es gestionada por el sistema que procesa los componentes `TextRenderer`. El componente únicamente define las propiedades visuales.
