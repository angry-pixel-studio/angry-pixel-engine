import { Vector2 } from "angry-pixel-math";

/**
 * Manages the connected gamepads
 * @public
 * @category Input
 * @example
 * ```js
 * // get all connected gamepads
 * const gamepads = this.inputManager.gamepad.getGamepads();
 *
 * // get the first connected gamepad
 * const gamepad = this.inputManager.gamepad.getGamepad(0);
 * ```
 */
export class GamepadController {
    private readonly gamepads: Map<number, GamepadData> = new Map<number, GamepadData>();

    /** @internal */
    constructor() {
        // @ts-ignore
        window.addEventListener("gamepadconnected", this.eventHandler);
        // @ts-ignore
        window.addEventListener("gamepaddisconnected", this.eventHandler);
    }

    /**
     * Returns a gamepad by its numerical index, or null if it does not exist.
     * @param index The gamepad index to find
     * @returns The found gamepad or NULL
     */
    public getGamepad(index: number): GamepadData | null {
        return this.gamepads.get(index) ?? null;
    }

    /**
     * Retruns all connected gamepads.
     * @returns An array of gamepads
     */
    public getGamepads(): GamepadData[] {
        return Array.from(this.gamepads.values());
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

    /** @internal */
    public update(): void {
        for (const gamepad of this.getGamepadsFromBrowser()) {
            if (gamepad === null) {
                continue;
            }

            if (this.gamepads.has(gamepad.index) === false) {
                this.gamepadConnected(gamepad);
            } else {
                this.gamepads.get(gamepad.index).updateFromGamepad(gamepad);
            }
        }
    }

    private getGamepadsFromBrowser(): Gamepad[] {
        return navigator.getGamepads
            ? navigator.getGamepads()
            : // @ts-ignore
            navigator.webkitGetGamepads
            ? // @ts-ignore
              navigator.webkitGetGamepads
            : [];
    }
}

/**
 * Represents a connected gamepad and has the information of all its buttons and axes.
 * @public
 * @category Input
 * @example
 * ```js
 * const gamepad = this.inputManager.gamepad.getGamepad(0);
 *
 * if (gamepad.dpadAxes.x > 1) {
 *   // if the depad x-axis is pressed to the right, do some action
 * }
 *
 * if (gamepad.rightFace) {
 *   // if the right face button is pressed, do some action
 * }
 * ```
 */
export class GamepadData {
    private _gamepad: Gamepad;
    private readonly buttons: Map<number, boolean> = new Map<number, boolean>();
    private readonly axes: Map<number, number> = new Map<number, number>();

    private readonly _dpadAxes: Vector2 = new Vector2();
    private readonly _leftStickAxes: Vector2 = new Vector2();
    private readonly _rightStickAxes: Vector2 = new Vector2();

    private _vibrating: boolean = false;

    /** @internal */
    public updateFromGamepad(gamepad: Gamepad): void {
        this._gamepad = gamepad;
        gamepad.buttons.forEach((button: GamepadButton, index: number) => this.buttons.set(index, button.pressed));
        gamepad.axes.forEach((axis: number, index: number) => this.axes.set(index, axis));
    }

    /**
     * The gamepad id
     * @readonly
     */
    public get id(): string {
        return this._gamepad.id;
    }

    /**
     * TRUE if the gamepad is connected
     * @readonly
     */
    public get connected(): boolean {
        return this._gamepad.connected;
    }

    /**
     * Checks if a button is being pressed.
     * @param index the button index
     * @returns TRUE if the button is pressed, FALSE instead
     * @see [Gamepad: buttons property](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad/buttons)
     */
    public getButtonPressed(index: number): boolean {
        return this.buttons.get(index);
    }

    /**
     * Returns the value of an axis by its index
     * @param index The axis index:
     * - 0: Left stick horizontal axix
     * - 1: Left stick vertical axix
     * - 2: Right stick horizontal axix
     * - 3: Right stick vertical axix
     * @returns The axis value
     * @see [Gamepad: axes property](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad/axes)
     */
    public getAxis(index: number): number {
        return this.axes.get(index);
    }

    /**
     * The values of the d-pad axes represented as a xy vector
     * @readonly
     */
    public get dpadAxes(): Vector2 {
        this._dpadAxes.set(this.dpadRight ? 1 : this.dpadLeft ? -1 : 0, this.dpadUp ? 1 : this.dpadDown ? -1 : 0);
        return this._dpadAxes;
    }

    /**
     * The values of the left stick axes represented as a xy vector
     * @readonly
     */
    public get leftStickAxes(): Vector2 {
        this._leftStickAxes.set(this.leftStickHorizontal, this.leftStickVertical);
        return this._leftStickAxes;
    }

    /**
     * The values of the right stick axes represented as a xy vector
     * @readonly
     */
    public get rightStickAxes(): Vector2 {
        this._rightStickAxes.set(this.rightStickHorizontal, this.rightStickVertical);
        return this._rightStickAxes;
    }

