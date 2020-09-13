import Animator from "../../Engine/Components/Animator";
import SpriteRenderer from "../../Engine/Components/SpriteRenderer";
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
    collider = new Rectangle(0, 0, 32, 32);
    wallDetector = new Rectangle(0, 0, 64, 64)
    playerDistance = new Rectangle(0, 0, 128, 128);

    walkSpeed = 3;
    rotationSpeed = 3;

    // status
    aimAngle = 0; // in radians
    previousDirection = new Vector2(1, 0);
    currentDirection = new Vector2(1, 0);
    walkingAnimation = false;
    currentSpeed = new Vector2(0, 0);

    avoidX = 0;
    avoidY = 0;
    
    constructor() {
        super();

        this.tag = TAG_BOT;
        this.layer = LAYER_BOT;
        this.transform.position.set(-800, 250);

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
        this.player = this.findGameObjectByTag(TAG_PLAYER);
        this.tilemap = this.findGameObject('Foreground').getComponent('TilemapRenderer');
    }

    update() {
        this.updateColliders();
        this.updateAimAngle();
        this.updateCurrentDirection();
        this.move();
    }

    updateColliders() {
        this.collider.setPosition(
            this.transform.position.x - this.collider.width / 2,
            this.transform.position.y + this.collider.height / 2
        );

        this.wallDetector.setPosition(
            this.transform.position.x - this.wallDetector.width / 2,
            this.transform.position.y + this.wallDetector.height / 2
        );

        this.playerDistance.setPosition(
            this.transform.position.x - this.wallDetector.width / 2,
            this.transform.position.y + this.wallDetector.height / 2
        );
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

    move() {
        if (this.playerDistance.overlappingRectangle(this.player.collider)) {
            return;
        }

        let deltaX = this.currentDirection.x * this.walkSpeed;
        let deltaY = this.currentDirection.y * this.walkSpeed;

        this.transform.position.x += deltaX;
        this.updateColliders();
        if (deltaX !== 0 && this.isTouchingForeground()) {
            this.transform.position.x -= deltaX;
        }

        this.transform.position.y += deltaY;
        this.updateColliders();
        if (deltaY !== 0 && this.isTouchingForeground()) {
            this.transform.position.y -= deltaY;
        }
    }

    isTouchingForeground() {
        return this.tilemap.isTouchingRect(this.collider);
    }


    animate() {

    }
}