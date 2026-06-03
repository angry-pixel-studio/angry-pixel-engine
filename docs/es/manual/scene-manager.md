# El Scene Manager

El Scene Manager carga escenas y gestiona las transiciones entre ellas. Las escenas se registran en el juego con `addScene` (consulta [La clase Game](game-class.md)) y se definen extendiendo `Scene` (consulta [Crear una escena](creating-a-scene.md)).

En los sistemas que extienden `GameSystem` está disponible como `this.sceneManager`. Consulta [Componentes y sistemas personalizados](custom-components-and-systems.md).

## Cargar una escena

`loadScene` cambia a la escena registrada con el nombre dado. La transición se hace efectiva en el siguiente frame.

```typescript
import { GameSystem } from "angry-pixel";

export class GameOverSystem extends GameSystem {
    onUpdate() {
        if (/* condición de fin de partida */) {
            this.sceneManager.loadScene("MainMenu");
        }
    }
}
```

Cuando se carga una escena, el Scene Manager:

1. Destruye la escena actual: desactiva sus sistemas, elimina todas sus entidades y cancela todos los intervalos.
2. Carga los recursos de la nueva escena y registra sus sistemas.
3. Una vez que los recursos han terminado de cargarse, crea las entidades de la nueva escena.

Cargar un nombre no registrado lanza un error.

### Conservar entidades entre escenas

`loadScene` acepta un tipo de componente opcional como segundo argumento. Las entidades que tienen un componente de ese tipo se conservan durante la transición en lugar de eliminarse. Esto es útil para entidades que deben persistir entre escenas, como un jugador o un contenedor de la puntuación.

```typescript
import { Persistent } from "../component/Persistent";

this.sceneManager.loadScene("Level2", Persistent);
```

## Estado de carga de la escena

| Miembro | Descripción |
|--------|-------------|
| `loadScene(name, preserveEntitiesWithComponent?)` | Carga la escena registrada con el nombre `name`. |
| `loadingScene` | `true` mientras se está cargando una escena. |
| `sceneLoadedThisFrame` | `true` en el frame en que la escena terminó de cargarse. |

```typescript
if (this.sceneManager.sceneLoadedThisFrame) {
    // ejecutar la inicialización que depende de las entidades de la nueva escena
}
```
