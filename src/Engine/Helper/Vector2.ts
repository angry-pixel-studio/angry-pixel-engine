export default class Vector2 {
    public x: number = 0;
    public y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}