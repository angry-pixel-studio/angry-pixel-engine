import { Entity, Vector2 } from "angry-pixel";

export class MovingPlatform {
    public direction: Vector2 = new Vector2();
    public nextSpot: number = 0;
    public spotEntities: Entity[] = [];
    public spots: Vector2[] = [];
    public speed: number = 50;

    constructor(options?: Partial<MovingPlatform>) {
        Object.assign(this, options);
    }
}
