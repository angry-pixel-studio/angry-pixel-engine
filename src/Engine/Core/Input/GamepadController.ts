import { EVENT_UPDATE } from "../../Game";

export class GamepadController {
    private readonly gamepads: GamepadData[] = [];

    constructor() {
        // @ts-ignore
        window.addEventListener("gamepadconnected", this.eventHandler);
        // @ts-ignore
        window.addEventListener("gamepaddisconnected", this.eventHandler);

        window.addEventListener(EVENT_UPDATE, () => this.update());

        for (let i: number = 0; i < navigator.getGamepads().length; i++) {
            this.gamepads[i] = new GamepadData();
        }
    }

    public getGamepad(index: number): GamepadData | null {
        return this.gamepads[index] ?? null;
    }

    private eventHandler = (e: GamepadEvent) => {
        if (e.type === "gamepadconnected") {
            this.gamepadConnected(e.gamepad);
        } else if (e.type === "gamepaddisconnected") {
            this.gamepadDisconected(e.gamepad);
        }
    };

    private gamepadConnected(gamepad: Gamepad): void {
        this.gamepads[gamepad.index].updateFromGamepad(gamepad);
    }

    private gamepadDisconected(gamepad: Gamepad): void {
        this.gamepads[gamepad.index].updateFromGamepad(gamepad);
    }

    private update(): void {
        for (const gamepad of navigator.getGamepads()) {
            if (gamepad === null) {
                continue;
            }

            this.gamepads[gamepad.index].updateFromGamepad(gamepad);
        }
    }
}

export class GamepadData {
    private _connected: boolean = false;
    private _id: string = null;
    private readonly buttons: Map<number, boolean> = new Map<number, boolean>();
    private readonly axes: Map<number, number> = new Map<number, number>();

    public updateFromGamepad(gamepad: Gamepad): void {
        this._id = gamepad.id;
        this._connected = gamepad.connected;
        gamepad.buttons.forEach((button: GamepadButton, index: number) => this.buttons.set(index, button.pressed));
        gamepad.axes.forEach((axis: number, index: number) => this.axes.set(index, axis));
    }

    public getButtonPressed(index: number): boolean {
        return this.buttons.get(index);
    }

    public getAxis(index: number): number {
        return this.axes.get(index);
    }

    public get connected(): boolean {
        return this._connected;
    }

    public get id(): string {
        return this._id;
    }

    public get dpadUp(): boolean {
        return this.buttons.get(12) ?? false;
    }

    public get dpadDown(): boolean {
        return this.buttons.get(13) ?? false;
    }

    public get dpadLeft(): boolean {
        return this.buttons.get(14) ?? false;
    }

    public get dpadRight(): boolean {
        return this.buttons.get(15) ?? false;
    }

    public get bottomFace(): boolean {
        return this.buttons.get(0) ?? false;
    }

    public get rightFace(): boolean {
        return this.buttons.get(1) ?? false;
    }

    public get leftFace(): boolean {
        return this.buttons.get(2) ?? false;
    }

    public get topFace(): boolean {
        return this.buttons.get(3) ?? false;
    }

    public get leftShoulder(): boolean {
        return this.buttons.get(4) ?? false;
    }

    public get rightShoulder(): boolean {
        return this.buttons.get(5) ?? false;
    }

    public get leftTrigger(): boolean {
        return this.buttons.get(6) ?? false;
    }

    public get rightTrigger(): boolean {
        return this.buttons.get(7) ?? false;
    }

    public get back(): boolean {
        return this.buttons.get(8) ?? false;
    }

    public get start(): boolean {
        return this.buttons.get(9) ?? false;
    }

    public get leftStickButton(): boolean {
        return this.buttons.get(10) ?? false;
    }

    public get rightStickButton(): boolean {
        return this.buttons.get(11) ?? false;
    }

    public get leftStickHorizontal(): number {
        return this.axes.get(0) ?? 0;
    }

    public get leftStickVertical(): number {
        return -this.axes.get(1) ?? 0;
    }

    public get rightStickHorizontal(): number {
        return this.axes.get(2) ?? 0;
    }

    public get rightStickVertical(): number {
        return -this.axes.get(3) ?? 0;
    }
}
