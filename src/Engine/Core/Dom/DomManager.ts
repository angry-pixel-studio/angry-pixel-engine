const GAME_NODE_ID: string = "miniEngineGame";
const GAME_CANVAS_ID: string = "miniEngineGameCanvas";
const UI_CANVAS_ID: string = "miniEngineUICanvas";
const DEBUG_CANVAS_ID: string = "miniEngineDebugCanvas";

export class DomManager {
    private gameWidth: number;
    private gameHeight: number;
    private containerNode: HTMLElement;
    private uiEnabled: boolean;
    private debugEnabled: boolean;

    private _gameNode: HTMLElement = null;
    private _gameCanvas: HTMLCanvasElement = null;
    private _uiCanvas: HTMLCanvasElement = null;
    private _debugCanvas: HTMLCanvasElement = null;

    constructor(
        containerNode: HTMLElement,
        gameWidth: number,
        gameHeight: number,
        uiEnabled: boolean = true,
        debugEnabled: boolean = false
    ) {
        this.containerNode = containerNode;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.uiEnabled = uiEnabled;
        this.debugEnabled = debugEnabled;

        this.setupDom();
    }

    public get gameNode(): HTMLElement {
        return this._gameNode;
    }

    public get gameCanvas(): HTMLCanvasElement {
        return this._gameCanvas;
    }

    public get uiCanvas(): HTMLCanvasElement {
        return this._uiCanvas;
    }

    public get debugCanvas(): HTMLCanvasElement {
        return this._debugCanvas;
    }

    private setupDom(): void {
        this.setupGameNode();

        if (this.debugEnabled) {
            this.setupDebugCanvas();
        }

        if (this.uiEnabled) {
            this.setupUiCanvas();
        }

        this.setupGameCanvas();
    }

    private setupGameNode(): void {
        this._gameNode = document.createElement("div");
        this._gameNode.id = GAME_NODE_ID;
        this._gameNode.style.position = "relative";
        this._gameNode.style.width = `${this.gameWidth}px`;
        this._gameNode.style.height = `${this.gameHeight}px`;
        this._gameNode.addEventListener("contextmenu", (e: MouseEvent) => e.preventDefault());

        this.containerNode.appendChild(this._gameNode);
    }

    private setupGameCanvas(): void {
        this._gameCanvas = document.createElement("canvas");
        this._gameCanvas.id = GAME_CANVAS_ID;
        this._gameCanvas.width = Math.floor(this.gameWidth);
        this._gameCanvas.height = Math.floor(this.gameHeight);
        this._gameCanvas.addEventListener("contextmenu", (e: MouseEvent) => e.preventDefault());

        this._gameNode.appendChild(this._gameCanvas);
    }

    private setupUiCanvas(): void {
        this._uiCanvas = document.createElement("canvas");
        this._uiCanvas.id = UI_CANVAS_ID;
        this._uiCanvas.style.position = "absolute";
        this._uiCanvas.style.zIndex = "10";
        this._uiCanvas.width = Math.floor(this.gameWidth);
        this._uiCanvas.height = Math.floor(this.gameHeight);
        this._uiCanvas.addEventListener("contextmenu", (e: MouseEvent) => e.preventDefault());

        this._gameNode.appendChild(this._uiCanvas);
    }

    private setupDebugCanvas(): void {
        this._debugCanvas = document.createElement("canvas");
        this._debugCanvas.id = DEBUG_CANVAS_ID;
        this._debugCanvas.style.position = "absolute";
        this._debugCanvas.style.zIndex = "5";
        this._debugCanvas.width = Math.floor(this.gameWidth);
        this._debugCanvas.height = Math.floor(this.gameHeight);
        this._debugCanvas.addEventListener("contextmenu", (e: MouseEvent) => e.preventDefault());

        this._gameNode.appendChild(this._debugCanvas);
    }
}
