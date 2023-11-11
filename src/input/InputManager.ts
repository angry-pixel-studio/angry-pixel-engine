import { MouseController } from "./MouseController";
import { KeyboardController } from "./KeyboardController";
import { GamepadController } from "./GamepadController";
import { TouchController } from "./TouchController";

/**
 * Manages the input sources: Keyboard, Mouse, Gamepad, Touch.
 * @public
 * @category Managers
 * @example
 * ```js
 * const mouseController = this.inputManager.mouse;
 * const keyboardController = this.inputManager.keyboard;
 * const gamepadController = this.inputManager.gamepad;
 * const touchController = this.inputManager.touch;
 * ```
 */
export interface IInputManager {
    /** Manages mouse information. */
    mouse: MouseController;
    /** Manages keyboard information. */
    keyboard: KeyboardController;
    /** Manages gamepads information. */
    gamepad: GamepadController;
    /** Manages toush information. */
    touch: TouchController;
    /** @private */
    update(): void;
}

/** @private */
export class InputManager implements IInputManager {
    public mouse: MouseController;
    public keyboard: KeyboardController;
    public gamepad: GamepadController;
    public touch: TouchController;

    constructor(
        mouse: MouseController,
        keyboard: KeyboardController,
        gamepad: GamepadController,
        touch: TouchController
    ) {
        this.mouse = mouse;
        this.keyboard = keyboard;
        this.gamepad = gamepad;
        this.touch = touch;
    }

    public update(): void {
        this.mouse.update();
        this.gamepad.update();
    }
}
