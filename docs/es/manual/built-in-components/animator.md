# Animator

El componente `Animator` reproduce animaciones de sprites. Contiene un mapa de animaciones con nombre y controla cuál se está reproduciendo, su velocidad y su estado de reproducción. Funciona junto con un [`SpriteRenderer`](sprite-renderer.md) en la misma entidad.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `animations` | `Map<string, Animation>` | vacío | Animaciones con nombre disponibles para el componente. |
| `animation` | `string` | — | El nombre de la animación a reproducir. |
| `speed` | `number` | `1` | Multiplicador de la velocidad de reproducción. |
| `playing` | `boolean` | `false` | Si la animación se está reproduciendo. |
| `ignoreTimeScale` | `boolean` | `false` | Si es `true`, la reproducción ignora la escala de tiempo. |

## Propiedades de solo lectura

| Propiedad | Tipo | Descripción |
|----------|------|-------------|
| `currentFrame` | `number` | El frame actual de la animación en reproducción. |
| `currentTime` | `number` | El tiempo transcurrido de la animación en reproducción. |

## Métodos

| Método | Descripción |
|--------|-------------|
| `play(animation?)` | Reproduce la animación. Si se indica un nombre, cambia a ella y la reinicia. |
| `pause()` | Pausa la reproducción, manteniendo el frame actual. |
| `stop()` | Detiene la reproducción y vuelve al primer frame. |

## Animation

Cada entrada de `animations` es una `Animation`, que describe la imagen de origen y la secuencia de frames:

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `image` | `HTMLImageElement \| HTMLImageElement[] \| string \| string[]` | — | La(s) imagen(es) de origen o el/los nombre(s) de recurso. |
| `slice` | `{ size: Vector2; offset?: Vector2; padding?: Vector2 }` | — | Cómo recortar los frames de una hoja de sprites. |
| `frames` | `number[]` | `[]` | La secuencia de índices de frame a reproducir. |
| `fps` | `number` | `12` | Frames por segundo. |
| `loop` | `boolean` | `false` | Si la animación se repite. |

## Ejemplo

```typescript
import { Transform, SpriteRenderer, Animator, Animation, Vector2 } from "angry-pixel";

const idle = new Animation({
    image: "player.png",
    slice: { size: new Vector2(32, 32) },
    frames: [0, 1, 2, 3],
    fps: 10,
    loop: true,
});

this.entityManager.createEntity([
    new Transform(),
    new SpriteRenderer(),
    new Animator({
        animations: new Map([["idle", idle]]),
        animation: "idle",
        playing: true,
    }),
]);
```
