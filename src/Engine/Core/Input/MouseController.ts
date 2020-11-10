import { EVENT_UPDATE } from "../../Game";
import { Vector2 } from "../../Helper/Vector2";

export class MouseController {
    public leftButtonPressed: boolean = false;
    public scrollButonPressed: boolean = false;
    public rightButtonPressed: boolean = false;

    private gameNode: HTMLElement;
    private viewportPosition: Vector2 = new Vector2(0, 0);
    private lastViewportPosition: Vector2 = new Vector2(0, 0);
    private _hasMoved: boolean = false;

    constructor(gameNode: HTMLElement) {
        this.gameNode = gameNode;

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

        this.leftButtonPressed = event.button === 0;
        this.scrollButonPressed = event.button === 1;
        this.rightButtonPressed = event.button === 2;
    }

    private updateButtonUp(event: MouseEvent) {
        event.preventDefault();

        this.leftButtonPressed = event.button === 0 ? false : this.leftButtonPressed;
        this.scrollButonPressed = event.button === 1 ? false : this.scrollButonPressed;
        this.rightButtonPressed = event.button === 2 ? false : this.rightButtonPressed;
    }

    private updatePosition(event: MouseEvent) {
        event.preventDefault();

        const rect: DOMRect = this.gameNode.getBoundingClientRect();

        this.viewportPosition.x = event.clientX - rect.left;
        this.viewportPosition.y = event.clientY - rect.top;
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
