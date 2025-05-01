import { GameConfig } from "@config/bootstrap";
import { SYSTEM_TYPES } from "@config/systemTypes";
import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { System } from "@ecs";
import { inject, injectable } from "@ioc";
import { WebGLManager } from "@webgl";

@injectable(SYSTEM_TYPES.ClearScreenSystem)
export class ClearScreenSystem implements System {
    constructor(
        @inject(DEPENDENCY_TYPES.WebGLManager) private readonly webGLManager: WebGLManager,
        @inject(DEPENDENCY_TYPES.GameConfig) private readonly gameConfig: GameConfig,
    ) {}

    public onUpdate(): void {
        this.webGLManager.renderCanvasColor(this.gameConfig.canvasColor);
    }
}
