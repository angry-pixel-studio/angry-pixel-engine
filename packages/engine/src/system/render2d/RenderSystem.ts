import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { SYMBOLS } from "@config/dependencySymbols";
import { System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { RenderManager } from "@manager/RenderManager";

@injectable(SYSTEM_SYMBOLS.RenderSystem)
export class RenderSystem implements System {
    constructor(@inject(SYMBOLS.RenderManager) private readonly renderManager: RenderManager) {}

    public onUpdate(): void {
        this.renderManager.render();
        this.renderManager.removeCameraData();
        this.renderManager.removeRenderData();
    }
}
