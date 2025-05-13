## AudioPlayer

El componente `AudioPlayer` gestiona la reproducción de audio dentro del juego.  
Permite reproducir, pausar y detener fuentes de audio, controlar el volumen, definir si la reproducción debe repetirse (_loop_) y opcionalmente sincronizar la velocidad de reproducción con la escala de tiempo del juego.

### Propiedades

| Propiedad                  | Tipo                           | Descripción                                                                                                      |
| -------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `action`                   | `AudioPlayerAction`            | Acción a realizar con la fuente de audio. Se borra al final del fotograma.                                       |
| `audioSource`              | `HTMLAudioElement` \| `string` | Fuente de audio que se reproducirá.                                                                              |
| `fixedToTimeScale`         | `boolean`                      | Si es `true`, la velocidad de reproducción se fija a la escala de tiempo del `TimeManager`. Por defecto `false`. |
| `loop`                     | `boolean`                      | Si es `true`, la fuente de audio se reproducirá en bucle.                                                        |
| `volume`                   | `number`                       | Volumen de la fuente de audio.                                                                                   |
| `stopOnSceneTransition`    | `boolean`                      | Si es `true`, la fuente de audio se detendrá al cambiar de escena. Por defecto `true`.                           |
| `state` _(solo lectura)_   | `AudioPlayerState`             | Estado actual de la fuente de audio: `"stopped"`, `"playing"` o `"paused"`.                                      |
| `playing` _(solo lectura)_ | `boolean`                      | Devuelve `true` si la fuente de audio se está reproduciendo.                                                     |
| `paused` _(solo lectura)_  | `boolean`                      | Devuelve `true` si la fuente de audio está pausada.                                                              |
| `stopped` _(solo lectura)_ | `boolean`                      | Devuelve `true` si la fuente de audio está detenida.                                                             |

### Métodos

| Método                                 | Descripción                                                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `play(audioSource?: HTMLAudioElement)` | Establece la acción `play` para iniciar la reproducción. Si se pasa un nuevo `audioSource`, se usará esa fuente. |
| `pause()`                              | Establece la acción `pause` para pausar la reproducción actual.                                                  |
| `stop()`                               | Establece la acción `stop` para detener la reproducción y restablecer la posición al inicio.                     |

**Importante:** Estos métodos _no ejecutan ninguna lógica de reproducción directamente_. Solo modifican el estado del atributo `action`. La lógica real de reproducción, pausa o detención es procesada por el sistema encargado de manejar los componentes `AudioPlayer` en el ciclo del juego.

### Ejemplo

```typescript
const audioPlayer = new AudioPlayer({
    audioSource: "sound.mp3",
    volume: 0.5,
    loop: true,
    fixedToTimeScale: false,
});

// Reproducir
audioPlayer.play();

// Pausar
audioPlayer.pause();

// Detener
audioPlayer.stop();
```

### Notas

-   El `AudioPlayer` soporta fuentes de audio tanto como elementos `HTMLAudioElement` ya existentes como rutas de archivos de audio.
-   La acción (`action`) se usa para indicar qué debe hacer el componente en el próximo fotograma y luego se limpia automáticamente.
-   La opción `fixedToTimeScale` es útil para sincronizar efectos de sonido o música con la velocidad de juego modificada (por ejemplo, cámara lenta o aceleración).
-   La opción `stopOnSceneTransition` es útil para elegir si se debe detener la reproducción de audio al cambiar de escena.
-   El uso de este componente cumple con las políticas de reproducción automática de los navegadores modernos. El audio no se reproducirá automáticamente: comenzará una vez que haya habido al menos una interacción humana en la página (por ejemplo, un clic o una pulsación de tecla).
