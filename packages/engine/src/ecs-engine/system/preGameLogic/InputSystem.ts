import { System } from "../../../ecs/SystemManager";
import { IInputManager } from "../../../input";

export class InputSystem implements System {
    constructor(private readonly inputManager: IInputManager) {}

    public onUpdate(): void {
        this.inputManager.update();
    }

    public onCreate(): void {}
    public onEnable(): void {}
    public onDisable(): void {}
    public onDestroy(): void {}
}
