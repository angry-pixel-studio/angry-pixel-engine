# AudioPlayer

El componente `AudioPlayer` reproduce, pausa y detiene fuentes de audio. Controla el volumen y la repetición en bucle, y opcionalmente puede sincronizar la velocidad de reproducción con la escala de tiempo del juego.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `audioSource` | `AudioSource \| string` | — | El audio a reproducir: un `AudioSource` (de `AssetManager.getAudio`) o una cadena con la URL/nombre del recurso. |
| `volume` | `number` | `1` | Volumen de reproducción. |
| `loop` | `boolean` | `false` | Si el audio se repite. |
| `stopOnSceneTransition` | `boolean` | `true` | Si el audio se detiene cuando se carga una nueva escena. |
| `fixedToTimeScale` | `boolean` | `false` | Si la velocidad de reproducción sigue la escala de tiempo. |

## Propiedades de solo lectura

| Propiedad | Tipo | Descripción |
|----------|------|-------------|
| `state` | `"stopped" \| "playing" \| "paused"` | El estado de reproducción actual. |
| `playing` | `boolean` | `true` mientras se reproduce. |
| `paused` | `boolean` | `true` mientras está en pausa. |
| `stopped` | `boolean` | `true` mientras está detenido. |

## Métodos

| Método | Descripción |
|--------|-------------|
| `play(audioSource?)` | Reproduce el audio. Una fuente opcional sustituye a `audioSource`. |
| `pause()` | Pausa la reproducción. |
| `stop()` | Detiene la reproducción. |

## Ejemplo

```typescript
import { AudioPlayer } from "angry-pixel";

this.entityManager.createEntity([
    new AudioPlayer({ audioSource: "music.ogg", volume: 0.5, loop: true }),
]);
```

El archivo de audio se carga a través del [Asset Manager](../asset-manager.md), normalmente en el método `loadAssets` de la escena.

> **Nota:** Los navegadores impiden que el audio comience hasta que el usuario interactúa con la página. El componente respeta esta política de autoreproducción: si se solicita la reproducción antes de cualquier interacción del usuario, espera y comienza automáticamente con la primera entrada del usuario (un clic, una pulsación de tecla o un toque).
