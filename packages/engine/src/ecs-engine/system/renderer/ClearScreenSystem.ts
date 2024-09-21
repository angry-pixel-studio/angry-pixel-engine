import { IRenderManager } from "../../../2d-renderer";
import { System } from "../../../ecs/SystemManager";
import { inject } from "../../../ioc/container";
import { TYPES } from "../../config/types";
import { IGameConfig } from "../../Game";

export class ClearScreenSystem implements System {
    constructor(
        @inject(TYPES.RenderManager) private readonly renderManager: IRenderManager,
        @inject(TYPES.GameConfig) private readonly gameConfig: IGameConfig,
    ) {}

    public onUpdate(): void {
        this.renderManager.clearScreen(this.gameConfig.canvasColor ?? "#000000");
    }
}
