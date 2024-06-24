import { Vector2 } from "../../math";

/**
 * It represents a connected gamepad and has the information of all its buttons and axes..
 * @public
 * @category Input
 * @example
 * ```js
 * const gamepad = this.inputManager.gamepads[0];
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
export class GamepadController {
    /** @internal */
    public readonly buttons: Map<number, boolean> = new Map<number, boolean>();
    /** @internal */
    public readonly axes: Map<number, number> = new Map<number, number>();

    private readonly _dpadAxes: Vector2 = new Vector2();
    private readonly _leftStickAxes: Vector2 = new Vector2();
    private readonly _rightStickAxes: Vector2 = new Vector2();

    /**
     * The gamepad id
     */
    public id: string;

    /**
     * The gamepad index
     */
    public index: number;

    /**
     * TRUE if the gamepad is connected
     */
    public connected: boolean;

    /**
     * The values of the d-pad axes represented as a xy vector
     */
    public get dpadAxes(): Vector2 {
        this._dpadAxes.set(this.dpadRight ? 1 : this.dpadLeft ? -1 : 0, this.dpadUp ? 1 : this.dpadDown ? -1 : 0);
        return this._dpadAxes;
    }

    /**
     * The values of the left stick axes represented as a xy vector
     */
    public get leftStickAxes(): Vector2 {
        this._leftStickAxes.set(this.leftStickHorizontal, this.leftStickVertical);
        return this._leftStickAxes;
    }

    /**
     * The values of the right stick axes represented as a xy vector
     */
    public get rightStickAxes(): Vector2 {
        this._rightStickAxes.set(this.rightStickHorizontal, this.rightStickVertical);
        return this._rightStickAxes;
    }

    /**
     * TRUE if d-pad up is pressed
     */
    public get dpadUp(): boolean {
        return this.buttons.get(12) ?? false;
    }

    /**
     * TRUE if d-pad down is pressed
     */
    public get dpadDown(): boolean {
        return this.buttons.get(13) ?? false;
    }

    /**
     * TRUE if d-pad left is pressed
     */
    public get dpadLeft(): boolean {
        return this.buttons.get(14) ?? false;
    }

    /**
     * TRUE if d-pad right is pressed
     */
    public get dpadRight(): boolean {
        return this.buttons.get(15) ?? false;
    }

    /**
     * TRUE if bottom face button is pressed (Dual Shock: X. Xbox: A. Nintendo: B)
     */
    public get bottomFace(): boolean {
        return this.buttons.get(0) ?? false;
    }

    /**
     * TRUE if right face button is pressed (Dual Shock: Square. Xbox: X. Nintendo: Y)
     */
    public get rightFace(): boolean {
        return this.buttons.get(1) ?? false;
    }

    /**
     * TRUE if left face button is pressed (Dual Shock: Circle. Xbox: B. Nintendo: A)
     */
    public get leftFace(): boolean {
        return this.buttons.get(2) ?? false;
    }

    /**
     * TRUE if top face button is pressed (Dual Shock: Triangle. Xbox: Y. Nintendo: X)
     */
    public get topFace(): boolean {
        return this.buttons.get(3) ?? false;
    }

    /**
     * TRUE if left shoulder button is pressed (Dual Shock: L1. Xbox: LB. Nintendo: L)
     */
    public get leftShoulder(): boolean {
        return this.buttons.get(4) ?? false;
    }

    /**
     * TRUE if right shoulder button is pressed (Dual Shock: R1. Xbox: RB. Nintendo: R)
     */
    public get rightShoulder(): boolean {
        return this.buttons.get(5) ?? false;
    }

    /**
     * TRUE if left trigger button is pressed (Dual Shock: L2. Xbox: LT. Nintendo: ZL)
     */
    public get leftTrigger(): boolean {
        return this.buttons.get(6) ?? false;
    }

    /**
     * TRUE if right trigger button is pressed (Dual Shock: R2. Xbox: RT. Nintendo: ZR)
     */
    public get rightTrigger(): boolean {
        return this.buttons.get(7) ?? false;
    }

    /**
     * TRUE if back button is pressed (a.k.a. select button)
     */
    public get back(): boolean {
        return this.buttons.get(8) ?? false;
    }

    /**
     * TRUE if start button is pressed (a.k.a. options button)
     */
    public get start(): boolean {
        return this.buttons.get(9) ?? false;
    }

    /**
     * TRUE if left stick button is pressed
     */
    public get leftStickButton(): boolean {
        return this.buttons.get(10) ?? false;
    }

    /**
     * TRUE if right stick button is pressed
     */
    public get rightStickButton(): boolean {
        return this.buttons.get(11) ?? false;
    }

    /**
     * Left stick horizontal axes value
     */
    public get leftStickHorizontal(): number {
        return this.axes.get(0) ?? 0;
    }

    /**
     * Left stick vertical axes value
     */
    public get leftStickVertical(): number {
        return -(this.axes.get(1) ?? 0);
    }

    /**
     * Right stick horizontal axes value
     */
    public get rightStickHorizontal(): number {
        return this.axes.get(2) ?? 0;
    }

    /**
     * Right stick vertical axes value
     */
    public get rightStickVertical(): number {
        return -(this.axes.get(3) ?? 0);
    }

    /**
     * TRUE if any button is pressed
     */
    public get anyButtonPressed(): boolean {
        return Array.from(this.buttons.values()).find((b) => b) ?? false;
    }

    /**
     * TRUE if the vibration is on
     */
    public vibrating: boolean;

    /**
     * @internal
     */
    public vibrationInput: VibrationInput;

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
        startDelay: number = 0,
    ): void {
        this.vibrationInput = {
            duration,
            weakMagnitude,
            startDelay,
            strongMagnitude,
        };
    }
}

export type VibrationInput = {
    duration: number;
    weakMagnitude: number;
    strongMagnitude: number;
    startDelay: number;
};
