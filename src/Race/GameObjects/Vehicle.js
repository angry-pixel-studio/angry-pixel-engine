import GameObject from "../../Engine/GameObject";
import SpriteRenderer from '../../Engine/Components/SpriteRenderer';
import Circuit from "./Circuit";

export const TAG_PLAYER = 'player';

const PLAYER_SPRITE = 'image/vehicle1.png';
const RIVAL_SPRITE = 'image/vehicle2.png';

export default class Vehicle extends GameObject {
    sprite = new Image();
    speed = 0;
    stop = false;

    // Circuit spots
    circuitSpots = null;
    currentSpot = null;
    nextSpot = null;
    nextSpotIndex = 0;

    username = null;

    constructor(username, isPlayer) {
        super();

        this.tag = isPlayer !== undefined && isPlayer === true ? TAG_PLAYER : null;

        const sprite = new Image();
        sprite.src = isPlayer ? PLAYER_SPRITE : RIVAL_SPRITE;
        
        this.username = username,

        this.addComponent(() => new SpriteRenderer(this, {sprite: sprite, offsetY: isPlayer ? -5 : 0}));
    }

    gameLoop = () => {
        if (this.circuitSpots === null) {
            this.circuitSpots = this.scene.getGameObject(Circuit.name).spots;
            this.currentSpot = this.circuitSpots[this.nextSpotIndex];
            this.nextSpot = this.circuitSpots[this.nextSpotIndex];

            this.transform.position.x = this.currentSpot.x;
            this.transform.position.y = this.currentSpot.y;
        }

        this.updateCurrentAndNextSpot();

        this.moveVehicle();
    }

    updateCurrentAndNextSpot = () => {
        let minX = this.nextSpot.x - 2;
        let maxX = this.nextSpot.x + 2;
        let minY = this.nextSpot.y - 2;
        let maxY = this.nextSpot.y + 2;
        let position = this.transform.position;

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

    moveVehicle = () => {
        if (this.stop === true) {
            this.speed -= 0.05;
            
            if (this.speed <= 0) {
                this.speed = 0;
                this.stop =  false;
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