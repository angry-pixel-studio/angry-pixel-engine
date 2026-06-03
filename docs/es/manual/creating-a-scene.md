# Crear una escena

Una escena es una parte autónoma del juego, como un nivel, un menú o una pantalla de carga. Define los recursos que se cargan, los sistemas que se ejecutan y las entidades que se crean cuando se activa.

Una escena se crea extendiendo la clase abstracta `Scene` y sobrescribiendo sus métodos del ciclo de vida.

```typescript
import { Scene } from "angry-pixel";

export class MainScene extends Scene {
    loadAssets() {
        // cargar los recursos que usa la escena
    }

    registerSystems() {
        // registrar los sistemas que se ejecutan en la escena
    }

    createEntities() {
        // crear las entidades iniciales de la escena
    }
}
```

Los tres métodos son opcionales; sobrescribe solo los que la escena necesite.

## Métodos del ciclo de vida

Cuando se carga una escena, el motor ejecuta sus métodos del ciclo de vida en el siguiente orden:

1. **`loadAssets`** — carga los recursos que necesita la escena (imágenes, audio, fuentes, etc.) a través del Asset Manager.
2. **`registerSystems`** — registra los sistemas que se ejecutan mientras la escena está activa.
3. **`createEntities`** — crea las entidades iniciales de la escena. Esto se ejecuta solo después de que todos los recursos solicitados en `loadAssets` hayan terminado de cargarse.

Dentro de una escena tienes acceso a dos miembros protegidos:

- `this.entityManager` — crea y gestiona entidades. Consulta [El Entity Manager](entity-manager.md).
- `this.assetManager` — carga y obtiene recursos. Consulta [El Asset Manager](asset-manager.md).

### Cargar recursos

Usa `this.assetManager` para solicitar los recursos que necesita la escena. El motor espera a que estén completamente cargados antes de llamar a `createEntities`.

```typescript
loadAssets() {
    this.assetManager.loadImage("player.png");
}
```

### Registrar sistemas

Los sistemas que ejecuta una escena se listan en el array `systems`. Agrégalos directamente, o usa los métodos auxiliares `addSystem` y `addSystems`.

```typescript
import { PlayerSystem } from "../system/PlayerSystem";
import { EnemySystem } from "../system/EnemySystem";

registerSystems() {
    this.addSystems([PlayerSystem, EnemySystem]);
}
```

### Crear entidades

Usa `this.entityManager` para crear las entidades que existen cuando la escena se inicia.

```typescript
import { Transform } from "angry-pixel";
import { Player } from "../component/Player";

createEntities() {
    this.entityManager.createEntity([new Transform(), new Player()]);
}
```

## Registrar una escena

Una escena debe registrarse en el juego mediante `addScene`, pasando la clase de la escena y un nombre. Marca una escena como la escena inicial —la que se carga cuando el juego arranca— pasando `true` como tercer argumento.

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

La carga de otras escenas y la transición entre ellas la gestiona el Scene Manager. Consulta [El Scene Manager](scene-manager.md).
