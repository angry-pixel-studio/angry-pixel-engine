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

    public onCreate(): void {}
    public onEnable(): void {}
    public onDisable(): void {}
    public onDestroy(): void {}
}
