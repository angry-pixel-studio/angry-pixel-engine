import { Vector2 } from "@angry-pixel/math";

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
 * Manages the touch screen interaction.
 * @public
 * @category Input
 * @example
 * ```js
 * const touch = this.inputController.touch;
 *
 * if (touch.touching) {
 *   const interaction = touch.interactions[0];
 * }
 *
 * ```
 */
export class TouchController {
    private canvas: HTMLCanvasElement;
    private _touching: boolean = false;
    private _interactions: TouchInteraction[] = [];

    /** @internal */
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.canvas.addEventListener("touchstart", this.eventHandler);
        this.canvas.addEventListener("touchend", this.eventHandler);
        this.canvas.addEventListener("touchcancel", this.eventHandler);
        this.canvas.addEventListener("touchmove", this.eventHandler);
    }

    /**
     * TRUE if there is an interaction with the screen
     * @readonly
     */
    public get touching(): boolean {
        return this._touching;
    }

    /**
     * The information about the interactions with the screen
     * @readonly
     */
    public get interactions(): TouchInteraction[] {
        return this._interactions;
    }

    private eventHandler = (event: TouchEvent) => {
        if (event.type === "touchstart") {
            this._touching = true;
            this.updatePosition(event);
        }

        if (event.type === "touchmove") {
            this.updatePosition(event);
        }

        if (event.type === "touchend" || event.type === "touchcancel") {
            this._touching = false;
        }
    };

    private updatePosition(event: TouchEvent) {
        event.preventDefault();
        event.stopPropagation();

        this._interactions = [];

        if (event.targetTouches.length === 0) return;

        for (let i = 0; i < event.targetTouches.length; i++) {
            this._interactions[i] = {
                positionInViewport: new Vector2(
                    (event.targetTouches[i].clientX - this.canvas.offsetLeft) /
                        (this.canvas.clientWidth / this.canvas.width) -
                        this.canvas.width / 2,
                    -(event.targetTouches[i].clientY - this.canvas.offsetTop) /
                        (this.canvas.clientHeight / this.canvas.height) +
                        this.canvas.height / 2
                ),
                radius: new Vector2(event.targetTouches[i].radiusX, event.targetTouches[i].radiusY),
            };
        }
    }
}
