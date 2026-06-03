# El Asset Manager

El Asset Manager carga y obtiene recursos del juego: imágenes, audio, fuentes, vídeos y datos JSON. Carga los recursos de forma asíncrona e informa cuándo han terminado de cargarse.

Dentro de una escena está disponible como `this.assetManager`. En los sistemas se obtiene mediante inyección de dependencias. Consulta [Componentes y sistemas personalizados](custom-components-and-systems.md).

## Cargar recursos

Los recursos se cargan normalmente en el método `loadAssets` de una escena. El motor espera a que todos los recursos solicitados hayan terminado de cargarse antes de crear las entidades de la escena.

```typescript
import { Scene } from "angry-pixel";

export class MainScene extends Scene {
    loadAssets() {
        this.assetManager.loadImage("player.png");
        this.assetManager.loadAudio("music.ogg");
        this.assetManager.loadFont("custom-font", "custom-font.ttf");
        this.assetManager.loadVideo("intro.mp4");
        this.assetManager.loadJson("level.json");
    }
}
```

Los métodos de carga son:

| Método | Parámetros | Devuelve |
|--------|-----------|---------|
| `loadImage` | `url`, `name?` | `HTMLImageElement` |
| `loadAudio` | `url`, `name?` | `AudioSource \| null` |
| `loadFont` | `family`, `url` | `FontFace` |
| `loadVideo` | `url`, `name?` | `HTMLVideoElement` |
| `loadJson<T>` | `url`, `name?` | `Promise<T>` |

Cada recurso se identifica por su `url`. Los recursos de imagen, audio, vídeo y JSON también aceptan un `name` opcional, que puede usarse para obtenerlos más tarde en lugar de la URL. Las fuentes se identifican por su nombre de `family`.

## Obtener recursos

Una vez cargados, los recursos se obtienen por su URL (o por el `name` indicado al cargarlos). Las fuentes se obtienen por su nombre de familia.

```typescript
const playerImage = this.assetManager.getImage("player.png");
const music = this.assetManager.getAudio("music.ogg");
const font = this.assetManager.getFont("custom-font");
const intro = this.assetManager.getVideo("intro.mp4");
const level = this.assetManager.getJson("level.json");
```

Los métodos de obtención son:

| Método | Parámetros | Devuelve |
|--------|-----------|---------|
| `getImage` | `url` o `name` | `HTMLImageElement` |
| `getAudio` | `url` o `name` | `AudioSource` |
| `getFont` | `family` | `FontFace` |
| `getVideo` | `url` o `name` | `HTMLVideoElement` |
| `getJson<T>` | `url` o `name` | `T` |

### Recursos de audio

`loadAudio` y `getAudio` trabajan con un `AudioSource`, que contiene tanto un `AudioBuffer` decodificado como un `HTMLAudioElement`:

```typescript
interface AudioSource {
    buffer?: AudioBuffer;
    element: HTMLAudioElement;
}
```

El `buffer` se rellena de forma asíncrona una vez finaliza la decodificación. En modo headless (sin contexto de audio) `loadAudio` devuelve `null`.

## Comprobar el estado de carga

`getAssetsLoaded` devuelve `true` cuando todos los recursos solicitados han terminado de cargarse.

```typescript
if (this.assetManager.getAssetsLoaded()) {
    // todos los recursos están listos
}
```

Una escena lo usa internamente: su método `createEntities` se ejecuta solo después de que `getAssetsLoaded` devuelva `true`.
