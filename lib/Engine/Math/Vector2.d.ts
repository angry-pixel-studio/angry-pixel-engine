export declare class Vector2 {
    private _x;
    private _y;
    constructor(x?: number, y?: number);
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    get magnitude(): number;
    set(x: number, y: number): void;
    sameAs(vector: Vector2): boolean;
    add(vector: Vector2): Vector2;
    substract(vector: Vector2): Vector2;
    mult(number: number): Vector2;
    normal(): Vector2;
    unit(): Vector2;
    clone(): Vector2;
    static dot(vector1: Vector2, vector2: Vector2): number;
    static cross(vector1: Vector2, vector2: Vector2): number;
}
