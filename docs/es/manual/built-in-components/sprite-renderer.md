# SpriteRenderer

El componente `SpriteRenderer` renderiza una imagen (sprite) en la pantalla. Admite recorte, escalado, rotación, volteo, opacidad, máscara de color, tintado y mosaico (tiling). Usa el [`Transform`](transform.md) de la entidad para la posición. Consulta [Renderizado](../rendering.md) para una visión general.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `image` | `HTMLImageElement \| string` | — | La imagen a renderizar, o una cadena con la URL/nombre del recurso. |
| `layer` | `string` | `"Default"` | La capa de renderizado. |
| `slice` | `Slice` | — | Región de la imagen a dibujar (`{ x, y, width, height }`). |
| `width` | `number` | — | Sustituye el ancho renderizado. |
| `height` | `number` | — | Sustituye el alto renderizado. |
| `scale` | `Vector2` | `(1, 1)` | Escala la imagen. |
| `offset` | `Vector2` | `(0, 0)` | Desplazamiento respecto a la posición de la entidad. |
| `rotation` | `number` | `0` | Rotación en radianes. |
| `flipHorizontally` | `boolean` | `false` | Voltea la imagen horizontalmente. |
| `flipVertically` | `boolean` | `false` | Voltea la imagen verticalmente. |
| `opacity` | `number` | `1` | Opacidad entre `0` y `1`. |
| `tintColor` | `string` | — | Color usado para tintar la imagen. |
| `maskColor` | `string` | — | Color de máscara aplicado a la imagen. |
| `maskColorMix` | `number` | — | Opacidad del color de máscara entre `0` y `1`. |
| `tiled` | `Vector2` | — | Repite la imagen en mosaico según el número de columnas y filas indicado. |
| `smooth` | `boolean` | `false` | Suaviza los píxeles. No recomendado para pixel art. |

## Ejemplo

```typescript
import { Transform, SpriteRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new SpriteRenderer({
        image: this.assetManager.getImage("player.png"),
        layer: "Default",
    }),
]);
```

La imagen se carga a través del [Asset Manager](../asset-manager.md), normalmente en el método `loadAssets` de la escena. Los sprites animados se controlan con el componente [`Animator`](animator.md).
