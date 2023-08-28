import { MouseController } from "./MouseController";
import { KeyboardController } from "./KeyboardController";
import { GamepadController } from "./GamepadController";
import { TouchController } from "./TouchController";

export interface IInputManager {
    mouse: MouseController;
    keyboard: KeyboardController;
    gamepad: GamepadController;
    touch: TouchController;
    update(): void;
}

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
