# The Scene Manager

The scene manager loads scenes and handles transitions between them. Scenes are registered on the game with `addScene` (see [The Game Class](game-class.md)) and defined by extending `Scene` (see [Creating a Scene](creating-a-scene.md)).

In systems extending `GameSystem` it is available as `this.sceneManager`. See [Custom Components and Systems](custom-components-and-systems.md).

## Loading a scene

`loadScene` switches to the scene registered under the given name. The transition takes effect on the next frame.

```typescript
import { GameSystem } from "angry-pixel";

export class GameOverSystem extends GameSystem {
    onUpdate() {
        if (/* game over condition */) {
            this.sceneManager.loadScene("MainMenu");
        }
    }
}
```

When a scene is loaded, the manager:

1. Destroys the current scene: disables its systems, removes all its entities, and clears all intervals.
2. Loads the new scene's assets and registers its systems.
3. Once the assets have finished loading, creates the new scene's entities.

Loading an unregistered name throws an error.

### Preserving entities across scenes

`loadScene` accepts an optional component type as a second argument. Entities that have a component of that type are preserved across the transition instead of being removed. This is useful for entities that should persist between scenes, such as a player or a score holder.

```typescript
import { Persistent } from "../component/Persistent";

this.sceneManager.loadScene("Level2", Persistent);
```

## Scene loading state

| Member | Description |
|--------|-------------|
| `loadScene(name, preserveEntitiesWithComponent?)` | Loads the scene registered under `name`. |
| `loadingScene` | `true` while a scene is loading. |
| `sceneLoadedThisFrame` | `true` on the frame the scene finished loading. |

```typescript
if (this.sceneManager.sceneLoadedThisFrame) {
    // run setup that depends on the new scene's entities
}
```
