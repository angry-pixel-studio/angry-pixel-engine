import { Vector2 } from "math";

/**
 * Contains the mouse information in the last frame
 * @public
 * @category Input
 * @example
 * ```js
 * const mouse = this.inputManager.mouse;
 *
 * if (mouse.positionInViewport.y < 0 && mouse.leftButtonPressed) {
 *   // if the mouse pointer is below the middle of the screen and left click, do something
 * }
 * ```
 */
export class Mouse {
    /**
     * TRUE if the left button is being pressed
     */
    public leftButtonPressed: boolean = false;
    /**
     * TRUE if the scroll button is being pressed
     */
    public scrollButtonPressed: boolean = false;
    /**
     * TRUE if the right button is beign pressed
     */
    public rightButtonPressed: boolean = false;
    /**
     * The position of the pointer in the screen view port
     */
    public positionInViewport: Vector2 = new Vector2();
    /**
     * TRUE if the mouse moved during the last frame
     */
    public hasMoved: boolean = false;
    /**
     * The scroll amount of the mouse wheel
     */
    public wheelScroll: Vector2 = new Vector2();
}
