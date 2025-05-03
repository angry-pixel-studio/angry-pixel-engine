## VideoRenderer

El componente `VideoRenderer` permite renderizar contenido de video en pantalla.  
Admite características como control de reproducción, escalado, rotación, volteo, opacidad, máscara de color y tintado.  
Los videos pueden mostrarse con dimensiones personalizadas, posicionarse mediante desplazamientos y recortarse para mostrar regiones específicas (_slice_).  
Además, es posible controlar si el video se repite en bucle, ajustar el volumen y sincronizar la velocidad de reproducción con la escala de tiempo del motor.

### Propiedades

| Propiedad          | Tipo                           | Descripción                                                                     |
| ------------------ | ------------------------------ | ------------------------------------------------------------------------------- |
| `action`           | `"play" \| "pause" \| "stop"`  | Acción actual para el video.                                                    |
| `fixedToTimeScale` | `boolean`                      | Si es `true`, la velocidad de reproducción sigue la escala de tiempo del motor. |
| `flipHorizontally` | `boolean`                      | Si es `true`, voltea el video horizontalmente.                                  |
| `flipVertically`   | `boolean`                      | Si es `true`, voltea el video verticalmente.                                    |
| `height`           | `number`                       | Altura personalizada del video.                                                 |
| `layer`            | `string`                       | Capa de renderizado.                                                            |
| `loop`             | `boolean`                      | Si es `true`, reproduce el video en bucle.                                      |
| `maskColor`        | `string`                       | Color de máscara aplicado al video.                                             |
| `maskColorMix`     | `number`                       | Intensidad de la mezcla de la máscara (entre 0 y 1).                            |
| `offset`           | `Vector2`                      | Desplazamiento en los ejes X e Y.                                               |
| `opacity`          | `number`                       | Opacidad del video (entre 0 y 1).                                               |
| `rotation`         | `number`                       | Rotación del video en radianes.                                                 |
| `slice`            | `Slice`                        | Coordenadas para recortar una región específica del video.                      |
| `tintColor`        | `string`                       | Color de tintado aplicado al video.                                             |
| `video`            | `HTMLVideoElement` \| `string` | Video a renderizar. Puede ser un elemento HTML o un nombre de asset.            |
| `volume`           | `number`                       | Volumen del video (entre 0 y 1).                                                |
| `width`            | `number`                       | Ancho personalizado del video.                                                  |
| `playing`          | `boolean` _(solo lectura)_     | `true` si el video se está reproduciendo.                                       |

---

### Ejemplo básico

```typescript
const videoRenderer = new VideoRenderer({
    video: this.assetManager.getVideo("video.mp4"),
    width: 1920,
    height: 1080,
});
```

---

### Ejemplo completo

```typescript
const videoRenderer = new VideoRenderer({
    video: this.assetManager.getVideo("video.mp4"),
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
    volume: 1,
    loop: false,
    fixedToTimeScale: false,
});
```

---

### Control de reproducción

El componente ofrece tres métodos públicos para controlar la reproducción del video:

-   `play(videoSource?: HTMLVideoElement)`: Cambia el estado a reproducción. Opcionalmente, puede asignar una nueva fuente de video.
-   `pause()`: Cambia el estado a pausa.
-   `stop()`: Cambia el estado a detenido.

**Importante:**  
Estas funciones **no ejecutan ninguna lógica directamente**. Solo modifican el estado del atributo `action`.  
La lógica de reproducción real se ejecuta dentro del sistema encargado de procesar el componente.

```typescript
videoRenderer.play();
videoRenderer.pause();
videoRenderer.stop();
```

---

### Notas

-   Para mostrar el video en pantalla, la entidad debe incluir un componente `VideoRenderer` y estar dentro de una escena activa.
-   El atributo `fixedToTimeScale` permite sincronizar la velocidad de reproducción con la escala de tiempo configurada en el motor.
-   La política de reproducción automática de los navegadores requiere que haya al menos una interacción humana antes de poder iniciar la reproducción de video.