    /**
     * TRUE if d-pad up is pressed
     * @readonly
     */
    public get dpadUp(): boolean {
        return this.buttons.get(12) ?? false;
    }

    /**
     * TRUE if d-pad down is pressed
     * @readonly
     */
    public get dpadDown(): boolean {
        return this.buttons.get(13) ?? false;
    }

    /**
     * TRUE if d-pad left is pressed
     * @readonly
     */
    public get dpadLeft(): boolean {
        return this.buttons.get(14) ?? false;
    }

    /**
     * TRUE if d-pad right is pressed
     * @readonly
     */
    public get dpadRight(): boolean {
        return this.buttons.get(15) ?? false;
    }

    /**
     * TRUE if bottom face button is pressed (Dual Shock: X. Xbox: A. Nintendo: B)
     * @readonly
     */
    public get bottomFace(): boolean {
        return this.buttons.get(0) ?? false;
    }

    /**
     * TRUE if right face button is pressed (Dual Shock: Square. Xbox: X. Nintendo: Y)
     * @readonly
     */
    public get rightFace(): boolean {
        return this.buttons.get(1) ?? false;
    }

    /**
     * TRUE if left face button is pressed (Dual Shock: Circle. Xbox: B. Nintendo: A)
     * @readonly
     */
    public get leftFace(): boolean {
        return this.buttons.get(2) ?? false;
    }

    /**
     * TRUE if top face button is pressed (Dual Shock: Triangle. Xbox: Y. Nintendo: X)
     * @readonly
     */
    public get topFace(): boolean {
        return this.buttons.get(3) ?? false;
    }

    /**
     * TRUE if left shoulder button is pressed (Dual Shock: L1. Xbox: LB. Nintendo: L)
     * @readonly
     */
    public get leftShoulder(): boolean {
        return this.buttons.get(4) ?? false;
    }

    /**
     * TRUE if right shoulder button is pressed (Dual Shock: R1. Xbox: RB. Nintendo: R)
     * @readonly
     */
    public get rightShoulder(): boolean {
        return this.buttons.get(5) ?? false;
    }

    /**
     * TRUE if left trigger button is pressed (Dual Shock: L2. Xbox: LT. Nintendo: ZL)
     * @readonly
     */
    public get leftTrigger(): boolean {
        return this.buttons.get(6) ?? false;
    }

    /**
     * TRUE if right trigger button is pressed (Dual Shock: R2. Xbox: RT. Nintendo: ZR)
     * @readonly
     */
    public get rightTrigger(): boolean {
        return this.buttons.get(7) ?? false;
    }

    /**
     * TRUE if back button is pressed (a.k.a. select button)
     * @readonly
     */
    public get back(): boolean {
        return this.buttons.get(8) ?? false;
    }

    /**
     * TRUE if start button is pressed (a.k.a. options button)
     * @readonly
     */
    public get start(): boolean {
        return this.buttons.get(9) ?? false;
    }

    /**
     * TRUE if left stick button is pressed
     * @readonly
     */
    public get leftStickButton(): boolean {
        return this.buttons.get(10) ?? false;
    }

    /**
     * TRUE if right stick button is pressed
     * @readonly
     */
    public get rightStickButton(): boolean {
        return this.buttons.get(11) ?? false;
    }

    /**
     * Left stick horizontal axes value
     * @readonly
     */
    public get leftStickHorizontal(): number {
        return this.axes.get(0) ?? 0;
    }

    /**
     * Left stick vertical axes value
     * @readonly
     */
    public get leftStickVertical(): number {
        return -this.axes.get(1) ?? 0;
    }

    /**
     * Right stick horizontal axes value
     * @readonly
     */
    public get rightStickHorizontal(): number {
        return this.axes.get(2) ?? 0;
    }

    /**
     * Right stick vertical axes value
     * @readonly
     */
    public get rightStickVertical(): number {
        return -this.axes.get(3) ?? 0;
    }

    /**
     * TRUE if any button is pressed
     * @readonly
     */
    public get anyButtonPressed(): boolean {
        return Array.from(this.buttons.values()).find((b) => b) ?? false;
    }

    /**
     * TRUE if the vibration is on
     * @readonly
     */
    public get vibrating(): boolean {
        return this._vibrating;
    }

    /**
     * Turns on the gamepad vibration
     * @param duration The duration of the effect in milliseconds
     * @param weakMagnitude Rumble intensity of the high-frequency (weak) rumble motors, normalized to the range between 0.0 and 1.0
     * @param strongMagnitude Rumble intensity of the low-frequency (strong) rumble motors, normalized to the range between 0.0 and 1.0
     * @param startDelay The delay in milliseconds before the effect is started
     */
    public vibrate(
        duration: number = 200,
        weakMagnitude: number = 0.2,
        strongMagnitude: number = 0.2,
        startDelay: number = 0
    ): void {
        if (this._gamepad.vibrationActuator) {
            this._vibrating = true;
            this._gamepad.vibrationActuator
                // @ts-ignore
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
