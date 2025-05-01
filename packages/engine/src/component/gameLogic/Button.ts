import { Vector2 } from "@math";

/**
 * Button component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const button = new Button({
 *   shape: ButtonShape.Rectangle,
 *   width: 100,
 *   height: 50,
 *   offset: new Vector2(0, 0),
 *   touchEnabled: true,
 *   onClick: () => console.log("Button clicked!"),
 *   onPressed: () => console.log("Button pressed!")
 * });
 * ```
 */
export interface ButtonOptions {
    shape: ButtonShape;
    width: number;
    height: number;
    radius: number;
    touchEnabled: boolean;
    offset: Vector2;
    onClick: () => void;
    onPressed: () => void;
}

/**
 * The Button component creates an interactive button that can be clicked or pressed.\
 * It supports rectangular or circular shapes and can be configured with dimensions,
 * position offset, touch input, and click/press event handlers.
 * @public
 * @category Components
 * @example
 * ```js
 * const button = new Button({
 *   shape: ButtonShape.Rectangle,
 *   width: 100,
 *   height: 50,
 *   offset: new Vector2(0, 0),
 *   touchEnabled: true,
 *   onClick: () => console.log("Button clicked!"),
 *   onPressed: () => console.log("Button pressed!")
 * });
 * ```
 */
export class Button {
    /** The shape of the button */
    shape: ButtonShape;
    /** Width in pixels. Only for rectangle shaped buttons */
    width: number = 0;
    /** Height in pixels. Only for rectangle shaped buttons */
    height: number = 0;
    /** Radius in pixels. Only for circumference shaped buttons */
    radius: number = 0;
    /** Enables interaction with touch screens */
    touchEnabled: boolean = true;
    /** X-axis and Y-axis offset */
    offset: Vector2 = new Vector2();
    /** TRUE if it's pressed */
    pressed: boolean = false;
    /** TRUE if mouse cursor is over the button */
    mouseOver: boolean = false;
    /** Function executed when the button's click */
    onClick: () => void;
    /** Function executed when the button is pressed */
    onPressed: () => void;

    constructor(options?: Partial<ButtonOptions>) {
        Object.assign(this, options);
    }
}

/**
 * @public
 * @category Components Configuration
 */
export enum ButtonShape {
    Rectangle,
    Circumference,
}
