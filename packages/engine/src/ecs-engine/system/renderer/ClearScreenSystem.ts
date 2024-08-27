import { IRenderManager } from "../../../2d-renderer";
import { System } from "../../../ecs/SystemManager";

export class ClearScreenSystem implements System {
    constructor(
        private renderManager: IRenderManager,
        private canvasColor: string,
    ) {}

    public onUpdate(): void {
        this.renderManager.clearScreen(this.canvasColor ?? "#000000");
    }
}
