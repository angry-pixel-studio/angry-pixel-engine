import { GamepadController } from "../Core/Input/GamepadController";
import { KeyboardController } from "../Core/Input/KeyboardController";
import { MouseController } from "../Core/Input/MouseController";
export declare class InputManagerFacade {
    private static inputManager;
    static initialize(): void;
    static get mouse(): MouseController;
    static get keyboard(): KeyboardController;
    static get gamepad(): GamepadController;
}
