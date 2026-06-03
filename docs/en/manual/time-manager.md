# The Time Manager

The time manager provides the time elapsed between frames (delta time), a global time scale, and repeating timers (intervals).

In systems extending `GameSystem` it is available as `this.timeManager`. See [Custom Components and Systems](custom-components-and-systems.md).

## Delta time

Delta time is the time elapsed between the previous frame and the current one, in seconds. Multiplying movement and other rates by delta time keeps them consistent regardless of framerate.

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

The available values are:

| Member | Description |
|--------|-------------|
| `deltaTime` | Time between frames, in seconds. Affected by `timeScale`. Use it in game logic systems. |
| `physicsDeltaTime` | Time between physics frames, in seconds. Affected by `timeScale`. Use it in physics systems. |
| `renderDeltaTime` | Browser frame time, in seconds. Affected by `timeScale`. |
| `unscaledDeltaTime` | `deltaTime` unaffected by `timeScale`. |
| `unscaledPhysicsDeltaTime` | `physicsDeltaTime` unaffected by `timeScale`. |
| `unscaledRenderDeltaTime` | `renderDeltaTime` unaffected by `timeScale`. |
| `browserDeltaTime` | Time between browser frames, in seconds. |

## Time scale

`timeScale` controls how fast time passes. The default is `1`. Setting it to `2` runs time at twice the speed, `0.5` at half speed, and `0` stops everything tied to time.

```typescript
// pause time-based movement
this.timeManager.timeScale = 0;

// slow motion
this.timeManager.timeScale = 0.5;
```

`timeScale` affects `deltaTime`, `physicsDeltaTime`, and `renderDeltaTime`. The `unscaled*` values ignore it.

## Intervals

`setInterval` runs a callback repeatedly at a fixed delay and returns an interval id. `clearInterval` stops one by its id, and `clearAllIntervals` stops all of them.

```typescript
const intervalId = this.timeManager.setInterval({
    callback: () => console.log("called every second"),
    delay: 1000,
});

this.timeManager.clearInterval(intervalId);
```

`setInterval` accepts the following options:

| Option | Type | Description |
|--------|------|-------------|
| `callback` | `() => void` | The function to run at each interval. |
| `delay` | `number` | Time between executions, in milliseconds. |
| `times` | `number` | Optional number of executions before the interval clears itself. Omit for an indefinite interval. |
| `executeImmediately` | `boolean` | Run the callback immediately before starting the timer. |
| `entityRef` | `Entity` | Clears the interval when the entity is disabled or destroyed. |
| `componentRef` | `Component` | Clears the interval when the component is disabled or destroyed. |
| `useTimeScale` | `boolean` | Whether the interval is affected by `timeScale`. Defaults to `true`. |

```typescript
// run five times, then clear automatically
this.timeManager.setInterval({
    callback: () => spawnEnemy(),
    delay: 2000,
    times: 5,
});
```

> **Note:** All intervals are cleared when a new scene is loaded.
