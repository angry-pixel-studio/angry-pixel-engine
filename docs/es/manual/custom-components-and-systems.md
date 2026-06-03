# Componentes y sistemas personalizados

El comportamiento del juego se agrega escribiendo tus propios componentes (datos) y sistemas (lógica). Consulta [Arquitectura](../welcome/architecture.md) para una visión general de ECS.

## Componentes personalizados

Un componente es una clase simple que contiene datos y no contiene lógica. Una convención habitual es aceptar un objeto de opciones parcial en el constructor y asignarlo, de modo que el componente pueda crearse con o sin valores iniciales:

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

Las clases de componentes se suelen mantener en `src/component/`. Se asocian a las entidades mediante arquetipos o el Entity Manager. Consulta [Agregar entidades a la escena](adding-entities-to-the-scene.md).

## Sistemas personalizados

Un sistema contiene lógica que opera sobre las entidades a través de sus componentes. La forma recomendada de crear uno es extender la clase abstracta `GameSystem`, que proporciona los gestores principales del motor mediante inyección de dependencias.

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

Las clases de sistemas se suelen mantener en `src/system/`.

### Gestores inyectados

`GameSystem` expone estos miembros:

| Miembro | Descripción |
|--------|-------------|
| `entityManager` | Crea, consulta y modifica entidades y componentes. Consulta [El Entity Manager](entity-manager.md). |
| `assetManager` | Carga y obtiene recursos. Consulta [El Asset Manager](asset-manager.md). |
| `sceneManager` | Carga escenas y gestiona las transiciones. Consulta [El Scene Manager](scene-manager.md). |
| `timeManager` | Tiempo del juego y delta time. Consulta [El Time Manager](time-manager.md). |
| `inputManager` | Entrada de teclado, ratón, gamepad y táctil. Consulta [El Input Manager](input-manager.md). |
| `collisionRepository` | Consulta datos de colisiones y física. Consulta [Física](physics.md). |
| `gameConfig` | El objeto de configuración del juego. |

### Métodos del ciclo de vida

Un sistema puede implementar los siguientes métodos. Para la mayoría de los sistemas solo se necesita `onUpdate`:

| Método | Cuándo se ejecuta |
|--------|-------------|
| `onCreate` | La primera vez que se activa el sistema. |
| `onEnabled` | Cuando se activa el sistema. |
| `onUpdate` | Una vez por frame, mientras el sistema está activado. |
| `onDisabled` | Cuando se desactiva el sistema. |
| `onDestroy` | Cuando se destruye el sistema. |

## Registrar un sistema

Un sistema se ejecuta solo después de registrarse en el método `registerSystems` de una escena:

```typescript
import { Scene } from "angry-pixel";
import { PlayerSystem } from "../system/PlayerSystem";

export class MainScene extends Scene {
    registerSystems() {
        this.addSystems([PlayerSystem]);
    }
}
```

Los sistemas se ejecutan en el orden en que se registran.

## Fase de ejecución

Por defecto, un sistema se ejecuta en la fase de **lógica de juego**. Un decorador puede asignarlo a una fase distinta:

| Decorador | Fase | Para |
|-----------|-------|---------|
| `@gameLogicSystem()` | Lógica de juego | Jugabilidad, IA, procesamiento de entrada (el valor por defecto). |
| `@gamePhysicsSystem()` | Física | Actualizaciones relacionadas con la física, que se ejecutan a la frecuencia de la física. |
| `@gamePreRenderSystem()` | Pre-renderizado | Trabajo que debe ocurrir antes del renderizado, como ordenar sprites o posicionar la cámara. |

```typescript
import { GameSystem, gamePhysicsSystem } from "angry-pixel";

@gamePhysicsSystem()
export class MovementSystem extends GameSystem {
    onUpdate() {
        // se ejecuta en la fase de física
    }
}
```

## Inyectar dependencias personalizadas

Un sistema puede recibir dependencias personalizadas mediante inyección de dependencias. Registra la dependencia en el juego (consulta [La clase Game](game-class.md)) y luego inyéctala con el decorador `inject` usando el nombre con el que se registró:

```typescript
import { GameSystem, inject } from "angry-pixel";
import { ScoreService } from "../service/ScoreService";

export class ScoreSystem extends GameSystem {
    @inject("ScoreService") private readonly scoreService: ScoreService;

    onUpdate() {
        // usar this.scoreService
    }
}
```

Los gestores integrados están disponibles bajo los identificadores `SYMBOLS`, por ejemplo `@inject(SYMBOLS.EntityManager)`. Un sistema que no extiende `GameSystem` puede implementar la interfaz `System` directamente e inyectar solo las dependencias que necesite.
