import { GamepadController } from "../Core/Input/GamepadController";
import { InputManager } from "../Core/Input/InputManager";
import { KeyboardController } from "../Core/Input/KeyboardController";
import { MouseController } from "../Core/Input/MouseController";
import { TouchController } from "../Core/Input/TouchController";
import { container } from "../Game";

export class InputManagerFacade {
    private static inputManager: InputManager = null;

    public static initialize(): void {
        this.inputManager = container.getSingleton<InputManager>("InputManager");
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
