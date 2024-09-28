import { TYPES } from "@config/types";
import { GamepadController, Keyboard, Mouse, TouchScreen } from "@input";
import { injectable } from "@ioc";

@injectable(TYPES.InputManager)
export class InputManager {
    public readonly keyboard: Keyboard;
    public readonly mouse: Mouse;
    public readonly touchScreen: TouchScreen;
    public readonly gamepads: GamepadController[];

    constructor() {
        this.keyboard = new Keyboard();
        this.mouse = new Mouse();
        this.touchScreen = new TouchScreen();
        this.gamepads = [];
    }
}
