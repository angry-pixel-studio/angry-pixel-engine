import { Vector2 } from "angry-pixel-ecs";

export class MovingPlatform {
    public direction: Vector2 = new Vector2();
    public nextPositionIndex: number = 0;
    public positions: Vector2[] = [];
    public speed: number = 50;

    constructor(options?: Partial<MovingPlatform>) {
        Object.assign(this, options);
    }
}
