import { IRenderManager } from "../../../2d-renderer";
import { System } from "../../../ecs/SystemManager";

export class RenderSystem implements System {
    constructor(private renderManager: IRenderManager) {}

    public onUpdate(): void {
        this.renderManager.render();
        this.renderManager.clearCameraData();
        this.renderManager.clearRenderData();
    }
}
