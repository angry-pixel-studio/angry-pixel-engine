# The Game Class

The `Game` class is the entry point of the engine. It creates the game instance, holds its scenes and dependencies, and controls the game loop.

## Creating a game instance

A `Game` is created from a configuration object. The container element, width, and height are required:

```typescript
import { Game } from "angry-pixel";

const game = new Game({
    containerNode: document.getElementById("app")!,
    width: 1920,
    height: 1080,
});
```

The engine creates a `<canvas>` element inside `containerNode` with the given `width` and `height`.

## Configuration

The configuration object (`GameConfig`) accepts the following options:

| Option             | Type                      | Required | Default     | Description                                                                                                                                             |
| ------------------ | ------------------------- | -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `containerNode`    | `HTMLElement`             | Yes      | —           | HTML element where the game canvas is created.                                                                                                          |
| `width`            | `number`                  | Yes      | —           | Game width in pixels.                                                                                                                                   |
| `height`           | `number`                  | Yes      | —           | Game height in pixels.                                                                                                                                  |
| `canvasColor`      | `string`                  | No       | `"#000000"` | Background color of the canvas.                                                                                                                         |
| `physicsFramerate` | `number`                  | No       | `180`       | Framerate for physics execution. Allowed values: `60`, `120`, `180`, `240`. A higher framerate makes physics more accurate but consumes more resources. |
| `headless`         | `boolean`                 | No       | `false`     | Disables rendering, audio, and input. Intended for game server development.                                                                             |
| `debug`            | `object`                  | No       | —           | Debug visualization options (see below).                                                                                                                |
| `collisions`       | `object`                  | No       | —           | Collision detection options (see below).                                                                                                                |
| `dependencies`     | `[DependencyName, any][]` | No       | —           | External dependencies accessible through dependency injection.                                                                                          |

### Debug options

The `debug` object enables on-screen debugging aids:

| Option                      | Type                                                           | Default         | Description                        |
| --------------------------- | -------------------------------------------------------------- | --------------- | ---------------------------------- |
| `colliders`                 | `boolean`                                                      | `false`         | Draw colliders.                    |
| `mousePosition`             | `boolean`                                                      | `false`         | Show the mouse position.           |
| `textRendererBoundingBoxes` | `boolean`                                                      | `false`         | Draw text renderer bounding boxes. |
| `collidersColor`            | `string`                                                       | `"#00FF00"`     | Color of the colliders.            |
| `textBoxColor`              | `string`                                                       | `"#0000FF"`     | Color of the text bounding box.    |
| `textColor`                 | `string`                                                       | `"#00FF00"`     | Color of the debug text.           |
| `textPosition`              | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right"` | `"bottom-left"` | Position of the debug text.        |

### Collision options

The `collisions` object configures collision detection:

| Option                      | Type                | Default                         | Description                                                                          |
| --------------------------- | ------------------- | ------------------------------- | ------------------------------------------------------------------------------------ |
| `collisionMethod`           | `CollisionMethods`  | `CollisionMethods.SAT`          | Detection method: `CollisionMethods.SAT` or `CollisionMethods.AABB`.                 |
| `collisionBroadPhaseMethod` | `BroadPhaseMethods` | `BroadPhaseMethods.SpatialGrid` | Broad phase method: `BroadPhaseMethods.SpatialGrid` or `BroadPhaseMethods.QuadTree`. |
| `collisionMatrix`           | `CollisionMatrix`   | —                               | Pairs of collision layers that are allowed to collide.                               |

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

## Adding scenes

Scenes are registered with `addScene`. Pass the scene class and a name. The third argument marks it as the opening scene — the one loaded when the game starts:

```typescript
import { MainScene } from "./scene/MainScene";

game.addScene(MainScene, "MainScene", true);
```

A game can register multiple scenes, but only one is marked as the opening scene.

## Starting and stopping the game

`start` runs the game loop; `stop` halts it. The `running` property reports whether the loop is active.

```typescript
game.start();

if (game.running) {
    game.stop();
}
```

## Registering dependencies

Custom dependencies can be made available through dependency injection. Register a class with `addDependencyType`, or an existing instance with `addDependencyInstance`:

```typescript
game.addDependencyType(MyService);
game.addDependencyInstance(myConfig, "MyConfig");
```

Dependencies can also be provided up front through the `dependencies` option in the configuration object.

## Headless mode

Setting `headless: true` disables rendering, audio, and input systems. This mode is intended for running the engine on a server, where no canvas or user input is available.
