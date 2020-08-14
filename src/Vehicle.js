import GameObject from "./Engine/GameObject";
import { SPRITE_RENDERER } from './Engine/Component';
import SpriteRenderer from './Engine/Components/SpriteRenderer';

export default class Vehicle extends GameObject {
    circuit;
    circuitSpots = [];
    currentSpot;
    nextSpot;
    nextSpotIndex = 0;

    sprite = new Image();
    speed = 0;

    constructor(spritePath, circuit, speed) {
        super();

        this.sprite.src = spritePath;
        this.circuit = circuit;
        this.circuitSpots = circuit.spots;
        this.speed = speed;

        this.currentSpot = this.circuitSpots[this.nextSpotIndex];
        this.nextSpot = this.currentSpot;

        this.transform.position.x = this.currentSpot.x;
        this.transform.position.y = this.currentSpot.y;

        this.components[SPRITE_RENDERER] = new SpriteRenderer(this, {sprite: this.sprite});
    }

    gameLoop = () => {
        this.updateCurrentAndNextSpot();

        this.moveVehicle();
    }

    updateCurrentAndNextSpot() {
        let minX = this.nextSpot.x - 2;
        let maxX = this.nextSpot.x + 2;
        let minY = this.nextSpot.y - 2;
        let maxY = this.nextSpot.y + 2;
        let position = this.transform.position;

        if (position.x >= minX && position.x <= maxX && position.y >= minY && position.y <= maxY) {
            this.currentSpot = this.circuitSpots[this.nextSpotIndex];
            this.nextSpotIndex = (this.nextSpotIndex === (this.circuitSpots.length - 1))
                ? 0
                : this.nextSpotIndex + 1
            this.nextSpot = this.circuitSpots[this.nextSpotIndex];
        }
    }

    moveVehicle() {
        let angle = Math.atan2(this.nextSpot.y - this.transform.position.y, this.nextSpot.x - this.transform.position.x);

        this.transform.position.x += Math.cos(angle) * this.speed;
        this.transform.position.y += Math.sin(angle) * this.speed;
    }
}