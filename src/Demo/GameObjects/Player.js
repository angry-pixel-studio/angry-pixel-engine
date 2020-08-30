import GameObject from "../../Engine/GameObject";
import SpriteRenderer from '../../Engine/Components/SpriteRenderer';
import Sprite from "../../Engine/Rendering/Sprite";
import Animator from "../../Engine/Components/Animator";
import { PlayerWalking } from "../Animations/PlayerAnimations";

const SPRITE_PATH = 'image/demo/player.png'

export default class Player extends GameObject {
    sprite = null;
    walkSpeed = 2.5;
    direction = 1;
    walkingAnimation = false;

    constructor() {
        super();

        this.transform.position.x = 0;
        this.transform.position.y = 0;

        this.transform.scale.x = 1;
        this.transform.scale.y = 1;

        const image = new Image();
        image.src = SPRITE_PATH;
        
        this.addComponent(() => new SpriteRenderer(this, {
            sprite: new Sprite({
                image: image,
                width: 64,
                height: 64,
                slice: {x: 16, y: 0, width: 16, height: 16},
                smooth: false
            }),
        }));

        this.addComponent(() => new Animator(this));
        this.getComponent(Animator.name).addAnimation('PlayerWalking', PlayerWalking);
    }

    update(event) {
        this.getComponent(SpriteRenderer.name).flipHorizontal = this.direction < 0;
        this.walk(event.input.keyboard);
    }

    walk(keyboard) {
        let deltaX = 0;
        let deltaY = 0;
        
        if (keyboard.isPressed('ArrowUp')) {
            deltaY = this.walkSpeed;
        } else if (keyboard.isPressed('ArrowDown')) {
            deltaY = -this.walkSpeed;
        }

        if (keyboard.isPressed('ArrowLeft')) {
            deltaX = -this.walkSpeed;
        } else if (keyboard.isPressed('ArrowRight')) {
            deltaX = +this.walkSpeed;
        }
        
        if ((deltaX || deltaY)  && this.walkingAnimation === false) {
            this.walkingAnimation = true;
            this.getComponent(Animator.name).playAnimation("PlayerWalking");
        } else if ((!deltaX && !deltaY) && this.walkingAnimation === true) {
            this.walkingAnimation = false;
            this.getComponent(Animator.name).stopAnimation();
        }

        this.direction = deltaX !== 0 ? (deltaX < 0 ? -1 : 1) : this.direction;
        
        this.transform.position.x += deltaX;
        this.transform.position.y += deltaY;
    }
}