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

    get x1() {
        return this.position.x + this.width;
    }

    get y1() {
        return this.position.y - this.height;
    }

    overlappingRectangle(rect) {
        return this.x1 >= rect.x
            && this.x <= rect.x1
            && this.y1 <= rect.y
            && this.y >= rect.y1;
    }
}