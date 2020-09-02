import GameObject from "../../Engine/GameObject";
import SpriteRenderer from '../../Engine/Components/SpriteRenderer';
import Sprite from "../../Engine/Sprite";
import Animator from "../../Engine/Components/Animator";
import { PlayerWalking } from "../Animations/PlayerAnimations";
import Rectangle from "../../Engine/Helper/Rectangle";

const SPRITE_PATH = 'image/demo/player.png';

export const LAYER_PLAYER = 'Player';
export const TAG_PLAYER = 'Player';

export default class Player extends GameObject {
    walkSpeed = 2.5;
    direction = 1;
    walkingAnimation = false;

    constructor() {
        super();

        this.tag = TAG_PLAYER;
        this.layer = LAYER_PLAYER;
        this.transform.position.x = 0;
        this.transform.position.y = -90;

        const image = new Image();
        image.src = SPRITE_PATH;
        
        this.addComponent(() => new SpriteRenderer(this, {
            sprite: new Sprite({
                image: image,
                width: 64,
                height: 64,
                slice: new Rectangle(16, 0, 16, 16),
                smooth: false
            }),
        }));

        this.addComponent(() => new Animator(this));
        this.components.forEach(c => console.log(c.constructor.name));
        this.getComponent(Animator.name).addAnimation('PlayerWalking', PlayerWalking);
    }

    update(event) {
        this.getComponent(SpriteRenderer.name).flipHorizontal = this.direction < 0;
        this.walk(event.input.keyboard);
    }

    walk(keyboard) {
        let deltaX = 0;
        
        if (keyboard.isPressed('ArrowLeft')) {
            deltaX = -this.walkSpeed;
        } else if (keyboard.isPressed('ArrowRight')) {
            deltaX = +this.walkSpeed;
        }
        
        if (deltaX && this.walkingAnimation === false) {
            this.walkingAnimation = true;
            this.getComponent(Animator.name).playAnimation("PlayerWalking");
        } else if (!deltaX && this.walkingAnimation === true) {
            this.walkingAnimation = false;
            this.getComponent(Animator.name).stopAnimation();
        }

        this.direction = deltaX !== 0 ? (deltaX < 0 ? -1 : 1) : this.direction;
        
        this.transform.position.x += deltaX;
    }
}