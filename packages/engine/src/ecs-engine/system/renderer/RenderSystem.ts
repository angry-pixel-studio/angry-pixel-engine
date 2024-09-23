import { IRenderManager } from "../../../2d-renderer";
import { System } from "../../../ecs/SystemManager";
import { inject } from "../../../ioc/container";
import { TYPES } from "../../../config/types";

export class RenderSystem implements System {
    constructor(@inject(TYPES.RenderManager) private readonly renderManager: IRenderManager) {}

    public onUpdate(): void {
        this.renderManager.render();
        this.renderManager.clearCameraData();
        this.renderManager.clearRenderData();
    }
}
