import Animator from "../../Engine/Components/Animator";
import RectangleCollider from "../../Engine/Components/Colliders/RectangleCollider";
import SpriteRenderer from "../../Engine/Components/Renderer/SpriteRenderer";
import GameObject from "../../Engine/GameObject";
import Rectangle from "../../Engine/Helper/Rectangle";
import Vector2 from "../../Engine/Helper/Vector2";
import Sprite from "../../Engine/Sprite";
import { PlayerWalking } from "../Animations/PlayerTopAnimations";
import { LAYER_BOT } from "../Config/renderLayers";
import { TAG_PLAYER } from "./PlayerTop";

const SPRITE_PATH = 'image/demo/player-top-down.png';

export const TAG_BOT = 'Bot';

export default class Bot extends GameObject {
    player = null;
    tilemap = null;

    walkSpeed = 180;
    rotationSpeed = 3;

    // status
    aimAngle = 0; // in radians
    previousDirection = new Vector2(1, 0);
    currentDirection = new Vector2(1, 0);
    walkingAnimation = false;
    currentSpeed = new Vector2(0, 0);

    avoidX = 0;
    avoidY = 0;

    constructor(x, y) {
        super();

        this.tag = TAG_BOT;
        this.layer = LAYER_BOT;
        this.transform.position.set(x, y);

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
        this.addComponent(() => new RectangleCollider({ width: 32, height: 32 }), 'RectangleCollider');
    }

    start() {
        this.player = this.findGameObjectByTag(TAG_PLAYER);
        this.tilemap = this.findGameObject('Foreground').getComponent('TilemapRenderer');
    }

    update(event) {
        this.updateAimAngle();
        this.updateCurrentDirection();
        this.move(event.deltaTime);
    }

    updateAimAngle() {
        this.aimAngle = Math.atan2(
            this.player.transform.position.y - this.transform.position.y,
            this.player.transform.position.x - this.transform.position.x
        );
        this.transform.rotation = -this.aimAngle * 180 / Math.PI;
    }

    updateCurrentDirection() {
        this.currentDirection.x = Math.cos(this.aimAngle);
        this.currentDirection.y = Math.sin(this.aimAngle);
    }

    move(deltaTime) {
        const deltaX = this.currentDirection.x * (this.walkSpeed * deltaTime);
        const deltaY = this.currentDirection.y * (this.walkSpeed * deltaTime);

        this.transform.position.x += deltaX;
        if (deltaX !== 0 && this.isTouchingForeground()) {
            this.transform.position.x -= deltaX;
        }

        this.transform.position.y += deltaY;
        if (deltaY !== 0 && this.isTouchingForeground()) {
            this.transform.position.y -= deltaY;
        }
    }

    isTouchingForeground() {
        return this.getComponent('RectangleCollider').collidesWithLayer('Foreground');
    }

    animate() { }
}
