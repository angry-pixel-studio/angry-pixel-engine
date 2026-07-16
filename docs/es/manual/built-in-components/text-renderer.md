# TextRenderer

El componente `TextRenderer` renderiza texto en la pantalla. Funciona con fuentes web seguras y fuentes importadas, y funciona de forma óptima con fuentes bitmap. Usa el [`Transform`](transform.md) de la entidad para la posición. Consulta [Renderizado](../rendering.md) para una visión general.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `text` | `string` | `"Hello World!"` | El texto a renderizar. |
| `color` | `string` | `"#000000"` | El color del texto. |
| `font` | `FontFace \| string` | `"Arial"` | La familia de fuente. |
| `fontSize` | `number` | `16` | Tamaño de fuente en píxeles. |
| `width` | `number` | `192` | Ancho de la caja donde se renderiza el texto. |
| `height` | `number` | `16` | Alto de la caja donde se renderiza el texto. |
| `layer` | `string` | `"Default"` | La capa de renderizado. |
| `alignment` | `TextAlignment` | `TextAlignment.Center` | Alineación del texto: `Left`, `Center` o `Right`. |
| `lineHeight` | `number` | tamaño de fuente | Altura de línea en píxeles. |
| `letterSpacing` | `number` | `0` | Espacio entre caracteres en píxeles. |
| `offset` | `Vector2` | `(0, 0)` | Desplazamiento respecto a la posición de la entidad. |
| `rotation` | `number` | `0` | Rotación en radianes. |
| `opacity` | `number` | `1` | Opacidad entre `0` y `1`. |
| `flipHorizontally` | `boolean` | `false` | Voltea el texto horizontalmente. |
| `flipVertically` | `boolean` | `false` | Voltea el texto verticalmente. |
| `smooth` | `boolean` | `false` | Suaviza los píxeles. No recomendado para fuentes bitmap. |
| `shadow` | `{ color: string; offset: Vector2; opacity: number }` | — | Sombra de texto opcional. |
| `textureAtlas` | `{ charRanges?: number[]; fontSize?: number; spacing?: number }` | `charRanges: [32, 132, 161, 255]`, `fontSize: 64`, `spacing: 8` | Configuración del atlas de caracteres generado. |

La opción `textureAtlas.charRanges` define, como pares de puntos de código Unicode, los rangos inclusivos de caracteres que el componente puede renderizar. El valor por defecto `[32, 132, 161, 255]` cubre el Latín Básico (letras, dígitos y puntuación) y el Suplemento Latín-1 (letras acentuadas y símbolos usados por los idiomas de Europa Occidental). Se pueden añadir pares adicionales para renderizar otros alfabetos, por ejemplo `[0x3040, 0x309F]` para el Hiragana japonés o `[0x0400, 0x04FF]` para el cirílico. El rango de puntos de código de cada alfabeto se puede consultar en los [Unicode Character Code Charts](https://www.unicode.org/charts/) oficiales:

```typescript
textureAtlas: {
    charRanges: [32, 132, 161, 255, 0x3040, 0x309f],
}
```

## Ejemplo

```typescript
import { Transform, TextRenderer, TextAlignment } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TextRenderer({
        text: "Score: 0",
        color: "#FFFFFF",
        fontSize: 24,
        layer: "UI",
        alignment: TextAlignment.Left,
    }),
]);
```

Las fuentes importadas se cargan a través del [Asset Manager](../asset-manager.md) con `loadFont`.
