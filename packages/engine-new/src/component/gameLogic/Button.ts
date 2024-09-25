import { Vector2 } from "math";

/** @category Components */
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

/** @category Components */
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
    /** Function executed when the button's click */
    onClick: () => void;
    /** Function executed when the button is pressed */
    onPressed: () => void;

    constructor(options: Partial<ButtonOptions>) {
        Object.assign(this, options);
    }
}

/** @category Components */
export enum ButtonShape {
    Rectangle,
    Circumference,
}
