import { DomManager } from "../Core/Dom/DomManager";
import { container } from "../Game";

export class DomManagerFacade {
    private static domManager: DomManager = null;

    public static initialize(): void {
        this.domManager = container.getSingleton<DomManager>("DomManager");
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
