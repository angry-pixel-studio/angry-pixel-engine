import { System } from "../../../ecs/SystemManager";
import { IInputManager } from "../../../input";
import { inject } from "../../../ioc/container";
import { TYPES } from "../../../config/types";

export class InputSystem implements System {
    constructor(@inject(TYPES.InputManager) private readonly inputManager: IInputManager) {}

    public onUpdate(): void {
        this.inputManager.update();
    }
}
