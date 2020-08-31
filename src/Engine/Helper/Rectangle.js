import Vector2 from "./Vector2";

export default class Rectangle {
    position = null;
    width = 0;
    height = 0;

    constructor(x, y, width, height) {
        this.position = new Vector2(x, y);
        this.width = width;
        this.height = height;
    }

    get x() {
        return this.position.x;
    }

    set x(value) {
        this.position.x = value;
    }

    get y() {
        return this.position.y
    }

    set y(value) {
        this.position.y = value;
    }
}