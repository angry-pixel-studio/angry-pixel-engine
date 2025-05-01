import { SYSTEM_TYPES } from "@config/systemTypes";
import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { System } from "@ecs";
import { inject, injectable } from "@ioc";
import { RenderManager } from "@manager/RenderManager";

@injectable(SYSTEM_TYPES.RenderSystem)
export class RenderSystem implements System {
    constructor(@inject(DEPENDENCY_TYPES.RenderManager) private readonly renderManager: RenderManager) {}

    public onUpdate(): void {
        this.renderManager.render();
        this.renderManager.removeCameraData();
        this.renderManager.removeRenderData();
    }
}
