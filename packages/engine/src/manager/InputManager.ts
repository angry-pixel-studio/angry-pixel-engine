import { SYMBOLS } from "@config/dependencySymbols";
import { GamepadController, Keyboard, Mouse, TouchScreen } from "@input";
import { injectable } from "@angry-pixel/ioc";

/**
 * Manages input sources including keyboard, mouse, gamepad and touch screen interactions.\
 * Provides methods to check key states, mouse position/buttons, gamepad inputs and touch events.
 * @example
 * ```typescript
 * // Keyboard input
 * if (inputManager.keyboard.isPressed("Space")) {
 *   // Jump action
 * }
 *
 * // Multiple key checks
 * if (inputManager.keyboard.orPressed(["Enter", "Space"])) {
 *   // Action for either key pressed
 * }
 *
 * if (inputManager.keyboard.andPressed(["ControlLeft", "KeyC"])) {
 *   // Action for both keys pressed together
 * }
 *
 * // Mouse input
 * const mousePos = inputManager.mouse.positionInViewport;
 * if (inputManager.mouse.leftButtonPressed) {
 *   // Shoot action
 * }
 *
 * // Mouse wheel scrolling
 * const scrollAmount = inputManager.mouse.wheelScroll;
 *
 * // Gamepad input
 * const gamepad = inputManager.gamepads[0];
 * if (gamepad?.bottomFace) {
 *   // Bottom face button pressed (A on Xbox, B on Nintendo, X on PlayStation)
 * }
 *
 * // Gamepad stick movement
 * const leftStickPos = gamepad?.leftStickAxes;
 * const rightStickPos = gamepad?.rightStickAxes;
 *
 * // Gamepad vibration
 * gamepad?.vibrate(200, 0.5, 0.5);
 *
 * // Touch input
 * if (inputManager.touchScreen.touching) {
 *   const touch = inputManager.touchScreen.interactions[0];
 *   // Handle touch at touch.positionInViewport
 * }
 * ```
 * @public
 * @category Managers
 */
@injectable(SYMBOLS.InputManager)
export class InputManager {
    /** Manages mouse information. */
    public readonly keyboard: Keyboard;
    /** Manages keyboard information. */
    public readonly mouse: Mouse;
    /** Manages touch screen information. */
    public readonly touchScreen: TouchScreen;
    /** Manages gamepads information. */
    public readonly gamepads: GamepadController[];

    constructor() {
        this.keyboard = new Keyboard();
        this.mouse = new Mouse();
        this.touchScreen = new TouchScreen();
        this.gamepads = [];
    }
}
