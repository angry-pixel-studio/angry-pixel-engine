import { DomManager } from "../Core/Dom/DomManager";
import { container } from "../Game";

export class DomManagerFacade {
    private static domManager: DomManager = null;

    public static initialize(): void {
        this.domManager = container.getSingleton<DomManager>("DomManager");
    }

    public static get gameWidth(): number {
        return this.domManager.gameCanvas.clientWidth;
    }

    public static get gameHeight(): number {
        return this.domManager.gameCanvas.clientHeight;
    }

    public static get gameCanvas(): HTMLCanvasElement {
        return this.domManager.gameCanvas;
    }

    public static get uiCanvas(): HTMLCanvasElement | null {
        return this.domManager.uiCanvas;
    }

    public static get debugCanvas(): HTMLCanvasElement | null {
        return this.domManager.debugCanvas;
    }
}
