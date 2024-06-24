import { IRenderManager } from "../../../2d-renderer";
import { System, SystemGroup } from "../../manager/SystemManager";

export class ClearScreenSystem extends System {
    constructor(
        private renderManager: IRenderManager,
        private canvasColor: string,
    ) {
        super();
        this.group = SystemGroup.Render;
    }

    public onUpdate(): void {
        this.renderManager.clearScreen(this.canvasColor ?? "#000000");
    }
}
