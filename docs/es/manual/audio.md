# Audio

El motor reproduce audio de dos formas: el componente [`AudioPlayer`](built-in-components/audio-player.md), para música de fondo y pistas largas con pausa y reanudación, y la utilidad `playSfx`, para efectos de sonido puntuales.

## Cargar archivos de audio

Los archivos de audio se cargan a través del [Asset Manager](asset-manager.md) con `loadAudio`, normalmente en el método `loadAssets` de una escena. Una vez cargado, un recurso de audio se obtiene con `getAudio`.

```typescript
import { Scene } from "angry-pixel";

export class MainScene extends Scene {
    loadAssets() {
        this.assetManager.loadAudio("audio/music/theme.ogg");
        this.assetManager.loadAudio("audio/sfx/coin.ogg");
    }
}
```

## Reproducir música

Para la música de fondo, agrega un componente [`AudioPlayer`](built-in-components/audio-player.md) a una entidad. Usa la Web Audio API, admite reproducción en bucle y pausa/reanudación, y respeta la política de autoreproducción del navegador.

```typescript
import { AudioPlayer } from "angry-pixel";

this.entityManager.createEntity([
    new AudioPlayer({ audioSource: "audio/music/theme.ogg", volume: 0.5, loop: true }),
]);
```

Los métodos `play`, `pause` y `stop` del componente controlan la reproducción. Consulta [`AudioPlayer`](built-in-components/audio-player.md) para la API completa.

## Reproducir efectos de sonido

Para efectos de sonido puntuales como monedas, impactos o respuestas de la interfaz, usa la utilidad `playSfx`. Reproduce el sonido desde el principio, incluso si ya se está reproduciendo, y normalmente se llama desde un sistema.

```typescript
import { GameSystem, playSfx } from "angry-pixel";

export class CoinSystem extends GameSystem {
    onUpdate() {
        const coin = this.assetManager.getAudio("audio/sfx/coin.ogg");
        playSfx({ audioSource: coin });
    }
}
```

`playSfx` acepta las siguientes opciones:

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `audioSource` | `AudioSource` | — | El recurso de audio a reproducir, obtenido con `getAudio`. |
| `volume` | `number` | `1` | Volumen de reproducción. |
| `loop` | `boolean` | `false` | Si el sonido se repite. |

`stopSfx` detiene un efecto de sonido, pausándolo y reiniciándolo al principio. Es útil para interrumpir un efecto en bucle.

```typescript
import { stopSfx } from "angry-pixel";

const coin = this.assetManager.getAudio("audio/sfx/coin.ogg");
stopSfx(coin);
```

> **Nota:** Usa `playSfx` para efectos de sonido cortos y frecuentes, y el componente [`AudioPlayer`](built-in-components/audio-player.md) para música y pistas largas que necesiten pausa y reanudación.
