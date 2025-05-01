/**
 * Tracks and provides access to keyboard input state from the previous frame.
 * Uses the standardized `code` property from JavaScript KeyboardEvents to identify keys.
 * Provides methods to check if individual keys or combinations of keys are pressed.
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
export class Keyboard {
    /**
     * The current pressed key codes
     */
    public pressedKeys: string[] = [];

    /**
     * Returns TRUE if the given key is being pressed.
     * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
     * @param keyCode The code of the key to check
     * @returns TRUE true for pressed, FALSE instead
     */
    public isPressed(keyCode: string): boolean {
        return this.pressedKeys.includes(keyCode);
    }

    /**
     * Returns TRUE if one of the given keys is being pressed.
     * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
     * @param keyCodes The codes of the keys to check
     * @returns TRUE for pressed, FALSE instead
     */
    public orPressed(keyCodes: string[]): boolean {
        return keyCodes.reduce<boolean>((result, keyCode) => result || this.pressedKeys.includes(keyCode), false);
    }

    /**
     * Returns TRUE if all the given keys are being pressed.
     * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
     * @param keyCodes The codes of the keys to check
     * @returns TRUE for pressed, FALSE instead
     */
    public andPressed(keyCodes: string[]): boolean {
        return keyCodes.reduce<boolean>((result, keyCode) => result && this.pressedKeys.includes(keyCode), true);
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
        return this.pressedKeys.includes(keyCode) ? returnTrue : returnFalse;
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
        return keyCodes.reduce<boolean>((result, keyCode) => result || this.pressedKeys.includes(keyCode), false)
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
        return keyCodes.reduce<boolean>((result, keyCode) => result && this.pressedKeys.includes(keyCode), true)
            ? returnTrue
            : returnFalse;
    }
}
