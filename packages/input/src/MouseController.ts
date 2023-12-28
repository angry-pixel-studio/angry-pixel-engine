import { Vector2 } from "@angry-pixel/math";

/**
 * Manages mouse interaction
 * @public
 * @category Input
 * @example
 * ```js
 * const mouse = this.inputManager.mouse;
 *
 * if (mouse.positionInViewport.y < 0 && mouse.leftButtonPressed()) {
 *   // if the mouse pointer is below the middle of the screen and left click, do something
 * }
 * ```
 */
export class MouseController {
    private _leftButtonPressed: boolean = false;
    private _scrollButtonPressed: boolean = false;
    private _rightButtonPressed: boolean = false;
    private _positionInViewport: Vector2 = new Vector2(0, 0);
    private _hasMoved: boolean = false;

    private lastPositionInViewport: Vector2 = new Vector2(0, 0);
    private canvas: HTMLCanvasElement;

    /** @internal */
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.setup();
    }

    /**
     * TRUE if the left button is being pressed
     * @readonly
     */
    public get leftButtonPressed(): boolean {
        return this._leftButtonPressed;
    }

    /**
     * TRUE if the scroll button is being pressed
     * @readonly
     */
    public get scrollButtonPressed(): boolean {
        return this._scrollButtonPressed;
    }

    /**
     * TRUE if the right button is beign pressed
     * @readonly
     */
    public get rightButtonPressed(): boolean {
        return this._rightButtonPressed;
    }

    /**
     * The position of the pointer in the screen view port
     * @readonly
     */
    public get positionInViewport(): Vector2 {
        return this._positionInViewport;
    }

    /**
     * TRUE if the mouse moved during the last frame
     * @readonly
     */
    public get hasMoved(): boolean {
        return this._hasMoved;
    }

    /** @internal */
    public update(): void {
        if (this._positionInViewport.equals(this.lastPositionInViewport) === false) {
            this._hasMoved = true;
            this.lastPositionInViewport.copy(this._positionInViewport);
        } else {
            this._hasMoved = false;
        }
    }

    private setup(): void {
        this.canvas.addEventListener("mousemove", (e: MouseEvent) => this.updatePosition(e));
        this.canvas.addEventListener("mousedown", (e: MouseEvent) => this.updateButtonDown(e));
        this.canvas.addEventListener("mouseup", (e: MouseEvent) => this.updateButtonUp(e));
    }

    private updateButtonDown(event: MouseEvent) {
        this.canvas.focus();

        event.preventDefault();
        event.stopPropagation();

        this._leftButtonPressed = event.button === 0;
        this._scrollButtonPressed = event.button === 1;
        this._rightButtonPressed = event.button === 2;
    }

    private updateButtonUp(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        this._leftButtonPressed = event.button === 0 ? false : this._leftButtonPressed;
        this._scrollButtonPressed = event.button === 1 ? false : this._scrollButtonPressed;
        this._rightButtonPressed = event.button === 2 ? false : this._rightButtonPressed;
    }

    private updatePosition(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        this._positionInViewport.set(
            event.offsetX / (this.canvas.clientWidth / this.canvas.width) - this.canvas.width / 2,
            -event.offsetY / (this.canvas.clientHeight / this.canvas.height) + this.canvas.height / 2
        );
    }
}
