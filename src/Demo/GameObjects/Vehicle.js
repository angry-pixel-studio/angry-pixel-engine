import GameObject from "../../Engine/GameObject";
import SpriteRenderer from '../../Engine/Components/SpriteRenderer';

export default class Vehicle extends GameObject {
    sprite = new Image();
    speed = 0;

    constructor(spritePath, speed) {
        super();

        this.speed = speed;
        this.transform.position.x = 0;
        this.transform.position.y = 0;

        const sprite = new Image();
        sprite.src = spritePath;
        
        this.addComponent(() => new SpriteRenderer(this, {sprite: sprite}));
    }

    gameLoop(event) {
        this.moveVehicle(event.input.keyboard);
    }

    moveVehicle(keyboard) {
        let deltaX = 0;
        let deltaY = 0;
        
        if (keyboard.isPressed('ArrowUp')) {
            deltaY = this.speed;
        } else if (keyboard.isPressed('ArrowDown')) {
            deltaY = -this.speed;
        }

        if (keyboard.isPressed('ArrowLeft')) {
            deltaX = -this.speed;
        } else if (keyboard.isPressed('ArrowRight')) {
            deltaX = +this.speed;
        }
        
        this.transform.position.x += deltaX;
        this.transform.position.y += deltaY;
    }
}