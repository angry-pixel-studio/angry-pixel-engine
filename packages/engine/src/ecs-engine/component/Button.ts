import { Vector2 } from "../../math";

export class Button {
    /** The shape of the button */
    public shape: ButtonShape;
    /** Width in pixels. Only for rectangle shaped buttons */
    public width: number = 0;
    /** Height in pixels. Only for rectangle shaped buttons */
    public height: number = 0;
    /** Radius in pixels. Only for circumference shaped buttons */
    public radius: number = 0;
    /** Enables interaction with touch screens */
    public touchEnabled: boolean = true;
    /** X-axis and Y-axis offset */
    public offset: Vector2 = new Vector2();
    /** TRUE if it's pressed */
    public pressed: boolean = false;
    /** Function executed when the button's click */
    public onClick: () => void;
    /** Function executed when the button is pressed */
    public onPressed: () => void;
}

/** @category Components */
export enum ButtonShape {
    Rectangle,
    Circumference,
}
