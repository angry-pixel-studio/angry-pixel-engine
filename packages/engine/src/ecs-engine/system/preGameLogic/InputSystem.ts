import { System } from "../../../ecs/SystemManager";
import { IInputManager } from "../../../input";

export class InputSystem implements System {
    constructor(private readonly inputManager: IInputManager) {}

    public onUpdate(): void {
        this.inputManager.update();
    }
}
