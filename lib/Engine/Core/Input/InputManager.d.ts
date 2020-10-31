import { MouseController } from "./MouseController";
import { KeyboardController } from "./KeyboardController";
import { GamepadController } from "./GamepadController";
export declare class InputManager {
    mouse: MouseController;
    keyboard: KeyboardController;
    gamepad: GamepadController;
    constructor(mouse: MouseController, keyboard: KeyboardController, gamepad: GamepadController);
}
