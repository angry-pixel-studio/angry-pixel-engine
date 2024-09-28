import { GameConfig } from "@config/bootstrap";
import { SYSTEMS } from "@config/systems";
import { TYPES } from "@config/types";
import { System } from "@ecs";
import { inject, injectable } from "@ioc";
import { WebGLManager } from "@webgl";

@injectable(SYSTEMS.ClearScreenSystem)
export class ClearScreenSystem implements System {
    constructor(
        @inject(TYPES.WebGLManager) private readonly webGLManager: WebGLManager,
        @inject(TYPES.GameConfig) private readonly gameConfig: GameConfig,
    ) {}

    public onUpdate(): void {
        this.webGLManager.renderCanvasColor(this.gameConfig.canvasColor);
    }
}
