# Creating a Scene

A scene is a self-contained part of the game, such as a level, a menu, or a loading screen. It defines the assets to load, the systems to run, and the entities to create when it becomes active.

A scene is created by extending the abstract `Scene` class and overriding its lifecycle methods.

```typescript
import { Scene } from "angry-pixel";

export class MainScene extends Scene {
    loadAssets() {
        // load the assets used by the scene
    }

    registerSystems() {
        // register the systems that run in the scene
    }

    createEntities() {
        // create the initial entities of the scene
    }
}
```

All three methods are optional; override only the ones the scene needs.

## Lifecycle methods

When a scene is loaded, the engine runs its lifecycle methods in the following order:

1. **`loadAssets`** — load the assets the scene needs (images, audio, fonts, etc.) through the asset manager.
2. **`registerSystems`** — register the systems that run while the scene is active.
3. **`createEntities`** — create the scene's initial entities. This runs only after all assets requested in `loadAssets` have finished loading.

Inside a scene you have access to two protected members:

- `this.entityManager` — creates and manages entities. See [The Entity Manager](entity-manager.md).
- `this.assetManager` — loads and retrieves assets. See [The Asset Manager](asset-manager.md).

### Loading assets

Use `this.assetManager` to request the assets the scene needs. The engine waits until they are fully loaded before calling `createEntities`.

```typescript
loadAssets() {
    this.assetManager.loadImage("player.png");
}
```

### Registering systems

The systems a scene runs are listed in the `systems` array. Add them directly, or use the `addSystem` and `addSystems` helpers.

```typescript
import { PlayerSystem } from "../system/PlayerSystem";
import { EnemySystem } from "../system/EnemySystem";

registerSystems() {
    this.addSystems([PlayerSystem, EnemySystem]);
}
```

### Creating entities

Use `this.entityManager` to create the entities that exist when the scene starts.

```typescript
import { Transform } from "angry-pixel";
import { Player } from "../component/Player";

createEntities() {
    this.entityManager.createEntity([new Transform(), new Player()]);
}
```

## Registering a scene

A scene must be registered with the game through `addScene`, passing the scene class and a name. Mark one scene as the opening scene — the one loaded when the game starts — by passing `true` as the third argument.

```typescript
import { Game } from "angry-pixel";
import { MainScene } from "./scene/MainScene";

const game = new Game({
    containerNode: document.getElementById("app")!,
    width: 1920,
    height: 1080,
});

game.addScene(MainScene, "MainScene", true);
game.start();
```

Loading other scenes and transitioning between them is handled by the scene manager. See [The Scene Manager](scene-manager.md).
