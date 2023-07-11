import { Vector2 } from "angry-pixel-math";

export class GamepadController {
    private readonly gamepads: Map<number, GamepadData> = new Map<number, GamepadData>();

    constructor() {
        // @ts-ignore
        window.addEventListener("gamepadconnected", this.eventHandler);
        // @ts-ignore
        window.addEventListener("gamepaddisconnected", this.eventHandler);
    }

    public getGamepad(index: number): GamepadData {
        return this.gamepads.get(index) ?? null;
    }

    private eventHandler = (e: GamepadEvent) => {
        if (e.type === "gamepadconnected") {
            this.gamepadConnected(e.gamepad);
        } else if (e.type === "gamepaddisconnected") {
            this.gamepadDisconected(e.gamepad);
        }
    };

    private gamepadConnected(gamepad: Gamepad): void {
        this.gamepads.set(gamepad.index, new GamepadData());
        this.gamepads.get(gamepad.index).updateFromGamepad(gamepad);
    }

    private gamepadDisconected(gamepad: Gamepad): void {
        this.gamepads.delete(gamepad.index);
    }

    public update(): void {
        for (const gamepad of this.getGamepads()) {
            if (gamepad === null) {
                continue;
            }

            if (this.gamepads.has(gamepad.index) === false) {
                this.gamepadConnected(gamepad);
            }

            this.gamepads.get(gamepad.index).updateFromGamepad(gamepad);
        }
    }

    private getGamepads(): Gamepad[] {
        return navigator.getGamepads
            ? navigator.getGamepads()
            : // @ts-ignore
            navigator.webkitGetGamepads
            ? // @ts-ignore
              navigator.webkitGetGamepads
            : [];
    }
}

interface GamepadWithVibratorActuator extends Gamepad {
    vibrationActuator?: {
        type: string;
        playEffect: (
            type: string,
            config: { duration: number; startDelay: number; weakMagnitude: number; strongMagnitude: number }
        ) => Promise<string>;
    };
}

export class GamepadData {
    private _gamepad: GamepadWithVibratorActuator;
    private readonly buttons: Map<number, boolean> = new Map<number, boolean>();
    private readonly axes: Map<number, number> = new Map<number, number>();

    private readonly _dpadAxes: Vector2 = new Vector2();
    private readonly _leftStickAxes: Vector2 = new Vector2();
    private readonly _rightStickAxes: Vector2 = new Vector2();

    private _vibrating: boolean = false;

    public updateFromGamepad(gamepad: GamepadWithVibratorActuator): void {
        this._gamepad = gamepad;
        gamepad.buttons.forEach((button: GamepadButton, index: number) => this.buttons.set(index, button.pressed));
        gamepad.axes.forEach((axis: number, index: number) => this.axes.set(index, axis));
    }

    public get id(): string {
        return this._gamepad.id;
    }

    public get connected(): boolean {
        return this._gamepad.connected;
    }

    public getButtonPressed(index: number): boolean {
        return this.buttons.get(index);
    }

    public getAxis(index: number): number {
        return this.axes.get(index);
    }

    public get dpadAxes(): Vector2 {
        this._dpadAxes.set(this.dpadRight ? 1 : this.dpadLeft ? -1 : 0, this.dpadUp ? 1 : this.dpadDown ? -1 : 0);
        return this._dpadAxes;
    }

    public get leftStickAxes(): Vector2 {
        this._leftStickAxes.set(this.leftStickHorizontal, this.leftStickVertical);
        return this._leftStickAxes;
    }

    public get rightStickAxes(): Vector2 {
        this._rightStickAxes.set(this.rightStickHorizontal, this.rightStickVertical);
        return this._rightStickAxes;
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

    public get anyButtonPressed(): boolean {
        return Array.from(this.buttons.values()).find((b) => b);
    }

    public get vibrating(): boolean {
        return this._vibrating;
    }

    public vibrate(
        duration: number = 200,
        weakMagnitude: number = 0.2,
        strongMagnitude: number = 0.2,
        startDelay: number = 0
    ): void {
        if (this._gamepad.vibrationActuator) {
            this._vibrating = true;
            this._gamepad.vibrationActuator
                .playEffect(this._gamepad.vibrationActuator.type, {
                    duration,
                    weakMagnitude,
                    strongMagnitude,
                    startDelay,
                })
                .catch(() => (this._vibrating = false))
                .finally(() => (this._vibrating = false));
        }
    }
}
