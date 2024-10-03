![Angry Pixel](https://angrypixel.gg/assets/image/logo-text-white-mid.png)

[![Version](https://img.shields.io/github/v/release/angry-pixel-studio/angry-pixel-engine?include_prereleases&style=for-the-badge)](https://github.com/angry-pixel-studio/angry-pixel-engine/releases)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/master/LICENSE)
[![Docs](https://img.shields.io/badge/docs-angrypixel-blue?style=for-the-badge&color=blue)](https://angrypixel.gg/engine/api-docs)
[![Actions](https://img.shields.io/github/actions/workflow/status/angry-pixel-studio/angry-pixel-engine/main.yml?branch=main&style=for-the-badge)](https://github.com/angry-pixel-studio/angry-pixel-engine/actions?query=workflow%3AContinuous)

## What is Angry Pixel Engine?

It is a 2D engine for browser games written in Typescript.

Main features:

-   [Entity-Component-System](https://github.com/SanderMertens/ecs-faq) based architecture
-   WebGL rendering
-   Sprite-based graphics and frame-by-frame animations
-   Text rendering based on bitmap fonts
-   Shadow/Lights rendering
-   Polygonal collisions and static/dynamic physical responses
-   Keyboard, mouse, gamepad and touch screen input support
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
    public loadAssets(): void {
        this.assetManager.loadImage("logo.png");
    }
}
```

And we add this scene to our game:

```typescript
// arguments: the scene class, the scene name, and true because is the opening scene
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
    public onUpdate(): void {
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
    // in this attribute we load the systems of the scene
    public systems: SystemType<System>[] = [MoveAndBounceSystem];

    public loadAssets(): void {
        this.assetManager.loadImage("logo.png");
    }
}
```

### Create the entities

Finally, we need to create two entities, one that represents our logo, to which we want to apply the behavior of moving and bouncing, and another one that represents the camera of our game. For it we will use the `EntityManager`, specifically the `createEntity` method. This method accepts both classes and instances of components.

```typescript
import { Camera, Scene, SpriteRenderer, Transform } from "angry-pixel";

class MainScene extends Scene {
    public systems: SystemType<System>[] = [MoveAndBounceSystem];

    public loadAssets(): void {
        this.assetManager.loadImage("logo.png");
    }

    // within this method we create the entities
    public setup(): void {
        // camera
        const camera = [Transform, new Camera({ layers: ["Logo"] })];
        this.entityManager.createEntity(camera);

        // logo
        const logo = [
            Transform,
            MoveAndBounce,
            new SpriteRenderer({
                layer: "Logo",
                image: this.assetManager.getImage("logo.png"),
            }),
        ];
        this.entityManager.createEntity(logo);
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
