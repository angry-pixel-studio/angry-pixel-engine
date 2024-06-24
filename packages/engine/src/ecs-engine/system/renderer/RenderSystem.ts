import { IRenderManager } from "../../../2d-renderer";
import { System, SystemGroup } from "../../manager/SystemManager";

export class RenderSystem extends System {
    constructor(private renderManager: IRenderManager) {
        super();
        this.group = SystemGroup.Render;
    }

    public onUpdate(): void {
        this.renderManager.render();
        this.renderManager.clearCameraData();
        this.renderManager.clearRenderData();
    }
}
