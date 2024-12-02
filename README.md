![Angry Pixel](https://angrypixel.gg/assets/image/logo-text-white-mid.png)

[![NPM Version](https://img.shields.io/npm/v/angry-pixel?style=for-the-badge)](https://www.npmjs.com/package/angry-pixel)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/master/LICENSE)
[![Docs](https://img.shields.io/badge/docs-angrypixel-blue?style=for-the-badge&color=blue)](https://angrypixel.gg/engine/api-docs)
[![Actions](https://img.shields.io/github/actions/workflow/status/angry-pixel-studio/angry-pixel-engine/main.yml?branch=main&style=for-the-badge)](https://github.com/angry-pixel-studio/angry-pixel-engine/actions?query=workflow%3AContinuous)

## What is Angry Pixel Engine?

Angry Pixel Engine is a 2D game engine for browser written in Typescript.

Main features:

-   [Entity-Component-System](https://github.com/SanderMertens/ecs-faq) based architecture
-   WebGL rendering
-   Sprite-based graphics and frame-by-frame animations
-   Text rendering based on bitmap fonts
-   Basic 2D lightning system
-   Polygonal collision detection and physical responses based on speed and acceleration.
-   Keyboard, mouse, gamepad and touch screen input support
-   Ability to create desktop/mobile games using frameworks such as Electron.js
-   Tilemaps: rendering based on comma separated values, and automatic collider generation. Support for JSON files exported from Tiled.
-   Dependency Injection

## Getting Started

Let's create a scene where the Angry Pixel logo bounces off the edges of the screen in a DVD screensaver fashion.

### Installation

```bash
npm i angry-pixel
```

or

```bash
yarn add angry-pixel
```

### Initialize

First we create an instance of the `Game` class:

```typescript
import { Game, GameConfig } from "angry-pixel";

const config: GameConfig = {
    containerNode: document.querySelector("#app"),
    width: 1920,
    height: 1080,
    canvasColor: "#00D9D9",
};

const game = new Game(config);
```

### Create a Scene

Then we will create the `MainScene` class, which extends the `Scene` base class. This class represents a scene in our game, and has three main functions:

-   To load assets.
-   To create the initial entities.
-   To know which are the necessary systems.

For the moment we only implement the function loadAssets to load an image that we will use later:

```typescript
import { Scene } from "angry-pixel";

class MainScene extends Scene {
    // within this method we load the assets
    loadAssets(): void {
        this.assetManager.loadImage("logo.png");
    }
}
```

And we add this scene to our game:

```typescript
// arguments: the scene class, the scene name, opening scene = true
game.addScene(MainScene, "MainScene", true);
```

### Create a Component

Then we will create the `MoveAndBounce` component which has the necessary attributes to define the movement of our entity.

```typescript
import { Vector2 } from "angry-pixel";

class MoveAndBounce {
    boundaries: number[] = [476, -476, 896, -896]; // top, bottom, left, right
    direction: Vector2 = new Vector2(1, 1); // the direction in wich the entity will move
    speed: number = 200; // pixels per second
}
```

### Create a System

Once we have created our component, we will need a system that executes the business logic. Extending the base class `GameSystem`, we will create our `MoveAndBounceSystem`, which, using the `EntityManager`, obtains all the entities that have the `MoveAndBounce` component, and executes the business logic necessary for the entity to move by bouncing on the edges of the screen:

```typescript
import { GameSystem, Transform } from "angry-pixel";

class MoveAndBounceSystem extends GameSystem {
    onUpdate(): void {
        this.entityManager.search(MoveAndBounce).forEach(({ component, entity }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            const { boundaries, direction, speed } = component;

            if (transform.position.y >= boundaries[0] || transform.position.y <= boundaries[1]) {
                direction.y *= -1;
            }

            if (transform.position.x >= boundaries[2] || transform.position.x <= boundaries[3]) {
                direction.x *= -1;
            }

            transform.position.x += direction.x * speed * this.timeManager.deltaTime;
            transform.position.y += direction.y * speed * this.timeManager.deltaTime;
        });
    }
}
```

Once the system is created, we can add it to the scene

```typescript
import { Scene } from "angry-pixel";

class MainScene extends Scene {
    loadAssets(): void {
        this.assetManager.loadImage("logo.png");
    }

    // within this method we load the systems of the scene
    loadSystems(): void {
        this.systems.push(MoveAndBounceSystem);
    }
}
```

### Create the entities

Finally, we need to create two entities, one that represents our logo, to which we want to apply the behavior of moving and bouncing, and another one that represents the camera of our game. For this we will use the `EntityManager`, specifically the `createEntity` method. This method accepts an array of components, the components can be concrete instances (this is useful when it is necessary to pass parameters by constructor) or classes (if it is not necessary to pass parameters by constructor, we can pass only the class).

```typescript
import { Camera, Scene, SpriteRenderer, Transform } from "angry-pixel";

class MainScene extends Scene {
    loadAssets(): void {
        this.assetManager.loadImage("logo.png");
    }

    loadSystems(): void {
        this.systems.push(MoveAndBounceSystem);
    }

    // within this method we create the entities
    setup(): void {
        // camera
        this.entityManager.createEntity([new Transform(), new Camera({ layers: ["Logo"] })]);

        // logo
        this.entityManager.createEntity([
            new Transform(),
            new MoveAndBounce(),
            new SpriteRenderer({
                layer: "Logo",
                image: this.assetManager.getImage("logo.png"),
            }),
        ]);
    }
}
```

### Run the game

Now we can start the game:

```typescript
game.run();
```

### Check this example live

🎮 [https://angrypixel.gg/angry-pixel-logo-bounce](https://angrypixel.gg/angry-pixel-logo-bounce)

## API DOCS

🔎 [https://angrypixel.gg/engine/api-docs](https://angrypixel.gg/engine/api-docs)
