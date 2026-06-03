# Custom Components and Systems

Game behavior is added by writing your own components (data) and systems (logic). See [Architecture](../welcome/architecture.md) for the ECS overview.

## Custom components

A component is a plain class that holds data and contains no logic. A common convention is to accept a partial options object in the constructor and assign it, so the component can be created with or without initial values:

```typescript
import { Vector2 } from "angry-pixel";

export class Player {
    public health: number = 100;
    public speed: number = 200;
    public direction: Vector2 = new Vector2();

    constructor(options?: Partial<Player>) {
        Object.assign(this, options);
    }
}
```

Component classes are typically kept in `src/component/`. They are attached to entities through archetypes or the entity manager. See [Adding Entities to the Scene](adding-entities-to-the-scene.md).

## Custom systems

A system contains logic that operates on entities through their components. The recommended way to create one is to extend the abstract `GameSystem` class, which provides the engine's core managers through dependency injection.

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

System classes are typically kept in `src/system/`.

### Injected managers

`GameSystem` exposes these members:

| Member | Description |
|--------|-------------|
| `entityManager` | Create, query, and modify entities and components. See [The Entity Manager](entity-manager.md). |
| `assetManager` | Load and retrieve assets. See [The Asset Manager](asset-manager.md). |
| `sceneManager` | Load scenes and handle transitions. See [The Scene Manager](scene-manager.md). |
| `timeManager` | Game timing and delta time. See [The Time Manager](time-manager.md). |
| `inputManager` | Keyboard, mouse, gamepad, and touch input. See [The Input Manager](input-manager.md). |
| `collisionRepository` | Query collision and physics data. See [Physics](physics.md). |
| `gameConfig` | The game's configuration object. |

### Lifecycle methods

A system can implement the following methods. Only `onUpdate` is required for most systems:

| Method | When it runs |
|--------|-------------|
| `onCreate` | The first time the system is enabled. |
| `onEnabled` | When the system is enabled. |
| `onUpdate` | Once every frame, while the system is enabled. |
| `onDisabled` | When the system is disabled. |
| `onDestroy` | When the system is destroyed. |

## Registering a system

A system runs only after it is registered in a scene's `registerSystems` method:

```typescript
import { Scene } from "angry-pixel";
import { PlayerSystem } from "../system/PlayerSystem";

export class MainScene extends Scene {
    registerSystems() {
        this.addSystems([PlayerSystem]);
    }
}
```

Systems execute in the order they are registered.

## Execution phase

By default, a system runs in the **game logic** phase. A decorator can assign it to a different phase:

| Decorator | Phase | Use for |
|-----------|-------|---------|
| `@gameLogicSystem()` | Game logic | Gameplay, AI, input processing (the default). |
| `@gamePhysicsSystem()` | Physics | Physics-related updates, which run at the physics framerate. |
| `@gamePreRenderSystem()` | Pre-render | Work that must happen before rendering, such as sorting sprites or positioning the camera. |

```typescript
import { GameSystem, gamePhysicsSystem } from "angry-pixel";

@gamePhysicsSystem()
export class MovementSystem extends GameSystem {
    onUpdate() {
        // runs in the physics phase
    }
}
```

## Injecting custom dependencies

A system can receive custom dependencies through dependency injection. Register the dependency on the game (see [The Game Class](game-class.md)), then inject it with the `inject` decorator using the name it was registered under:

```typescript
import { GameSystem, inject } from "angry-pixel";
import { ScoreService } from "../service/ScoreService";

export class ScoreSystem extends GameSystem {
    @inject("ScoreService") private readonly scoreService: ScoreService;

    onUpdate() {
        // use this.scoreService
    }
}
```

The built-in managers are available under the `SYMBOLS` identifiers, for example `@inject(SYMBOLS.EntityManager)`. A system that does not extend `GameSystem` can implement the `System` interface directly and inject only the dependencies it needs.
