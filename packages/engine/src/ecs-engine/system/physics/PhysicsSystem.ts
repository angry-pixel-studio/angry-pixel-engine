import { IPhysicsManager } from "../../../2d-physics";
import { System } from "../../../ecs/SystemManager";
import { ITimeManager } from "../../manager/TimeManager";

export class PhysicsSystem implements System {
    constructor(
        private readonly physicsManager: IPhysicsManager,
        private readonly timeManager: ITimeManager,
    ) {}

    public onUpdate(): void {
        this.physicsManager.update(this.timeManager.physicsDeltaTime);
    }

    public onCreate(): void {}
    public onEnable(): void {}
    public onDisable(): void {}
    public onDestroy(): void {}
}
