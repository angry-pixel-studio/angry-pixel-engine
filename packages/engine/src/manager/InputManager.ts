import { TYPES } from "@config/types";
import { GamepadController, Keyboard, Mouse, TouchScreen } from "@input";
import { injectable } from "@ioc";

/**
 * Manages the input sources: Keyboard, Mouse, Gamepad, TouchScreen.
 * @public
 * @category Managers
 */
@injectable(TYPES.InputManager)
export class InputManager {
    /** Manages mouse information. */
    public readonly keyboard: Keyboard;
    /** Manages keyboard information. */
    public readonly mouse: Mouse;
    /** Manages touch screen information. */
    public readonly touchScreen: TouchScreen;
    /** Manages gamepads information. */
    public readonly gamepads: GamepadController[];

    constructor() {
        this.keyboard = new Keyboard();
        this.mouse = new Mouse();
        this.touchScreen = new TouchScreen();
        this.gamepads = [];
    }
}
