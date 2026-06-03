# VideoRenderer

El componente `VideoRenderer` renderiza contenido de vídeo en la pantalla. Admite escalado, rotación, volteo, opacidad, máscara de color, tintado, recorte, repetición en bucle y control de volumen, y la reproducción puede controlarse mediante código. Usa el [`Transform`](transform.md) de la entidad para la posición. Consulta [Renderizado](../rendering.md) para una visión general.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `video` | `HTMLVideoElement \| string` | — | El vídeo a renderizar, o una cadena con la URL/nombre del recurso. |
| `layer` | `string` | `"Default"` | La capa de renderizado. |
| `width` | `number` | — | Sustituye el ancho renderizado. |
| `height` | `number` | — | Sustituye el alto renderizado. |
| `slice` | `Slice` | — | Región del vídeo a dibujar (`{ x, y, width, height }`). |
| `offset` | `Vector2` | `(0, 0)` | Desplazamiento respecto a la posición de la entidad. |
| `rotation` | `number` | `0` | Rotación en radianes. |
| `flipHorizontally` | `boolean` | — | Voltea el vídeo horizontalmente. |
| `flipVertically` | `boolean` | — | Voltea el vídeo verticalmente. |
| `opacity` | `number` | — | Opacidad entre `0` y `1`. |
| `tintColor` | `string` | — | Color usado para tintar el vídeo. |
| `maskColor` | `string` | — | Color de máscara aplicado al vídeo. |
| `maskColorMix` | `number` | — | Opacidad del color de máscara entre `0` y `1`. |
| `volume` | `number` | `1` | Volumen entre `0` y `1`. |
| `loop` | `boolean` | `false` | Si el vídeo se repite. |
| `fixedToTimeScale` | `boolean` | `false` | Si la velocidad de reproducción sigue la escala de tiempo. |

## Propiedades de solo lectura

| Propiedad | Tipo | Descripción |
|----------|------|-------------|
| `playing` | `boolean` | `true` mientras el vídeo se está reproduciendo. |

## Métodos

| Método | Descripción |
|--------|-------------|
| `play(video?)` | Reproduce el vídeo. Un vídeo opcional sustituye a `video`. |
| `pause()` | Pausa la reproducción. |
| `stop()` | Detiene la reproducción. |

## Ejemplo

```typescript
import { Transform, VideoRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new VideoRenderer({
        video: this.assetManager.getVideo("intro.mp4"),
        width: 1920,
        height: 1080,
        layer: "Default",
    }),
]);
```

El vídeo se carga a través del [Asset Manager](../asset-manager.md), normalmente en el método `loadAssets` de la escena.
