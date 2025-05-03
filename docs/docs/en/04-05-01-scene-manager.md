# SceneManager

## Overview

The `SceneManager` is responsible for managing game scenes, including loading, transitioning, and handling their lifecycle.  
It allows registering scenes, loading a specific scene, and managing the game's startup through an opening scene.

## Responsibilities

-   Register and store scenes.
-   Load scenes and handle transitions.
-   Execute asset loading, system registration, and entity setup for each scene.
-   Manage cleanup of resources and entities when switching scenes.

## Usage Example

```typescript
// Register scenes
this.sceneManager.addScene(MainMenuScene, "MainMenu", true);
this.sceneManager.addScene(GameplayScene, "Gameplay");

// Load the opening scene
this.sceneManager.loadOpeningScene();

// Switch to another scene at any time
this.sceneManager.loadScene("Gameplay");
```

## Scene Loading Flow

1. Calls the scene’s `loadAssets()` to load resources.
2. Calls `loadSystems()` to register the systems the scene will use.
3. Waits until all assets are fully loaded.
4. Calls `setup()` to create entities and configure the scene’s initial state.
5. Activates the systems and executes them in the defined order.

## Notes

-   The `SceneManager` ensures that all systems and entities from the previous scene are removed before loading a new scene.
-   The `AudioPlayerSystem` and `VideoRendererSystem` remain active between scenes.
-   All time intervals (`setInterval`) are automatically cleared when switching scenes to prevent unintended behavior.
