import { Exception } from "../../utils/Exception";

const CANVAS_ID: string = "angryPixelGameCanvas";

/**
 * Manages the canvas element
 * @public
 * @category Managers
 * @example
 * ```js
 * const canvasElement = this.domManager.canvas;
 * ```
 */
export interface IDomManager {
    /** The canvas element where the game is rendered */
    canvas: HTMLCanvasElement;
}

/** @internal */
export class DomManager implements IDomManager {
    private gameWidth: number;
    private gameHeight: number;
    private containerNode: HTMLElement;

    private _canvas: HTMLCanvasElement = null;

    constructor(containerNode: HTMLElement, gameWidth: number, gameHeight: number) {
        if (!containerNode) {
            throw new Exception("containerNode cannot be empty or null.");
        }

        this.containerNode = containerNode;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.setupCanvas();
    }

    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    private setupCanvas(): void {
        this._canvas = document.createElement("canvas");
        this._canvas.id = CANVAS_ID;
        this._canvas.width = Math.floor(this.gameWidth);
        this._canvas.height = Math.floor(this.gameHeight);
        this.canvas.tabIndex = 0;

        this._canvas.addEventListener("contextmenu", (e: MouseEvent) => e.preventDefault());

        this.containerNode.appendChild(this._canvas);

        this.canvas.focus();
    }
}
