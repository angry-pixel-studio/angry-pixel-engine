import { GameConfig } from "@config/bootstrap";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { SYMBOLS } from "@config/dependencySymbols";
import { System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { WebGLManager } from "@angry-pixel/webgl";

@injectable(SYSTEM_SYMBOLS.ClearScreenSystem)
export class ClearScreenSystem implements System {
    constructor(
        @inject(SYMBOLS.WebGLManager) private readonly webGLManager: WebGLManager,
        @inject(SYMBOLS.GameConfig) private readonly gameConfig: GameConfig,
    ) {}

    public onUpdate(): void {
        this.webGLManager.renderCanvasColor(this.gameConfig.canvasColor);
    }
}
