export declare class GamepadController {
    private readonly gamepads;
    constructor();
    getGamepad(index: number): GamepadData | null;
    private eventHandler;
    private gamepadConnected;
    private gamepadDisconected;
    private update;
}
declare class GamepadData {
    private _connected;
    private _id;
    private readonly buttons;
    private readonly axes;
    updateFromGamepad(gamepad: Gamepad): void;
    getButtonPressed(index: number): boolean;
    getAxis(index: number): number;
    get connected(): boolean;
    get id(): string;
    get dpadUp(): boolean;
    get dpadDown(): boolean;
    get dpadLeft(): boolean;
    get dpadRight(): boolean;
    get bottomFace(): boolean;
    get rightFace(): boolean;
    get leftFace(): boolean;
    get topFace(): boolean;
    get leftShoulder(): boolean;
    get rightShoulder(): boolean;
    get leftTrigger(): boolean;
    get rightTrigger(): boolean;
    get start(): boolean;
    get back(): boolean;
    get leftStickButton(): boolean;
    get rightStickButton(): boolean;
    get leftStickHorizontal(): number;
    get leftStickVertical(): number;
    get rightStickHorizontal(): number;
    get rightStickVertical(): number;
}
export {};
