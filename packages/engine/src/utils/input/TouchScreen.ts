import { Vector2 } from "@math";

/**
 * Represents a single touch or pointer interaction with the screen, including position and size information
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
 * Tracks and provides access to touch screen input state from the previous frame. Supports multi-touch
 * by storing an array of active touch interactions, each containing position and size information.
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
