import Vector2 from "./Vector2";

export default class Circumference {
    public position: Vector2 = new Vector2(0, 0);
    public radius: number = 0;

    constructor(x: number, y: number, radius: number) {
        this.position = new Vector2(x, y);
        this.radius = radius;
    }
}