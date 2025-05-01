import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { SYSTEM_TYPES } from "@config/systemTypes";
import { Mouse } from "@input";
import { inject, injectable } from "@ioc";
import { InputManager } from "@manager/InputManager";
import { Vector2 } from "@math";

@injectable(SYSTEM_TYPES.MouseSystem)
export class MouseSystem {
    private readonly mouse: Mouse;

    private leftButtonPressed: boolean = false;
    private scrollButtonPressed: boolean = false;
    private rightButtonPressed: boolean = false;
    private positionInViewport: Vector2 = new Vector2();

    private readonly lastPositionInViewport: Vector2 = new Vector2();
    private wheelEvent: WheelEvent;

    constructor(
        @inject(DEPENDENCY_TYPES.CanvasElement) private readonly canvas: HTMLCanvasElement,
        @inject(DEPENDENCY_TYPES.InputManager) { mouse }: InputManager,
    ) {
        this.mouse = mouse;
        this.canvas.addEventListener("mousemove", (e) => this.updatePosition(e));
        this.canvas.addEventListener("mousedown", (e) => this.updateButtonDown(e));
        this.canvas.addEventListener("mouseup", (e) => this.updateButtonUp(e));
        this.canvas.addEventListener("wheel", (e) => this.handleWheelEvent(e));
        this.canvas.addEventListener("focusout", () => this.onFocusOut());
    }

    private updateButtonDown(event: MouseEvent) {
        this.canvas.focus();

        event.preventDefault();
        event.stopPropagation();

        this.leftButtonPressed = event.button === 0;
        this.scrollButtonPressed = event.button === 1;
        this.rightButtonPressed = event.button === 2;
    }

    private updateButtonUp(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        this.leftButtonPressed = event.button === 0 ? false : this.leftButtonPressed;
        this.scrollButtonPressed = event.button === 1 ? false : this.scrollButtonPressed;
        this.rightButtonPressed = event.button === 2 ? false : this.rightButtonPressed;
    }

    private updatePosition(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        this.positionInViewport.set(
            event.offsetX / (this.canvas.clientWidth / this.canvas.width) - this.canvas.width / 2,
            -event.offsetY / (this.canvas.clientHeight / this.canvas.height) + this.canvas.height / 2,
        );
    }

    private handleWheelEvent(event: WheelEvent): void {
        event.preventDefault();
        event.stopPropagation();

        this.wheelEvent = event;
    }

    private onFocusOut(): void {
        this.leftButtonPressed = false;
        this.scrollButtonPressed = false;
        this.rightButtonPressed = false;
    }

    public onUpdate(): void {
        this.mouse.leftButtonPressed = this.leftButtonPressed;
        this.mouse.rightButtonPressed = this.rightButtonPressed;
        this.mouse.scrollButtonPressed = this.scrollButtonPressed;
        this.mouse.positionInViewport.copy(this.positionInViewport);

        if (!this.positionInViewport.equals(this.lastPositionInViewport)) {
            this.mouse.hasMoved = true;
            this.lastPositionInViewport.copy(this.positionInViewport);
        } else {
            this.mouse.hasMoved = false;
        }

        if (this.wheelEvent) {
            this.mouse.wheelScroll.set(this.wheelEvent.deltaX, this.wheelEvent.deltaY);
            this.wheelEvent = undefined;
        } else {
            this.mouse.wheelScroll.set(0, 0);
        }
    }
}
