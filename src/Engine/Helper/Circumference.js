import Vector2 from "./Vector2";

export default class Circumference {
    position = null;
    radius = 0;

    constructor(x, y, radius) {
        this.position = new Vector2(x, y);
        this.radius = radius;
    }
}