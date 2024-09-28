import { SYSTEMS } from "@config/systems";
import { TYPES } from "@config/types";
import { System } from "@ecs";
import { inject, injectable } from "@ioc";
import { RenderManager } from "@manager/RenderManager";

@injectable(SYSTEMS.RenderSystem)
export class RenderSystem implements System {
    constructor(@inject(TYPES.RenderManager) private readonly renderManager: RenderManager) {}

    public onUpdate(): void {
        this.renderManager.render();
        this.renderManager.removeCameraData();
        this.renderManager.removeRenderData();
    }
}
