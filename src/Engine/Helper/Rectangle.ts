import Vector2 from "./Vector2";

export default class Rectangle {
    private position: Vector2 = new Vector2(0, 0);
    public width: number = 0;
    public height: number = 0;

    constructor(x: number, y: number, width: number, height: number) {
        this.set(x, y, width, height);
    }

    public get x(): number {
        return this.position.x;
    }

    public get y(): number {
        return this.position.y;
    }

    public set x(value: number) {
        this.position.x = value;
    }

    public set y(value: number) {
        this.position.y = value;
    }

    public get x1(): number {
        return this.position.x + this.width;
    }

    public get y1(): number {
        return this.position.y - this.height;
    }

    public set(x: number, y: number, width: number, height: number): void {
        this.setPosition(x, y);
        this.width = width;
        this.height = height;
    }

    public setPosition(x: number, y: number): void {
        this.position.set(x, y);
    }

    public overlappingRectangle(rect: Rectangle): boolean {
        return this.x1 >= rect.x
            && this.x <= rect.x1
            && this.y1 <= rect.y
            && this.y >= rect.y1;
    }
}
