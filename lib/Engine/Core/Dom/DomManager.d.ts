export declare class DomManager {
    private gameWidth;
    private gameHeight;
    private containerNode;
    private uiEnabled;
    private debugEnabled;
    private _gameNode;
    private _gameCanvas;
    private _uiCanvas?;
    private _debugCanvas?;
    constructor(containerNode: HTMLElement, gameWidth: number, gameHeight: number, uiEnabled?: boolean, debugEnabled?: boolean);
    get gameNode(): HTMLElement;
    get gameCanvas(): HTMLCanvasElement;
    get uiCanvas(): HTMLCanvasElement | null;
    get debugCanvas(): HTMLCanvasElement | null;
    private setupDom;
    private setupGameNode;
    private setupGameCanvas;
    private setupUiCanvas;
    private setupDebugCanvas;
}
