export declare class Rectangle {
    private position;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get x1(): number;
    get y1(): number;
    set(x: number, y: number, width: number, height: number): void;
    setPosition(x: number, y: number): void;
    updateFromRect(rect: Rectangle): void;
    overlappingRectangle(rect: Rectangle): boolean;
}
