import { IInputManager } from "../../../input";
import { System, SystemGroup } from "../../manager/SystemManager";

export class InputSystem extends System {
    constructor(private readonly inputManager: IInputManager) {
        super();
        this.group = SystemGroup.PreGameLogic;
    }

    public onUpdate(): void {
        this.inputManager.update();
    }
}
