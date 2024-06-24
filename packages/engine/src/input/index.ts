import { IInputManager, InputManager } from "./InputManager";

export { IInputManager };
export * from "./input/Keyboard";
export * from "./input/Mouse";
export * from "./input/TouchScreen";
export * from "./input/GamepadController";

export const inputManagerFactory = (canvas: HTMLCanvasElement): IInputManager => new InputManager(canvas);
