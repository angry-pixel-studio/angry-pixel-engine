# Scene

## Resumen

La clase base `Scene` define la estructura y el comportamiento general que deben seguir todas las escenas del juego.  
Permite cargar recursos (`assets`), registrar sistemas (`systems`) y configurar entidades al momento de cargar una escena.  
El `SceneManager` se encarga de instanciar y administrar las escenas durante el ciclo de vida del juego.

## Responsabilidades

-   Definir qué recursos deben cargarse (`loadAssets()`).
-   Declarar los sistemas que se utilizarán en la escena (`registerSystems()`).
-   Crear y configurar entidades cuando la escena esté lista (`createEntities()`).

## Ejemplo de una escena personalizada

```typescript
class MainScene extends Scene {
    loadAssets() {
        this.assetManager.loadImage("player.png");
        this.assetManager.loadAudio("background-music.ogg");
    }

    registerSystems() {
        this.addSystems([PlayerControllerSystem, ScoreSystem, EnemyAISystem, PauseMenuSystem]);
    }

    createEntities() {
        const player = this.entityManager.createEntity([
            new Transform({ position: new Vector2(100, 100) }),
            new Player({ health: 100 }),
            new SpriteRenderer({ image: "player.png" }),
        ]);
    }
}
```

## Ejemplo de registro de escenas y carga

```typescript
// Registro de escenas en el inicio del juego
game.addScene(MainScene, "MainScene", true); // escena inicial
game.addScene(GameOverScene, "GameOverScene");
```

## Ejemplo de cambio de escena

```typescript
// Cambiar a la escena GameOverScene
sceneManager.loadScene("GameOverScene");
```

## Métodos disponibles en Scene

-   `loadAssets()` — Sobrescribir para cargar los recursos.
-   `registerSystems()` — Sobrescribir para declarar sistemas.
-   `createEntities()` — Sobrescribir para crear entidades cuando la escena esté lista.

## Notas importantes

-   Todas las escenas comparten las mismas instancias de `EntityManager` y `AssetManager`.
-   Los sistemas declarados en `registerSystems()` serán habilitados automáticamente cuando la escena se cargue.
-   Las entidades creadas durante `createEntities()` estarán disponibles una vez que todos los recursos hayan sido cargados.
