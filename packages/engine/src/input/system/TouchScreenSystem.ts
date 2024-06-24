import { Vector2 } from "../../math";
import { TouchInteraction, TouchScreen } from "../input/TouchScreen";

export class TouchScreenSystem {
    private touching: boolean = false;
    private interactions: TouchInteraction[] = [];

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly touchScreen: TouchScreen,
    ) {
        this.canvas.addEventListener("touchstart", this.eventHandler);
        this.canvas.addEventListener("touchend", this.eventHandler);
        this.canvas.addEventListener("touchcancel", this.eventHandler);
        this.canvas.addEventListener("touchmove", this.eventHandler);
    }

    private eventHandler = (event: TouchEvent) => {
        if (event.type === "touchstart") {
            this.touching = true;
            this.updatePosition(event);
        }

        if (event.type === "touchmove") {
            this.updatePosition(event);
        }

        if (event.type === "touchend" || event.type === "touchcancel") {
            this.touching = false;
        }
    };

    private updatePosition(event: TouchEvent) {
        event.preventDefault();
        event.stopPropagation();

        this.interactions = [];

        if (event.targetTouches.length === 0) return;

        for (let i = 0; i < event.targetTouches.length; i++) {
            this.interactions[i] = {
                positionInViewport: new Vector2(
                    (event.targetTouches[i].clientX - this.canvas.offsetLeft) /
                        (this.canvas.clientWidth / this.canvas.width) -
                        this.canvas.width / 2,
                    -(event.targetTouches[i].clientY - this.canvas.offsetTop) /
                        (this.canvas.clientHeight / this.canvas.height) +
                        this.canvas.height / 2,
                ),
                radius: new Vector2(event.targetTouches[i].radiusX, event.targetTouches[i].radiusY),
            };
        }
    }

    public onUpdate(): void {
        this.touchScreen.touching = this.touching;
        this.touchScreen.interactions = [...this.touchScreen.interactions];
    }
}
