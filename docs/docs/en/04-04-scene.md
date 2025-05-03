# Scene

## Summary

The `Scene` base class defines the general structure and behavior that all game scenes must follow.  
It allows loading resources (`assets`), registering systems (`systems`), and configuring entities when loading a scene.  
The `SceneManager` is responsible for instantiating and managing scenes during the game's lifecycle.

## Responsibilities

-   Define which resources should be loaded (`loadAssets()`).
-   Declare the systems to be used in the scene (`systems` and `loadSystems()`).
-   Create and configure entities when the scene is ready (`setup()`).

## Example of a custom scene

```typescript
class MainScene extends Scene {
    loadAssets() {
        this.assetManager.loadImage("player.png");
        this.assetManager.loadAudio("background-music.ogg");
    }

    loadSystems() {
        this.systems.push(PlayerControllerSystem, ScoreSystem, EnemyAISystem, PauseMenuSystem);
    }

    setup() {
        const player = this.entityManager.createEntity([
            new Transform({ position: new Vector2(100, 100) }),
            new Player({ health: 100 }),
            new SpriteRenderer({ image: "player.png" }),
        ]);
    }
}
```

## Example of registering and loading scenes

```typescript
// Registering scenes at game start
game.addScene(MainScene, "MainScene", true); // initial scene
game.addScene(GameOverScene, "GameOverScene");
```

## Example of changing the scene

```typescript
// Switch to the GameOverScene
sceneManager.loadScene("GameOverScene");
```

## Available methods in Scene

-   `loadAssets()` — Override to load resources.
-   `loadSystems()` — Override to declare systems.
-   `setup()` — Override to create entities when the scene is ready.

## Important notes

-   All scenes share the same instances of `EntityManager` and `AssetManager`.
-   Systems declared in `systems` will be automatically enabled when the scene is loaded.
-   Entities created during `setup()` will be available once all assets have been loaded.
