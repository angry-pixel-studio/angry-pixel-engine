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
    walkSpeed = 4;
    rotationSpeed = 3;
    walkingAnimation = false;
    angle = 0;

    tilemap = null;
    rect = new Rectangle(0, 0, 32, 32);

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

    start() {
        this.tilemap = this.scene.getGameObject('Foreground').getComponent('TilemapRenderer');
    }

    update(event) {
        this.rotate(event.input.keyboard);
        this.walk(event.input.keyboard);
        this.isTouchingForeground();
    }

    walk(keyboard) {
        let delta = 0;

        if (keyboard.isPressed('ArrowUp')) {
            delta += this.walkSpeed;
        } else if (keyboard.isPressed('ArrowDown')) {
            delta -= this.walkSpeed;
        }

        let deltaX = Math.cos(this.angle * Math.PI / 180) * delta;
        let deltaY = -Math.sin(this.angle * Math.PI / 180) * delta;
        
        // todo: this round is nescesary in the worldspace render manager
        deltaX = Number((deltaX).toFixed(2));
        deltaY = Number((deltaY).toFixed(2));
        
        this.transform.position.x += deltaX;
        if (deltaX !== 0 && this.isTouchingForeground()) {
            this.transform.position.x -= deltaX;
        }

        this.transform.position.y += deltaY;
        if (deltaY !== 0 && this.isTouchingForeground()) {
            this.transform.position.y -= deltaY;
        }
        
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
            delta -= this.rotationSpeed;
        } else if (keyboard.isPressed('ArrowRight')) {
            delta += this.rotationSpeed;
        }

        this.angle += delta;
        this.transform.rotation += delta;
    }

    isTouchingForeground() {
        this.rect.x = this.transform.position.x - this.rect.width / 2;
        this.rect.y = this.transform.position.y + this.rect.height / 2;

        return this.tilemap.isTouchingRect(this.rect);
    }
}