import { GamepadController } from "../../input/GamepadController";
import { InputManager } from "../../input/InputManager";
import { KeyboardController } from "../../input/KeyboardController";
import { MouseController } from "../../input/MouseController";
import { TouchController } from "../../input/TouchController";

export class InputManagerFacade {
    private static inputManager: InputManager = null;

    public static initialize(inputManager: InputManager): void {
        this.inputManager = inputManager;
    }

    public static get mouse(): MouseController {
        return this.inputManager.mouse;
    }

    public static get keyboard(): KeyboardController {
        return this.inputManager.keyboard;
    }

    public static get gamepad(): GamepadController {
        return this.inputManager.gamepad;
    }

    public static get touch(): TouchController {
        return this.inputManager.touch;
    }
}
