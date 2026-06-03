# La clase Game

La clase `Game` es el punto de entrada del motor. Crea la instancia del juego, contiene sus escenas y dependencias, y controla el bucle de juego.

## Crear una instancia de Game

Una `Game` se crea a partir de un objeto de configuración. El elemento contenedor, el ancho y el alto son obligatorios:

```typescript
import { Game } from "angry-pixel";

const game = new Game({
    containerNode: document.getElementById("app")!,
    width: 1920,
    height: 1080,
});
```

El motor crea un elemento `<canvas>` dentro de `containerNode` con el `width` y el `height` indicados.

## Configuración

El objeto de configuración (`GameConfig`) acepta las siguientes opciones:

| Opción             | Tipo                      | Obligatorio | Valor por defecto | Descripción                                                                                                                                             |
| ------------------ | ------------------------- | ----------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `containerNode`    | `HTMLElement`             | Sí          | —                 | Elemento HTML donde se crea el canvas del juego.                                                                                                        |
| `width`            | `number`                  | Sí          | —                 | Ancho del juego en píxeles.                                                                                                                              |
| `height`           | `number`                  | Sí          | —                 | Alto del juego en píxeles.                                                                                                                               |
| `canvasColor`      | `string`                  | No          | `"#000000"`       | Color de fondo del canvas.                                                                                                                               |
| `physicsFramerate` | `number`                  | No          | `180`             | Frecuencia de ejecución de la física. Valores permitidos: `60`, `120`, `180`, `240`. Una frecuencia mayor hace la física más precisa pero consume más recursos. |
| `headless`         | `boolean`                 | No          | `false`           | Desactiva el renderizado, el audio y la entrada. Pensado para el desarrollo de servidores de juego.                                                     |
| `debug`            | `object`                  | No          | —                 | Opciones de visualización de depuración (ver más abajo).                                                                                                 |
| `collisions`       | `object`                  | No          | —                 | Opciones de detección de colisiones (ver más abajo).                                                                                                     |
| `dependencies`     | `[DependencyName, any][]` | No          | —                 | Dependencias externas accesibles mediante inyección de dependencias.                                                                                     |

### Opciones de depuración

El objeto `debug` activa ayudas de depuración en pantalla:

| Opción                      | Tipo                                                           | Valor por defecto | Descripción                                          |
| --------------------------- | -------------------------------------------------------------- | ----------------- | ---------------------------------------------------- |
| `colliders`                 | `boolean`                                                      | `false`           | Dibuja los colisionadores.                           |
| `mousePosition`             | `boolean`                                                      | `false`           | Muestra la posición del ratón.                       |
| `textRendererBoundingBoxes` | `boolean`                                                      | `false`           | Dibuja las cajas delimitadoras de los TextRenderer.  |
| `collidersColor`            | `string`                                                       | `"#00FF00"`       | Color de los colisionadores.                         |
| `textBoxColor`              | `string`                                                       | `"#0000FF"`       | Color de la caja delimitadora del texto.             |
| `textColor`                 | `string`                                                       | `"#00FF00"`       | Color del texto de depuración.                       |
| `textPosition`              | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right"` | `"bottom-left"`   | Posición del texto de depuración.                    |

### Opciones de colisión

El objeto `collisions` configura la detección de colisiones:

| Opción                      | Tipo                | Valor por defecto               | Descripción                                                                          |
| --------------------------- | ------------------- | ------------------------------- | ------------------------------------------------------------------------------------ |
| `collisionMethod`           | `CollisionMethods`  | `CollisionMethods.SAT`          | Método de detección: `CollisionMethods.SAT` o `CollisionMethods.AABB`.               |
| `collisionBroadPhaseMethod` | `BroadPhaseMethods` | `BroadPhaseMethods.SpatialGrid` | Método de fase amplia: `BroadPhaseMethods.SpatialGrid` o `BroadPhaseMethods.QuadTree`. |
| `collisionMatrix`           | `CollisionMatrix`   | —                               | Pares de capas de colisión a las que se les permite colisionar.                      |

```typescript
import { Game, CollisionMethods, BroadPhaseMethods } from "angry-pixel";

const game = new Game({
    containerNode: document.getElementById("app")!,
    width: 1920,
    height: 1080,
    debug: {
        colliders: true,
        mousePosition: false,
        textRendererBoundingBoxes: false,
    },
    physicsFramerate: 180,
    collisions: {
        collisionMethod: CollisionMethods.SAT,
        collisionBroadPhaseMethod: BroadPhaseMethods.SpatialGrid,
        collisionMatrix: [
            ["player", "enemy"],
            ["player", "wall"],
        ],
    },
});
```

## Agregar escenas

Las escenas se registran con `addScene`. Pasa la clase de la escena y un nombre. El tercer argumento la marca como la escena inicial, la que se carga cuando el juego arranca:

```typescript
import { MainScene } from "./scene/MainScene";

game.addScene(MainScene, "MainScene", true);
```

Un juego puede registrar varias escenas, pero solo una se marca como la escena inicial.

## Iniciar y detener el juego

`start` ejecuta el bucle de juego; `stop` lo detiene. La propiedad `running` indica si el bucle está activo.

```typescript
game.start();

if (game.running) {
    game.stop();
}
```

## Registrar dependencias

Se pueden poner dependencias personalizadas a disposición mediante inyección de dependencias. Registra una clase con `addDependencyType`, o una instancia existente con `addDependencyInstance`:

```typescript
game.addDependencyType(MyService);
game.addDependencyInstance(myConfig, "MyConfig");
```

Las dependencias también pueden proporcionarse de antemano mediante la opción `dependencies` del objeto de configuración.

## Modo headless

Establecer `headless: true` desactiva los sistemas de renderizado, audio y entrada. Este modo está pensado para ejecutar el motor en un servidor, donde no hay canvas ni entrada del usuario.
