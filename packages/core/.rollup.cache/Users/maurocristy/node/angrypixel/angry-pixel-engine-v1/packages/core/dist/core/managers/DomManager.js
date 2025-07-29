import { Exception } from "../../utils/Exception";
const CANVAS_ID = "angryPixelGameCanvas";
/** @internal */
export class DomManager {
    constructor(containerNode, gameWidth, gameHeight) {
        this._canvas = null;
        if (!containerNode) {
            throw new Exception("containerNode cannot be empty or null.");
        }
        this.containerNode = containerNode;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.setupCanvas();
    }
    get canvas() {
        return this._canvas;
    }
    setupCanvas() {
        this._canvas = document.createElement("canvas");
        this._canvas.id = CANVAS_ID;
        this._canvas.width = Math.floor(this.gameWidth);
        this._canvas.height = Math.floor(this.gameHeight);
        this.canvas.tabIndex = 0;
        this._canvas.addEventListener("contextmenu", (e) => e.preventDefault());
        this.containerNode.appendChild(this._canvas);
        this.canvas.focus();
    }
}
//# sourceMappingURL=DomManager.js.map