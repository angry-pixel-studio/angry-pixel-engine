import { Vector2 } from "@math";

/**
 * The information about one interaction with the screen
 * @public
 * @category Input
 */
export interface TouchInteraction {
    /** The interaction position on the screen */
    positionInViewport: Vector2;
    /** The area of the interaction represented as a radius of the ellipse */
    radius: Vector2;
}

/**
 * Contains the information about the touch screen interaction
 * @public
 * @category Input
 * @example
 * ```js
 * const touch = this.inputController.touch;
 *
 * if (touch.touching) {
 *   const interaction = touch.interactions[0];
 * }
 * ```
 */
export class TouchScreen {
    /**
     * TRUE if there is an interaction with the screen
     */
    public touching: boolean = false;
    /**
     * The information about the interactions with the screen
     */
    public interactions: TouchInteraction[] = [];
}
