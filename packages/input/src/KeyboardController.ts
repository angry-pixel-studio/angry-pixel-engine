/**
 * Manages keyboard interaction. It uses the **code** property of the **js keyboard event**.
 * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
 * @public
 * @category Input
 * @example
 * ```js
 * const keyboard = this.inputManager.keyboard;
 *
 * if (keyboard.isPressed("ArrowRight")) {
 *   // if the right arrow key is pressed, do some action
 * }
 *
 * if (keyboard.orPressed("Enter", "Space")) {
 *   // if the enter key or space key are pressed, do some action
 * }
 *
 * if (keyboard.andPressed("ControlLeft", "KeyC")) {
 *   // if the left control key and the letter C key are pressed, do some action
 * }
 * ```
 */
export class KeyboardController {
    /**
     * The current pressed keys
     * @readonly
     */
    public readonly pressedKeys: string[] = [];

    private keyMap: Map<string, boolean> = new Map<string, boolean>();

    /** @internal */
    constructor(canvas: HTMLCanvasElement) {
        canvas.addEventListener("keydown", this.eventHandler);
        canvas.addEventListener("keyup", this.eventHandler);
    }

    private eventHandler = (event: KeyboardEvent) => {
        if (event.type === "keydown") {
            this.keyMap.set(event.code, true);
            if (!this.pressedKeys.includes(event.code)) this.pressedKeys.push(event.code);
        }

        if (event.type === "keyup") {
            this.keyMap.set(event.code, false);

            const index = this.pressedKeys.indexOf(event.code);
            if (index !== -1) this.pressedKeys.splice(index, 1);
        }
    };

    /**
     * Returns TRUE if the given key is being pressed.
     * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
     * @param keyCode The code of the key to check
     * @returns TRUE true for pressed, FALSE instead
     */
    public isPressed(keyCode: string): boolean {
        return this.keyMap.get(keyCode) ?? false;
    }

    /**
     * Returns TRUE if one of the given keys is being pressed.
     * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
     * @param keyCodes The codes of the keys to check
     * @returns TRUE for pressed, FALSE instead
     */
    public orPressed(keyCodes: string[]): boolean {
        return keyCodes.reduce<boolean>((result, keyCode) => result || (this.keyMap.get(keyCode) ?? false), false);
    }

    /**
     * Returns TRUE if all the given keys are being pressed.
     * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
     * @param keyCodes The codes of the keys to check
     * @returns TRUE for pressed, FALSE instead
     */
    public andPressed(keyCodes: string[]): boolean {
        return keyCodes.reduce<boolean>((result, keyCode) => result && (this.keyMap.get(keyCode) ?? false), true);
    }

    /**
     * This method accepts two parameters that will be returned depending on whether the key is pressed or not.
     * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
     * @param keyCode The code of the key to check
     * @param returnTrue The value to return if the key is pressed
     * @param returnFalse The value to return if the key is not pressed
     * @returns The returnTrue for pressed or the returnFalse instead
     */
    public isPressedReturn<T>(keyCode: string, returnTrue: T, returnFalse: T): T {
        return this.keyMap.get(keyCode) ? returnTrue : returnFalse;
    }

    /**
     * This method accepts two parameters that will be returned depending on whether one of the given keys is being pressed.
     * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
     * @param keyCodes The codes of the keys to check
     * @param returnTrue The value to return if the key is pressed
     * @param returnFalse The value to return if the key is not pressed
     * @returns The returnTrue for pressed or the returnFalse instead
     */
    public orPressedReturn<T>(keyCodes: string[], returnTrue: T, returnFalse: T): T {
        return keyCodes.reduce<boolean>((result, keyCode) => result || (this.keyMap.get(keyCode) ?? false), false)
            ? returnTrue
            : returnFalse;
    }

    /**
     * This method accepts two parameters that will be returned depending on whether all the given keys are being pressed.
     * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
     * @param keyCodes The codes of the keys to check
     * @param returnTrue The value to return if the key is pressed
     * @param returnFalse The value to return if the key is not pressed
     * @returns The returnTrue for pressed or the returnFalse instead
     */
    public andPressedReturn<T>(keyCodes: string[], returnTrue: T, returnFalse: T): T {
        return keyCodes.reduce<boolean>((result, keyCode) => result && (this.keyMap.get(keyCode) ?? false), true)
            ? returnTrue
            : returnFalse;
    }
}
