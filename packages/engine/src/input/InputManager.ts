import { GamepadController } from "./input/GamepadController";
import { Keyboard } from "./input/Keyboard";
import { Mouse } from "./input/Mouse";
import { TouchScreen } from "./input/TouchScreen";
import { GamepadSystem } from "./system/GamepadSystem";
import { KeyboardSystem } from "./system/KeyboardSystem";
import { MouseSystem } from "./system/MouseSystem";
import { TouchScreenSystem } from "./system/TouchScreenSystem";

export interface IInputManager {
    keyboard: Keyboard;
    mouse: Mouse;
    touchScreen: TouchScreen;
    gamepads: GamepadController[];
    update(): void;
}

export class InputManager implements IInputManager {
    public readonly keyboard: Keyboard;
    public readonly mouse: Mouse;
    public readonly touchScreen: TouchScreen;
    public readonly gamepads: GamepadController[] = [];

    private readonly keyboardSystem: KeyboardSystem;
    private readonly mouseSystem: MouseSystem;
    private readonly touchScreenSystem: TouchScreenSystem;
    private readonly gamepadSystem: GamepadSystem;

    constructor(canvas: HTMLCanvasElement) {
        this.keyboard = new Keyboard();
        this.mouse = new Mouse();
        this.touchScreen = new TouchScreen();

        this.keyboardSystem = new KeyboardSystem(canvas, this.keyboard);
        this.mouseSystem = new MouseSystem(canvas, this.mouse);
        this.touchScreenSystem = new TouchScreenSystem(canvas, this.touchScreen);
        this.gamepadSystem = new GamepadSystem(this.gamepads);
    }

    public update(): void {
        this.keyboardSystem.onUpdate();
        this.mouseSystem.onUpdate();
        this.touchScreenSystem.onUpdate();
        this.gamepadSystem.update();
    }
}
