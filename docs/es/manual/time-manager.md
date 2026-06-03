# El Time Manager

El Time Manager proporciona el tiempo transcurrido entre frames (delta time), una escala de tiempo global y temporizadores repetitivos (intervalos).

En los sistemas que extienden `GameSystem` está disponible como `this.timeManager`. Consulta [Componentes y sistemas personalizados](custom-components-and-systems.md).

## Delta time

El delta time es el tiempo transcurrido entre el frame anterior y el actual, en segundos. Multiplicar el movimiento y otras tasas por el delta time las mantiene consistentes independientemente de la frecuencia de frames.

```typescript
import { GameSystem, Transform } from "angry-pixel";
import { Player } from "../component/Player";

export class PlayerSystem extends GameSystem {
    onUpdate() {
        this.entityManager.search(Player, (player, entity) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            transform.position.x += player.speed * this.timeManager.deltaTime;
        });
    }
}
```

Los valores disponibles son:

| Miembro | Descripción |
|--------|-------------|
| `deltaTime` | Tiempo entre frames, en segundos. Afectado por `timeScale`. Úsalo en los sistemas de lógica de juego. |
| `physicsDeltaTime` | Tiempo entre frames de física, en segundos. Afectado por `timeScale`. Úsalo en los sistemas de física. |
| `renderDeltaTime` | Tiempo de frame del navegador, en segundos. Afectado por `timeScale`. |
| `unscaledDeltaTime` | `deltaTime` sin verse afectado por `timeScale`. |
| `unscaledPhysicsDeltaTime` | `physicsDeltaTime` sin verse afectado por `timeScale`. |
| `unscaledRenderDeltaTime` | `renderDeltaTime` sin verse afectado por `timeScale`. |
| `browserDeltaTime` | Tiempo entre frames del navegador, en segundos. |

## Escala de tiempo

`timeScale` controla la velocidad a la que transcurre el tiempo. El valor por defecto es `1`. Establecerlo en `2` hace que el tiempo transcurra al doble de velocidad, `0.5` a la mitad, y `0` detiene todo lo relacionado con el tiempo.

```typescript
// pausar el movimiento basado en el tiempo
this.timeManager.timeScale = 0;

// cámara lenta
this.timeManager.timeScale = 0.5;
```

`timeScale` afecta a `deltaTime`, `physicsDeltaTime` y `renderDeltaTime`. Los valores `unscaled*` lo ignoran.

## Intervalos

`setInterval` ejecuta un callback repetidamente con un retardo fijo y devuelve un id de intervalo. `clearInterval` detiene uno por su id, y `clearAllIntervals` los detiene todos.

```typescript
const intervalId = this.timeManager.setInterval({
    callback: () => console.log("llamado cada segundo"),
    delay: 1000,
});

this.timeManager.clearInterval(intervalId);
```

`setInterval` acepta las siguientes opciones:

| Opción | Tipo | Descripción |
|--------|------|-------------|
| `callback` | `() => void` | La función a ejecutar en cada intervalo. |
| `delay` | `number` | Tiempo entre ejecuciones, en milisegundos. |
| `times` | `number` | Número opcional de ejecuciones antes de que el intervalo se cancele a sí mismo. Omítelo para un intervalo indefinido. |
| `executeImmediately` | `boolean` | Ejecuta el callback inmediatamente antes de iniciar el temporizador. |
| `entityRef` | `Entity` | Cancela el intervalo cuando la entidad se desactiva o se destruye. |
| `componentRef` | `Component` | Cancela el intervalo cuando el componente se desactiva o se destruye. |
| `useTimeScale` | `boolean` | Si el intervalo se ve afectado por `timeScale`. Por defecto `true`. |

```typescript
// se ejecuta cinco veces y luego se cancela automáticamente
this.timeManager.setInterval({
    callback: () => spawnEnemy(),
    delay: 2000,
    times: 5,
});
```

> **Nota:** Todos los intervalos se cancelan cuando se carga una nueva escena.
