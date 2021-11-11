import { Vector2 } from "../math/Vector2";

export class TouchController {
    private canvas: HTMLCanvasElement;
    private _touching: boolean = false;
    private _positionInViewport: Vector2 = new Vector2(0, 0);
    private _radius: Vector2 = new Vector2(0, 0);

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.canvas.addEventListener("touchstart", this.eventHandler);
        this.canvas.addEventListener("touchend", this.eventHandler);
        this.canvas.addEventListener("touchcancel", this.eventHandler);
        this.canvas.addEventListener("touchmove", this.eventHandler);
    }

    public get positionInViewport(): Vector2 {
        return this._positionInViewport;
    }

    public get touching(): boolean {
        return this._touching;
    }

    public get radius(): Vector2 {
        return this._radius;
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

        if (event.targetTouches.length === 0) return;

        this._positionInViewport.set(
            (event.targetTouches[0].clientX - this.canvas.offsetLeft) / (this.canvas.clientWidth / this.canvas.width) -
                this.canvas.width / 2,
            -(event.targetTouches[0].clientY - this.canvas.offsetTop) /
                (this.canvas.clientHeight / this.canvas.height) +
                this.canvas.height / 2
        );

        this._radius.set(event.targetTouches[0].radiusX, event.targetTouches[0].radiusY);
    }
}
