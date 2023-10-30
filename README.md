# Introduction

## What is Angry Pixel?

Angry Pixel is a 2D engine for browser games written in Typescript.

Main features:

-   Sprites and animations
-   Tilemaps (csv and Tiled)
-   WebGL rendering
-   Polygonal collisions and static physics resolution
-   Input (keyboard, mouse, gamepad, touch)
-   Scene-Object-Component based architecture

## Getting Started

### Installation

```bash
npm i angry-pixel
```

### Initialize

Create and configure a new Game instance.

```typescript
import { Game, GameConfig } from "angry-pixel";

const config: GameConfig = {
    containerNode: document.getElementById("app"),
    gameWidth: 1920,
    gameHeight: 1080,
    canvasColor: "#00D9D9",
};

// create the game
const game = new Game(config);
```

### Create a Scene

Crear la clase MainScene que extiende Scene and load an image that will be used as a Sprite.

```typescript
import { Scene } from "angry-pixel";

class MainScene extends Scene {
    protected init(): void {
        this.assetManager.loadImage("logo.png");
    }
}
```

Add the scene to the game.

```typescript
const config: GameConfig = {
    containerNode: document.getElementById("app"),
    gameWidth: 1920,
    gameHeight: 1080,
    canvasColor: "#00D9D9",
};

// create the game
const game = new Game(config);
// add scene
game.addScene(MainScene, "MainScene");
```

### Create a Game Object

Create the Logo class extending GameObject and add the image using the native SpriteRenderer component.

```typescript
import { GameObject, Sprite, SpriteRenderer } from "angry-pixel";

class Logo extends GameObject {
    protected init(): void {
        this.addComponent(SpriteRenderer, {
            sprite: new Sprite({
                image: this.assetManager.getImage("logo.png"),
            }),
        });
    }
}
```

Add the object to the scene.

```typescript
class MainScene extends Scene {
    protected init(): void {
        this.assetManager.loadImage("logo.png");
        this.addGameObject(Logo);
    }
}
```

### Create a Component

Create the MoveAndBounce class that extends Component and contains the logic for object movement, using the native Transform component (natively included in the GameObject), vectors and delta time.

```typescript
import { Component, Transform, Vector2 } from "angry-pixel";

class MoveAndBounce extends Component {
    private transform: Transform;
    private direction: Vector2;
    private speed: number;

    protected init(): void {
        this.transform = this.gameObject.transform;
        this.direction = new Vector2(1, 1);
        this.speed = 200; // pixels per second
    }

    // this method is called once per frame
    protected update(): void {
        if (this.transform.position.y >= 476 || this.transform.position.y <= -476) {
            this.direction.y *= -1;
        }
        if (this.transform.position.x >= 896 || this.transform.position.x <= -896) {
            this.direction.x *= -1;
        }

        this.transform.position.x += this.direction.x * this.speed * this.timeManager.deltaTime;
        this.transform.position.y += this.direction.y * this.speed * this.timeManager.deltaTime;
    }
}
```

Add the component to the object.

```typescript
class Logo extends GameObject {
    protected init(): void {
        this.addComponent(SpriteRenderer, {
            sprite: new Sprite({
                image: this.assetManager.getImage("logo.png"),
            }),
        });

        this.addComponent(MoveAndBounce);
    }
}
```

### Run the game

```typescript
const config: GameConfig = {
    containerNode: document.getElementById("app"),
    gameWidth: 1920,
    gameHeight: 1080,
    canvasColor: "#00D9D9",
};

// create the game
const game = new Game(config);
// add scene
game.addScene(MainScene, "MainScene");
// run the game
game.run();
```

#### Check this example live [here](https://angrypixel.gg/angry-pixel-logo-bounce)
