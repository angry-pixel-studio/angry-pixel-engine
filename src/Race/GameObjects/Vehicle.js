import GameObject from "../../Engine/GameObject";
import SpriteRenderer from '../../Engine/Components/SpriteRenderer';
import Circuit from "./Circuit";
import Sprite from "../../Engine/Sprite";

export const TAG_PLAYER = 'player';

const PLAYER_SPRITE = 'image/circle-player.png';
const RIVAL_SPRITE = 'image/circle-rival.png';
const SPOT_RADIUS = 2;

export default class Vehicle extends GameObject {
    sprite = new Image();
    speed = 0;
    stop = false;
    direction = 1;

    // Circuit spots
    circuitSpots = null;
    currentSpot = null;
    nextSpot = null;
    nextSpotIndex = 0;

    username = null;

    constructor(username, isPlayer) {
        super();

        this.tag = isPlayer !== undefined && isPlayer === true ? TAG_PLAYER : null;

        const image = new Image();
        image.src = isPlayer ? PLAYER_SPRITE : RIVAL_SPRITE;

        this.username = username,

        this.addComponent(() => new SpriteRenderer(this, {
            sprite: new Sprite({
                image: image
            })
        }));
    }

    start() {
        this.circuitSpots = this.scene.getGameObject(Circuit.name).spots;
        this.currentSpot = this.circuitSpots[this.nextSpotIndex];
        this.nextSpot = this.circuitSpots[this.nextSpotIndex];

        this.transform.position.x = this.currentSpot.x;
        this.transform.position.y = this.currentSpot.y;
    }

    update() {
        this.updateCurrentAndNextSpot();

        this.moveVehicle();

        //this.getComponent(SpriteRenderer.name).flipHorizontal = this.direction < 0;
    }

    updateCurrentAndNextSpot() {
        let minX = this.nextSpot.x - SPOT_RADIUS;
        let maxX = this.nextSpot.x + SPOT_RADIUS;
        let minY = this.nextSpot.y - SPOT_RADIUS;
        let maxY = this.nextSpot.y + SPOT_RADIUS;
        let position = this.transform.position;

        this.direction = this.nextSpot.x > position.x ? -1 : 1;

        if (position.x >= minX && position.x <= maxX && position.y >= minY && position.y <= maxY) {
            if (this.nextSpotIndex === 0) {
                this.scene.processLap(this);
            }
            this.currentSpot = this.circuitSpots[this.nextSpotIndex];
            this.nextSpotIndex = (this.nextSpotIndex === (this.circuitSpots.length - 1))
                ? 0
                : this.nextSpotIndex + 1
            this.nextSpot = this.circuitSpots[this.nextSpotIndex];
        }
    }

    moveVehicle() {
        if (this.stop === true) {
            this.speed -= 0.05;

            if (this.speed <= 0) {
                this.speed = 0;
                this.stop = false;
            }
        }

        let angle = Math.atan2(this.nextSpot.y - this.transform.position.y, this.nextSpot.x - this.transform.position.x);

        this.transform.position.x += Math.cos(angle) * this.speed;
        this.transform.position.y += Math.sin(angle) * this.speed;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    stopVehicle() {
        this.stop = true;
    }
}