export declare class Vector2 {
    private _x;
    private _y;
    constructor(x: number, y: number);
    get x(): number;
    get y(): number;
    get magnitude(): number;
    set(x: number, y: number): void;
    add(v: Vector2): Vector2;
    substract(v: Vector2): Vector2;
    mult(n: number): Vector2;
    normal(): Vector2;
    unit(): Vector2;
    static dot(v1: Vector2, v2: Vector2): number;
    static cross(v1: Vector2, v2: Vector2): number;
}
