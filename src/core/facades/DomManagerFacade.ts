import { DomManager } from "../managers/DomManager";

export class DomManagerFacade {
    private static domManager: DomManager = null;

    public static initialize(domManager: DomManager): void {
        this.domManager = domManager;
    }

    public static get gameWidth(): number {
        return this.domManager.canvas.width;
    }

    public static get gameHeight(): number {
        return this.domManager.canvas.height;
    }

    public static get canvas(): HTMLCanvasElement {
        return this.domManager.canvas;
    }
}
