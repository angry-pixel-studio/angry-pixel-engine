export declare class DomManagerFacade {
    private static domManager;
    static initialize(): void;
    static get gameWidth(): number;
    static get gameHeight(): number;
    static get gameCanvas(): HTMLCanvasElement;
    static get uiCanvas(): HTMLCanvasElement | null;
    static get debugCanvas(): HTMLCanvasElement | null;
}
