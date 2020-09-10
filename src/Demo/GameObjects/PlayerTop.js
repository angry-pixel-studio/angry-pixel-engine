import GameObject from "../../Engine/GameObject";
import SpriteRenderer from '../../Engine/Components/SpriteRenderer';
import Sprite from "../../Engine/Sprite";
import Animator from "../../Engine/Components/Animator";
import { PlayerWalking } from "../Animations/PlayerTopAnimations";
import Rectangle from "../../Engine/Helper/Rectangle";
import Vector2 from "../../Engine/Helper/Vector2";

const SPRITE_PATH = 'image/demo/player-top-down.png';

export const LAYER_PLAYER = 'Player';
export const TAG_PLAYER = 'Player';

export default class PlayerTop extends GameObject {
    walkSpeed = 2.5;
    walkingAnimation = false;
    angle = 0;

    constructor() {
        super();

        this.tag = TAG_PLAYER;
        this.layer = LAYER_PLAYER;
        this.transform.position.x = 0;
        this.transform.position.y = 0;

        const image = new Image();
        image.src = SPRITE_PATH;
        
        this.addComponent(() => new SpriteRenderer({
            sprite: new Sprite({
                image: image,
                slice: new Rectangle(0, 0, 32, 32),
                scale: new Vector2(2, 2),
                smooth: false
            }),
            rotation: 90
        }), 'SpriteRenderer');

        this.addComponent(() => new Animator({
            spriteRenderer: this.getComponent('SpriteRenderer')
        }), 'Animator');
        this.getComponent('Animator').addAnimation('PlayerWalking', PlayerWalking);
    }

    update(event) {
        this.rotate(event.input.keyboard);
        this.walk(event.input.keyboard);
    }

    walk(keyboard) {
        let delta = 0;

        if (keyboard.isPressed('ArrowUp')) {
            delta = 2;
        } else if (keyboard.isPressed('ArrowDown')) {
            delta = -2;
        }

        const deltaX = Math.cos(this.angle * Math.PI / 180) * delta;
        const deltaY = -Math.sin(this.angle * Math.PI / 180) * delta;
        
        // todo: this round is nescesary in the worldspace render manager
        this.transform.position.x += Number((deltaX).toFixed(2));
        this.transform.position.y += Number((deltaY).toFixed(2));

        if (delta && this.walkingAnimation === false) {
            this.walkingAnimation = true;
            this.getComponent('Animator').playAnimation("PlayerWalking");
        } else if (!delta && this.walkingAnimation === true) {
            this.walkingAnimation = false;
            this.getComponent('Animator').stopAnimation();
        }
    }

    rotate (keyboard) {
        let delta = 0;

        if (keyboard.isPressed('ArrowLeft')) {
            delta -= 2;
        } else if (keyboard.isPressed('ArrowRight')) {
            delta += 2;
        }

        this.angle += delta;
        this.transform.rotation += delta;
    }
}