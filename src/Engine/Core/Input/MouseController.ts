import { EVENT_UPDATE } from "../../Game";
import { Vector2 } from "../../Math/Vector2";

export class MouseController {
    public leftButtonPressed: boolean = false;
    public scrollButonPressed: boolean = false;
    public rightButtonPressed: boolean = false;

    private gameNode: HTMLElement;
    private gameCanvas: HTMLCanvasElement;
    private viewportPosition: Vector2 = new Vector2(0, 0);
    private lastViewportPosition: Vector2 = new Vector2(0, 0);
    private _hasMoved: boolean = false;

    constructor(gameNode: HTMLElement, gameCanvas: HTMLCanvasElement) {
        this.gameNode = gameNode;
        this.gameCanvas = gameCanvas;

        this.setup();
    }

    public get hasMoved(): boolean {
        return this._hasMoved;
    }

    private setup(): void {
        this.gameNode.addEventListener("mousemove", (e: MouseEvent) => this.updatePosition(e));
        this.gameNode.addEventListener("mousedown", (e: MouseEvent) => this.updateButtonDown(e));
        this.gameNode.addEventListener("mouseup", (e: MouseEvent) => this.updateButtonUp(e));

        window.addEventListener(EVENT_UPDATE, () => this.update());
    }

    private updateButtonDown(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        this.leftButtonPressed = event.button === 0;
        this.scrollButonPressed = event.button === 1;
        this.rightButtonPressed = event.button === 2;
    }

    private updateButtonUp(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        this.leftButtonPressed = event.button === 0 ? false : this.leftButtonPressed;
        this.scrollButonPressed = event.button === 1 ? false : this.scrollButonPressed;
        this.rightButtonPressed = event.button === 2 ? false : this.rightButtonPressed;
    }

    private updatePosition(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        this.viewportPosition.set(
            event.offsetX / (this.gameCanvas.clientWidth / this.gameCanvas.width),
            event.offsetY / (this.gameCanvas.clientHeight / this.gameCanvas.height)
        );
    }

    private update(): void {
        if (
            this.viewportPosition.x !== this.lastViewportPosition.x ||
            this.viewportPosition.y !== this.lastViewportPosition.y
        ) {
            this._hasMoved = true;
            this.lastViewportPosition.set(this.viewportPosition.x, this.viewportPosition.y);
        } else {
            this._hasMoved = false;
        }
    }
}
