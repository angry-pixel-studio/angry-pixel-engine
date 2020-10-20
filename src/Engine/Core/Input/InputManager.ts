import MouseController from "./MouseController";
import KeyboardController from "./KeyboardController";
import GamepadController from "./GamepadController";

export default class InputManager {
    public mouse: MouseController;
    public keyboard: KeyboardController;
    public gamepad: GamepadController;

    constructor(mouse: MouseController, keyboard: KeyboardController, gamepad: GamepadController) {
        this.mouse = mouse;
        this.keyboard = keyboard;
        this.gamepad = gamepad;
    }
}
