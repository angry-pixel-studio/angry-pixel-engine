# Angry Pixel Engine

## What is Angry Pixel Engine?

It is a 2D engine for browser games written in Typescript.

Main features:

-   Entity-Component-System based architecture
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

First we create an instance of the Game class:

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

Then we will create the MainScene class, which extends the Scene base class. This class represents a scene in our game, and has three main functions:

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

Then we will create the MoveAndBounce component which has the necessary attributes to define the movement of our entity.

```typescript
import { Vector2 } from "angry-pixel";

class MoveAndBounce {
    boundaries: number[] = [476, -476, 896, -896]; // top, bottom, left, right
    direction: Vector2 = new Vector2(1, 1); // the direction in wich the entity will move
    speed: number = 200; // pixels per second
}
```

### Create a System

Once we have created our component, we will need a system that executes the business logic. Extending the base class GameSystem, we will create our MoveAndBounceSystem, which, using the EntityManager, obtains all the entities that have the MoveAndBounce component, and executes the business logic necessary for the entity to move by bouncing on the edges of the screen:

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

Finally, we need two entities, one that represents our logo, which we want to move, and another one that represents the camera of our game. To do this we will create the entities in the following way:

```typescript
import { Camera, Component, Scene, SpriteRenderer, Transform } from "angry-pixel";

class MainScene extends Scene {
    public systems: SystemType<System>[] = [MoveAndBounceSystem];

    public loadAssets(): void {
        this.assetManager.loadImage("logo.png");
    }

    // within this method we create the entities
    public setup(): void {
        // camera
        const cameraArchetype: Component[] = [new Transform(), new Camera({ layers: ["Logo"] })];
        this.entityManager.createEntity(cameraArchetype);

        // logo
        const logoArchetype: Component[] = [
            new Transform(),
            new SpriteRenderer({
                layer: "Logo",
                image: this.assetManager.getImage("logo.png"),
            }),
            new MoveAndBounce(),
        ];
        this.entityManager.createEntity(logoArchetype);
    }
}
```

### Run the game

```typescript
game.run();
```

### Check this example live

🎮 [https://angrypixel.gg/angry-pixel-logo-bounce](https://angrypixel.gg/angry-pixel-logo-bounce)

## API DOCS

🔎 [https://angrypixel.gg/engine/api-docs](https://angrypixel.gg/engine/api-docs)
