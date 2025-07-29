import { GamepadController } from "./GamepadController";
import { IInputManager, InputManager } from "./InputManager";
import { KeyboardController } from "./KeyboardController";
import { MouseController } from "./MouseController";
import { TouchController } from "./TouchController";

export { IInputManager } from "./InputManager";
export * from "./GamepadController";
export * from "./KeyboardController";
export * from "./MouseController";
export * from "./TouchController";

export const inputManagerFactory = (canvas: HTMLCanvasElement): IInputManager =>
    new InputManager(
        new MouseController(canvas),
        new KeyboardController(canvas),
        new GamepadController(),
        new TouchController(canvas),
    );
