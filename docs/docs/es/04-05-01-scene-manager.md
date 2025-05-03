# SceneManager

## Resumen

El `SceneManager` se encarga de administrar las escenas del juego, incluyendo su carga, transición y ciclo de vida.  
Permite registrar escenas, cargar una escena específica y manejar el inicio del juego mediante una escena de apertura (opening scene).

## Responsabilidades

-   Registrar y almacenar escenas.
-   Cargar escenas y manejar transiciones.
-   Ejecutar la carga de recursos, sistemas y entidades de cada escena.
-   Gestionar la limpieza de recursos y entidades al cambiar de escena.

## Ejemplo de uso

```typescript
// Registrar escenas
this.sceneManager.addScene(MainMenuScene, "MainMenu", true);
this.sceneManager.addScene(GameplayScene, "Gameplay");

// Cargar la escena de apertura
this.sceneManager.loadOpeningScene();

// Cambiar a otra escena en cualquier momento
this.sceneManager.loadScene("Gameplay");
```

## Flujo de carga de una escena

1. Se llama a `loadAssets()` de la escena para cargar recursos.
2. Se llama a `loadSystems()` para registrar los sistemas que usará la escena.
3. Se espera a que todos los recursos estén completamente cargados.
4. Se llama a `setup()` para crear entidades y configurar el estado inicial de la escena.
5. Los sistemas son activados y ejecutados en el orden definido.

## Notas

-   El `SceneManager` asegura que todos los sistemas y entidades de la escena anterior sean eliminados antes de cargar una nueva escena.
-   Los sistemas `AudioPlayerSystem` y `VideoRendererSystem` se mantienen activos entre escenas.
-   Los intervalos de tiempo (`setInterval`) son borrados automáticamente al cambiar de escena para evitar comportamientos no deseados.
